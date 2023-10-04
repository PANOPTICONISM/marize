import style from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { useContext, useState } from "react";
import Cart from "../Cart/Cart";
import MenuNav from "../MenuNav/MenuNav";
import FavouritesCart from "../FavouritesCart/FavouritesCart";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";

export default function Navigation() {
  const [openCart, setOpenCart] = useState(false);
  const { state, stateCart } = useContext(GlobalContext);
  const [openFavouritesCart, setOpenFavouritesCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const cartTotal = stateCart?.cart?.length > 0 ? stateCart.cart.reduce((accum, item) => Number(accum) + Number(item.quantity), 0) : "";
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
        <Link href="/">
          <a>
            <Image src="/assets/logo.svg" width={198} height={38} alt="logo" />
          </a>
        </Link>
      </div>
      <div className={style.right_nav}>
        <div className={style.favouritesWrapper}>
          <div onClick={() => setOpenFavouritesCart(!openFavouritesCart)}>
            <AiOutlineHeart />
          </div>
          {favouritesCartTotal && (
            <span className={style.cartFavouritesTotal}>
              {favouritesCartTotal}
            </span>
          )}
          {openFavouritesCart && <FavouritesCart />}
        </div>
        <div className={style.shoppingBag}>
          <div onClick={() => setOpenCart(!openCart)}>
            <BsHandbag />
          </div>
          {cartTotal && <span className={style.cartTotal}>{cartTotal}</span>}
          {openCart && <Cart />}
        </div>
      </div>
    <nav className={style.wrapper}>
      {menuOpen && <MenuNav />}
    </nav>
    </header>
  );
}
