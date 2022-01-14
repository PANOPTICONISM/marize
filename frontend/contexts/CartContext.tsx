// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useReducer,
// } from "react";
export {};
// interface IState {
//   cart: Array<any>;
// }

// interface IAction {
//   type: string;
//   payload: any;
// }

// const initialState: IState = {
//   cart: [],
// };

// export const CartContext = createContext<IState | any>(initialState);

// function reducer(state, action) {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         favourites: [...state.favourites, action.payload],
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         favourites: state.favourites.filter(
//           (item) => item._id !== action.payload
//         ),
//       };
//     default:
//       return state;
//   }
// }

// export default function ShoppingBagProvider({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   const [cart, setCart] = useReducer(reducer, [], () => {
//     if (process.browser) {
//       const localData = localStorage.getItem("favourites");
//       return localData ? JSON.parse(localData) : initialState;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("favourites", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <ShoppingBagContext.Provider value={{ cart, setCart }}>
//       {children}
//     </ShoppingBagContext.Provider>
//   );
// }
