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
    children: React.ReactNode;
}) {
    const [content, setContent] = useState<{
        products?: any[];
        categories?: any[];
    }>({});

    useEffect(() => {
        commerce.products
            .list()
            .then((data: any) => {
                const products = data.data;
                setContent({ products });
            })
            .catch();

        commerce.categories
            .list()
            .then((data: any) => {
                const categories = data.data;
                setContent({ categories });
            })
            .catch();
    }, []);

    return (
        <CommerceContext.Provider value={content}>
            {children}
        </CommerceContext.Provider>
    );
}
