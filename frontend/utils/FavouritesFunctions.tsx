export const addToFavourites = (dispatch: any, product: any) =>
  dispatch({
    type: "ADD_FAVOURITES",
    payload: product,
  });

export const removeFromFavourites = (dispatch: any, _id: string) => {
  console.log(_id);
  dispatch({
    type: "REMOVE_FAVOURITES",
    payload: _id,
  });
};
