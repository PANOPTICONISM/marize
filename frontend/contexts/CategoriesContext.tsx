import React from "react";

type CategoriesContextValue = {
    data: { vendors: any[], accessory: any[], clothing: any[] };
};

const CategoriesContext = React.createContext<CategoriesContextValue | null>(null);

export const CategoriesProvider = ({ children }: { children: React.ReactNode; }) => {
    const [data, setData] = React.useState({ vendors: [], accessory: [], clothing: [] });

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/sanity/categories");
            const response = await res.json();
            setData(response.data);
        }
        fetchData();
    }, []);

    const value = React.useMemo(() => (
        {
            data,
        }
    ), [data]);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};

const useNullableCategoriesContext = () => React.useContext(CategoriesContext);

const useCategoriesContext = () => {
    const context = useNullableCategoriesContext();
    if (context === null) {
        throw new Error('No CategoriesContext defined.');
    }
    return context;
};

export const useCategories = () => {
    const context = useCategoriesContext();
    return React.useMemo(() => context.data, [context.data]);
};