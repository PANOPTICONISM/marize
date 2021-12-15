import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { addToCart, removeFromCart } from "../../utils/CartFunctions";
import style from "../Cart/cart.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { PrimaryButton, PrimaryIconButton } from "../Buttons/Buttons";
import { updateCart } from "../../utils/CartFunctions";
import { FavouritesContext } from "../../contexts/FavouritesContext";
import {
    addToFavourites,
    removeFromFavourites,
} from "../../utils/FavouritesFunctions";

export function FavouritesCartResumeContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className={style.cartWrapper}>
            <h3>Favourites Bag</h3>
            {children}
        </div>
    );
}

export function ProductCard({ product }: { product: any }) {
    const { state, dispatch } = useContext(FavouritesContext);
    const { setCart } = useShoppingBagCMS();
    const maxItems = {
        quantity: [1, 2, 3, 4],
    };

    const removeFromCartAndFavourite = (product: any) => {
        removeFromCart(product, setCart);
        addToFavourites(dispatch, product);
    };

    console.log(state.favourites);

    return (
        <div className={style.fullCart}>
            <img src={product.image.url} alt={product.name} />
            <div className={style.spaceBetween}>
                <div>
                    <div className={style.presentation}>
                        <div>
                            <h4>{product.name}</h4>
                        </div>
                        <h5>{product.line_total.formatted_with_code}</h5>
                    </div>
                </div>
                <div className={style.bottomProduct}>
                    <div>
                        <button
                            onClick={() =>
                                removeFromFavourites(dispatch, product.id)
                            }
                        >
                            <BsTrash /> Remove from favourites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FavouritesCart() {
    const { cart, setCart } = useShoppingBagCMS();
    const history = useNavigate();

    const goToCheckout = () => {
        history(`/checkout/${cart.id}`);
    };

    if (cart && cart.total_unique_items > 0) {
        return (
            <FavouritesCartResumeContainer>
                {cart.line_items?.map((product: any) => (
                    <>
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                        <PrimaryIconButton
                            className={style.shopBagBtn}
                            text="Go to your shopping bag"
                            onClick={() => addToCart(product, setCart)}
                        />
                    </>
                ))}
            </FavouritesCartResumeContainer>
        );
    }
    return (
        <FavouritesCartResumeContainer>
            <div className={style.emptyCart}>
                <h4>Your shopping bag is currently empty.</h4>
                <h5>No idea, how to get started?</h5>
                <PrimaryButton
                    path="/products"
                    text="Find out what's new here"
                />
            </div>
        </FavouritesCartResumeContainer>
    );
}
