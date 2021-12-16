import style from "./navigation.module.css";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { useContext, useState } from "react";
import Cart from "../Cart/Cart";
import MenuNav from "../../pages/MenuNav/MenuNav";
import FavouritesCart from "../FavouritesCart/FavouritesCart";
import { FavouritesContext } from "../../contexts/FavouritesContext";

export default function Navigation() {
    const { cart } = useShoppingBagCMS();
    const [openCart, setOpenCart] = useState(false);
    const { state } = useContext(FavouritesContext);
    const [openFavouritesCart, setOpenFavouritesCart] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleOpen = () => {
        setMenuOpen(!menuOpen);
    };
    if (menuOpen) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }
    const cartTotal =
        cart && cart?.total_unique_items > 0 ? cart?.total_unique_items : "";

    const favouritesCartTotal =
        state.favourites.length > 0 ? state.favourites.length : "";

    console.log(state.favourites.length);

    return (
        <nav className={style.wrapper}>
            {menuOpen && <MenuNav toggleOpen={toggleOpen} />}
            <div className={style.left_nav}>
                <Hamburger
                    aria-label="burger-menu"
                    toggle={toggleOpen}
                    toggled={menuOpen}
                />

                <div className={style.search_bar_wrapper}>
                    <SearchBar className={style.search_bar} />
                </div>
            </div>

            <div className={style.logo}>
                <Link to="/">
                    <Logo aria-label="logo" />
                </Link>
            </div>

            <div className={style.right_nav}>
                <div className={style.favouritesWrapper}>
                    <div
                        onClick={() =>
                            setOpenFavouritesCart(!openFavouritesCart)
                        }
                    >
                        <AiOutlineHeart />
                    </div>
                    {favouritesCartTotal && (
                        <span className={style.cartFavouritesTotal}>
                            {favouritesCartTotal}
                        </span>
                    )}
                    {openFavouritesCart && <FavouritesCart />}
                </div>
                {!window.location.pathname.includes("/checkout/") && (
                    <div className={style.shoppingBag}>
                        <div onClick={() => setOpenCart(!openCart)}>
                            <BsHandbag />
                        </div>
                        {cartTotal && (
                            <span className={style.cartTotal}>{cartTotal}</span>
                        )}
                        {openCart && <Cart />}
                    </div>
                )}
            </div>
        </nav>
    );
}
