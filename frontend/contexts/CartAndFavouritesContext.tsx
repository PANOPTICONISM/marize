import React from "react";
import { v4 as uuid } from "uuid";
import { SingleProduct } from "../types/product";

export type StateExtraProps = {
  size?: string[];
  quantity?: number;
}

export type StateProps = {
  favourites: Array<SingleProduct>;
  cart: Array<SingleProduct & StateExtraProps>;
  userId: string;
}

type ActionExtraProps = {
  size?: string;
  quantity?: number;
}

export type ActionProps = {
  type: string;
  payload: SingleProduct & ActionExtraProps;
}

type DefaultProps = {
  state: StateProps,
  dispatch: React.Dispatch<ActionProps>,
  stateCart: StateProps,
  dispatchCart: React.Dispatch<ActionProps>
}

export const GlobalContext = React.createContext<DefaultProps | null>(null);

function reducer(state: StateProps, action: ActionProps): StateProps {
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
          (item) => item._id !== action.payload._id
        ),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: JSON.stringify(state.cart).includes(action.payload._id)
          ? state.cart.map((product) =>
            product._id === action.payload._id
              ? {
                ...product,
                quantity: Number(product.quantity) + 1,
                size: [...product.size, action.payload.size],
              }
              : product
          )
          : [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
              size: [action.payload.size],
            },
          ],
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: [],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart:
          JSON.stringify(state.cart).includes(action.payload._id) &&
          state.cart.map((product) =>
            product._id === action.payload._id
              ? { ...product, quantity: action.payload.quantity }
              : product
          ),
      };
    default:
      return state;
  }
}

export function GlobalProvider({ children }: { children?: React.ReactNode }) {
  const customer_id = uuid();
  const initialState: StateProps = {
    favourites: [],
    cart: [],
    userId: customer_id,
  };

  const [state, dispatch] = React.useReducer(reducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("favourites");
      return localData ? JSON.parse(localData) : initialState;
    }
  });

  const [stateCart, dispatchCart] = React.useReducer(reducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : initialState;
    }
  });

  React.useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(stateCart));
  }, [stateCart]);

  return (
    <GlobalContext.Provider
      value={{ state, dispatch, stateCart, dispatchCart }}
    >
      {children}
    </GlobalContext.Provider>
  );
}