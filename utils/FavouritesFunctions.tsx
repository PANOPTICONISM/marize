export const addToFavourites = (dispatch: any, product: any) =>
    dispatch({
        type: "ADD_FAVOURITES",
        payload: product,
    });

export const removeFromFavourites = (dispatch: any, id: string) => {
    dispatch({
        type: "REMOVE_FAVOURITES",
        payload: id,
    });
};
