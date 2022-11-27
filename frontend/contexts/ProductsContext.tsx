import { createContext, useReducer } from "react";
import { ProductProps } from "../components/NewArrivals/NewArrivals";

type InitialProps = {
    products: ProductProps,
}

type ActionProps = {
    type: string,
    payload: ProductProps,
}

const initialState: InitialProps = {
    products: [],
}

export const ProductsContext = createContext<InitialProps | any>(initialState);

function reducer(state: InitialProps, action: ActionProps) {
    return {
        ...state,
        products: action.payload,
    };
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProductsContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}