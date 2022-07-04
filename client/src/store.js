import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  randomWord: "",
  letters: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  guessedLetters: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_RANDOM_WORD":
      return { ...state, randomWord: action.payload };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
