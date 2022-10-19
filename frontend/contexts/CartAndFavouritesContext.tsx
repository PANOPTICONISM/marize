import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

const customer_id = uuid();

interface IState {
  favourites: Array<any>;
  cart: Array<any>;
  userId: string;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  favourites: [],
  cart: [],
  userId: customer_id,
};

export const GlobalContext = createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  console.log(action.payload, "payload");
  console.log(state);

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
    case "ADD_TO_CART":
      return {
        ...state,
        cart: JSON.stringify(state.cart).includes(action.payload.product._id)
          ? state.cart.map((product) =>
              product._id === action.payload.product._id
                ? {
                    ...product,
                    quantity: Number(product.quantity) + 1,
                    size: product.size + " " + action.payload.productSize,
                  }
                : product
            )
          : [
              ...state.cart,
              {
                ...action.payload.product,
                quantity: 1,
                size: action.payload.productSize,
              },
            ],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart:
          JSON.stringify(state.cart).includes(action.payload.product._id) &&
          state.cart.map((product) =>
            product._id === action.payload.product._id
              ? { ...product, quantity: action.payload.quantity }
              : product
          ),
      };
    default:
      return state;
  }
}

export function GlobalProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, [], () => {
    if (process.browser) {
      const localData = localStorage.getItem("favourites");
      return localData ? JSON.parse(localData) : initialState;
    }
  });

  const [stateCart, dispatchCart] = useReducer(reducer, [], () => {
    if (process.browser) {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
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

// export function IndividualFavouritesList({}) {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const handleUser = async (e) => {
//     e.preventDefault();

//     let userStructure = {
//       // name,
//       // email,
//       // phoneNumber,
//       createdAt: new Date().toISOString(),
//     };

//     let response = await fetch("/api/mongo", {
//       method: "POST",
//       body: JSON.stringify(userStructure),
//     });

//     let data = await response.json();

//     if (data.success) {
//       // clean up fields here
//       return setMessage(data.message);
//     } else {
//       return setError(data.message);
//     }
//   };
// }
