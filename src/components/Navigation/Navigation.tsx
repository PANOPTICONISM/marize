import style from "./navigation.module.css";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { useState } from "react";
import Cart from "../Cart/Cart";

export default function Navigation() {
    const { cart } = useShoppingBagCMS();
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const cartTotal =
        cart && cart?.total_unique_items > 0 ? cart?.total_unique_items : "";

    return (
        <nav className={style.wrapper}>
            <div className={style.left_nav}>
                <Hamburger />
                <div className={style.search_bar_wrapper}>
                    <SearchBar className={style.search_bar} />
                </div>
            </div>

            <div className={style.logo}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>

            <div className={style.right_nav}>
                <AiOutlineHeart />
                {!window.location.pathname.includes("/checkout/") ? (
                    <div className={style.shoppingBag} onClick={toggleModal}>
                        <BsHandbag />
                        {cartTotal && (
                            <span className={style.cartTotal}>{cartTotal}</span>
                        )}
                        {modal && <Cart />}
                    </div>
                ) : null}
            </div>
        </nav>
    );
}
