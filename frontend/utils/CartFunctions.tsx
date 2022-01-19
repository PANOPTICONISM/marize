import { addToFavourites } from "./FavouritesFunctions";

export const addToCart = (dispatchCart: any, product: any) =>
  dispatchCart({
    type: "ADD_TO_CART",
    payload: product,
  });

export const removeFromCart = (dispatchCart: any, _id: string) => {
  dispatchCart({
    type: "REMOVE_FROM_CART",
    payload: _id,
  });
};

export const removeFromCartAndFavourite = (
  dispatchCart: any,
  product: any,
  dispatch: any
) => {
  removeFromCart(dispatchCart, product._id);
  addToFavourites(dispatch, product);
};
