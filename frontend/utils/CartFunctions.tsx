import { addToFavourites } from "./FavouritesFunctions";

export const addToCart = (
  dispatchCart: any,
  product: any,
  productSize: any
) => {
  dispatchCart({
    type: "ADD_TO_CART",
    payload: { product, productSize },
  });
};

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

export const updateCartQuantity = (dispatchCart, product, quantity) => {
  dispatchCart({
    type: "UPDATE_CART_QUANTITY",
    payload: { product, quantity },
  });
};
