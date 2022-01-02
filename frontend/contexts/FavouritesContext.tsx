import React, { createContext, useReducer } from "react";

interface IState {
    favourites: Array<any>;
}

interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    favourites: [],
};

export const FavouritesContext = createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case "ADD_FAVOURITES":
            return {
                ...state,
                favourites: [...state.favourites, action.payload],
            };
        case "REMOVE_FAVOURITES":
            return {
                ...state,
                favourites: state.favourites.filter(
                    (item) => item.id !== action.payload
                ),
            };
        default:
            return state;
    }
}

export function FavouritesProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FavouritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavouritesContext.Provider>
    );
}
