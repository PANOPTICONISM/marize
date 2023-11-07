import style from "./navigation.module.css";
import Link from "next/link";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import Cart from "../Cart/Cart";
import MenuNav from "../MenuNav/MenuNav";
import FavouritesCart from "../FavouritesCart/FavouritesCart";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";
import React from "react";
import LogoSvg from "../../public/assets/logo";

export default function Navigation() {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [openCart, setOpenCart] = React.useState(false);
  const { state, stateCart } = React.useContext(GlobalContext);
  const [openFavouritesCart, setOpenFavouritesCart] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        if (openFavouritesCart) {
          setOpenFavouritesCart(false);
        }
        if (openCart) {
          setOpenCart(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openCart, openFavouritesCart]);

  const [data, setData] = React.useState({ categories: [], vendors: [] });
  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/sanity/categories");
      const data = await res.json();
      setData(data.data);
    }
    fetchData();
  }, []);

  const cartTotal =
    stateCart?.cart?.length > 0
      ? stateCart.cart.reduce(
          (accum, item) => Number(accum) + Number(item.quantity),
          0
        )
      : "";
  const favouritesCartTotal =
    state?.favourites?.length > 0 ? state.favourites.length : "";

    return (
      <header className={style.header}>
        <div className={style.left_nav}>
          <Hamburger
            aria-label="burger-menu"
            toggle={toggleOpen}
            toggled={menuOpen}
          />
        </div>
        <div className={style.search_bar_wrapper}>
          <SearchBar className={style.search_bar} />
        </div>
        <div className={style.logo}>
          <Link href="/" passHref>
            <LogoSvg width={234} height={55} />
          </Link>
        </div>
        <div className={style.right_nav}>
          <div className={style.favouritesWrapper}>
            <button
              className={style.icon}
              onClick={() => {
                if (openCart) {
                  setOpenCart(false);
                }
                setOpenFavouritesCart(!openFavouritesCart);
              }}
            >
              <AiOutlineHeart />
              {favouritesCartTotal && (
                <span className={style.cartFavouritesTotal}>
                  {favouritesCartTotal}
                </span>
              )}
            </button>
            {openFavouritesCart && <FavouritesCart ref={boxRef} />}
          </div>
          <div className={style.shoppingBag}>
            <button
              className={style.icon}
              onClick={() => {
                if (openFavouritesCart) {
                  setOpenFavouritesCart(false);
                }
                setOpenCart(!openCart);
              }}
            >
              <BsHandbag />
            </button>
            {cartTotal && <span className={style.cartTotal}>{cartTotal}</span>}
            {openCart && <Cart ref={boxRef} />}
          </div>
        </div>
        <nav className={style.wrapper}>
          {menuOpen && <MenuNav data={data} />}
        </nav>
      </header>
    );
}
