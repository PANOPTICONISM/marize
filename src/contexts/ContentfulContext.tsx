import React, { createContext, useState, useEffect, useContext } from "react";
import { contentful } from "../lib/Contentful";

export const ContentfulContext = createContext<{
    faq?: any[];
    aboutPage?: any;
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
        aboutPage?: any;
    }>({});

    const getData = async () => {
        const { items: faq } = await contentful.getEntries({
            content_type: "faq",
        });

        const { items: aboutPage } = await contentful.getEntries({
            content_type: "aboutPage",
        });

        setContent({ faq, aboutPage });
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
