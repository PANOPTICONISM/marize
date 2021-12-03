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
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        const dataProducts = await commerce.products.list();
        const dataCategories = await commerce.categories.list();

        const products = dataProducts.data;
        const categories = dataCategories.data;

        setContent({ products, categories });
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading === false) {
        return (
            <CommerceContext.Provider value={content}>
                {children}
            </CommerceContext.Provider>
        );
    } else {
        return null;
    }
}
