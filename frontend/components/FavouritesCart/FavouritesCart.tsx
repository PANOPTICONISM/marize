import React, { useContext } from "react";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { addToCart } from "../../utils/CartFunctions";
import style from "./favouritescart.module.css";
import { BsTrash } from "react-icons/bs";
import { PrimaryButton, PrimaryIconButton } from "../Buttons/Buttons";
import { FavouritesContext } from "../../contexts/FavouritesContext";
import { removeFromFavourites } from "../../utils/FavouritesFunctions";

export function FavouritesCartResumeContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className={style.cartFavouritesWrapper}>
            <h3>Favourites Bag</h3>
            {children}
        </div>
    );
}

export function ProductCard({ product }: { product: any }) {
    const { dispatch } = useContext(FavouritesContext);

    return (
        <div className={style.fullCart}>
            <img src={product.image.url} alt={product.name} />
            <div className={style.spaceBetween}>
                <div>
                    <div className={style.presentation}>
                        <h4>{product.name}</h4>
                        <h5>{product.price.formatted_with_code}</h5>
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
    const { setCart } = useShoppingBagCMS();

    const { state, dispatch } = useContext(FavouritesContext);

    const addToCartAndRemove = (product: any) => {
        removeFromFavourites(dispatch, product.id);
        addToCart(product, setCart);
    };

    if (state?.favourites.length > 0) {
        return (
            <FavouritesCartResumeContainer>
                {state.favourites?.map((product: any) => (
                    <>
                        <div key={product?.id}>
                            <ProductCard product={product} />
                        </div>
                        <PrimaryIconButton
                            className={style.shopBagBtn}
                            text="Add to cart"
                            onClick={() => addToCartAndRemove(product)}
                        />
                    </>
                ))}
            </FavouritesCartResumeContainer>
        );
    }
    return (
        <FavouritesCartResumeContainer>
            <div className={style.emptyCart}>
                <h4>Your favourites bag is currently empty.</h4>
                <h5>No idea, how to get started?</h5>
                <PrimaryButton
                    path="/products"
                    text="Explore all our products"
                />
            </div>
        </FavouritesCartResumeContainer>
    );
}
