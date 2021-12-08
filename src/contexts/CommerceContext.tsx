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
        const { data: products } = await commerce.products.list({
            limit: 40,
        });
        const { data: categories } = await commerce.categories.list();

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
