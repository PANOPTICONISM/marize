import { ActionProps } from "../contexts/CartAndFavouritesContext";
import { SingleProduct } from "../types/product";
import { addToFavourites } from "./FavouritesFunctions";

export const addToCart = (
  dispatchCart: React.Dispatch<ActionProps>,
  product: SingleProduct,
  size: string
) => {
  dispatchCart({
    type: "ADD_TO_CART",
    payload: { ...product, size },
  });
};

export const removeFromCart = (dispatchCart: React.Dispatch<ActionProps>, product: SingleProduct) => {
  dispatchCart({
    type: "REMOVE_FROM_CART",
    payload: product,
  });
};

export const removeFromCartAndFavourite = (
  dispatchCart: React.Dispatch<ActionProps>,
  product: SingleProduct,
  dispatch: React.Dispatch<ActionProps>
) => {
  removeFromCart(dispatchCart, product);
  addToFavourites(dispatch, product);
};

export const updateCartQuantity = (dispatchCart: React.Dispatch<ActionProps>, product: SingleProduct, quantity: number) => {
  dispatchCart({
    type: "UPDATE_CART_QUANTITY",
    payload: { ...product, quantity },
  });
};
