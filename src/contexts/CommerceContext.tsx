import React, { createContext, useState, useEffect, useContext } from "react";
import { commerce } from "../lib/Commerce";

export const CommerceContext = createContext<{
    products?: any[];
    categories?: any[];
}>({});

export function useCommerceCMS() {
    return useContext(CommerceContext);
}

export default function CommerceProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [content, setContent] = useState<{
        products?: any[];
        categories?: any[];
    }>({});

    const getData = async () => {
        const dataProducts = await commerce.products.list({
            limit: 40,
        });
        const dataCategories = await commerce.categories.list();

        const products = dataProducts.data;
        const categories = dataCategories.data;

        setContent({ products, categories });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <CommerceContext.Provider value={content}>
            {children}
        </CommerceContext.Provider>
    );
}
