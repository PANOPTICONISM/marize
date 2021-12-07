import React, { createContext, useState, useEffect, useContext } from "react";
import { contentful } from "../lib/Contentful";

export const ContentfulContext = createContext<{
    faq?: any[];
}>({});

export function useContentfulCMS() {
    return useContext(ContentfulContext);
}

export default function ContentfulProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [content, setContent] = useState<{
        faq?: any;
    }>({});

    const getData = async () => {
        const { items: faq } = await contentful.getEntries();

        setContent({ faq });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ContentfulContext.Provider value={content}>
            {children}
        </ContentfulContext.Provider>
    );
}
