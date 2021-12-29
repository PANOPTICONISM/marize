import React, { createContext, useState, useEffect, useContext } from "react";
import { commerce } from "../lib/Commerce";

export const ShoppingBagContext = createContext<{
    cart?: any;
    setCart?: any;
}>({});

export function useShoppingBagCMS() {
    return useContext(ShoppingBagContext);
}

export default function ShoppingBagProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [cart, setCart] = useState();

    const getCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart);
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <ShoppingBagContext.Provider value={{ cart, setCart }}>
            {children}
        </ShoppingBagContext.Provider>
    );
}
