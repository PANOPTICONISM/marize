import React from "react";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { commerce } from "../../lib/Commerce";
import style from "./cart.module.css";
import { BsTrash } from "react-icons/bs";

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
        <div>
            <img src={product.image.url} alt={product.name} />
            <div>
                <h5>{product.name}</h5>
                <h6>{product.price.formatted_with_code}</h6>
            </div>
            <p>Colour</p>
            <p>Size</p>
            <button onClick={removeFromCart}>
                <BsTrash />
            </button>
        </div>
    );
}

export default function Cart() {
    const { cart } = useShoppingBagCMS();

    if (cart && cart.total_unique_items > 0) {
        return (
            <CartResumeContainer>
                {cart.line_items.map((product: any) => (
                    <ProductCard product={product} />
                ))}
            </CartResumeContainer>
        );
    }
    return (
        <div className="container cart">
            <p>Your cart is currently empty.</p>
        </div>
    );
}
