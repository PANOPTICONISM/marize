import { ActionProps } from "../contexts/CartAndFavouritesContext";
import { SingleProduct } from "../types/product";

export const addToFavourites = (dispatch: React.Dispatch<ActionProps>, product: SingleProduct) =>
  dispatch({
    type: "ADD_FAVOURITES",
    payload: product,
  });

export const removeFromFavourites = (dispatch: React.Dispatch<ActionProps>, product: SingleProduct) => {
  dispatch({
    type: "REMOVE_FAVOURITES",
    payload: product,
  });
};
