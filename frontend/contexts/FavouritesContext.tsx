import React, { createContext, useReducer, useEffect, useState } from "react";

interface IState {
  favourites: Array<any>;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  favourites: [],
};

export const FavouritesContext = createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
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

export function FavouritesProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, [], () => {
    if (process.browser) {
      const localData = localStorage.getItem("favourites");
      return localData ? JSON.parse(localData) : initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state]);

  return (
    <FavouritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function IndividualFavouritesList({}) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleUser = async (e) => {
    e.preventDefault();

    let userStructure = {
      // name,
      // email,
      // phoneNumber,
      createdAt: new Date().toISOString(),
    };

    let response = await fetch("/api/mongo", {
      method: "POST",
      body: JSON.stringify(userStructure),
    });

    let data = await response.json();

    if (data.success) {
      // clean up fields here
      return setMessage(data.message);
    } else {
      return setError(data.message);
    }
  };
}
