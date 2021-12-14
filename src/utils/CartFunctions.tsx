import { commerce } from "../lib/Commerce";

export const removeFromCart = (product: { id: any }, setCart: any) => {
    commerce.cart
        .remove(product.id, 1)
        .then(({ cart }: { cart: any }) => setCart(cart));
};

export const updateCart = (
    product: { id: any },
    quantityValue: any,
    setCart: any
) => {
    commerce.cart
        .update(product.id, { quantity: quantityValue })
        .then(({ cart }: { cart: any }) => setCart(cart));
};
