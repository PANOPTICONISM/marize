import React from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { commerce } from "../../lib/Commerce";
import style from "./cart.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { PrimaryButton, CartButton } from "../Buttons/Buttons";

export function CartResumeContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className={style.cartWrapper}>
            <h3>Shopping Bag</h3>
            {children}
        </div>
    );
}

export function ProductCard({ product }: { product: any }) {
    const { setCart } = useShoppingBagCMS();

    const removeFromCart = () => {
        commerce.cart
            .remove(product.id, 1)
            .then(({ cart }: { cart: any }) => setCart(cart));
    };

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
                        <button onClick={removeFromCart}>
                            <BsTrash />
                        </button>
                        <span>||</span>
                        <button>
                            <AiOutlineHeart />
                        </button>
                    </div>
                    <select name="quantity" id="quantity">
                        <option value="number">{product.quantity}</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default function Cart() {
    const { cart } = useShoppingBagCMS();

    const history = useNavigate();

    const goToCheckout = () => {
        history(`/checkout/${cart.id}`);
    };

    if (cart && cart.total_unique_items > 0) {
        return (
            <CartResumeContainer>
                {cart.line_items?.map((product: any) => (
                    <>
                        <ProductCard product={product} />
                    </>
                ))}
                <div className={style.totalCosts}>
                    <span>Total</span>
                    <span>{cart.subtotal.formatted_with_code}</span>
                </div>
                <CartButton
                    text="Go to your shopping bag"
                    onClick={goToCheckout}
                />
            </CartResumeContainer>
        );
    }
    return (
        <CartResumeContainer>
            <div className={style.emptyCart}>
                <h4>Your shopping bag is currently empty.</h4>
                <h5>No idea, how to get started?</h5>
                <PrimaryButton
                    path="/products"
                    text="Find out what's new here"
                />
            </div>
        </CartResumeContainer>
    );
}
