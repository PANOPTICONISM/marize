import React, { createContext, useReducer, useContext, useEffect } from "react";

interface IState {
  favourites: Array<any>;
  cart: Array<any>;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  favourites: [],
  cart: [],
};

// export function FavouritesProvider({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   const [state, dispatch] = useReducer(reducer, [], () => {
//     if (process.browser) {
//       const localData = localStorage.getItem("favourites");
//       return localData ? JSON.parse(localData) : initialState;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("favourites", JSON.stringify(state));
//   }, [state]);

//   return (
//     <FavouritesContext.Provider value={{ state, dispatch }}>
//       {children}
//     </FavouritesContext.Provider>
//   );
// }

export const GlobalContext = createContext<IState | any>(initialState);

export function GlobalProvider({ reducer, initialState = {}, children }) {
  const [state, dispatch] = useReducer(
    combineReducers({
      cart: cartReducer,
      favourites: favouritesReducer,
    }),
    [],
    () => {
      if (process.browser) {
        const { favourites } = state;
        const localData = favourites
          ? localStorage.getItem("favourites")
          : localStorage.getItem("cart");
        return localData ? JSON.parse(localData) : initialState;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state, state.favourites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state, state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useAppState() {
  return useContext(GlobalContext);
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}

function favouritesReducer(state, action) {
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
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};
