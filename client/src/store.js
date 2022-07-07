import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  randomWord: "",
  alphabet: [
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
  letterBank: [
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
  categoryWord: "",
  hasWon: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_RANDOM_WORD":
      return {
        ...state,
        randomWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        hasWon: false,
      };
    case "NEW_CATEGORY_WORD":
      return {
        ...state,
        categoryWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        haswon: false,
      };
    case "REFRESH":
      return {
        ...state,
        hasWon: false,
        randomWord: "",
        categoryWord: "",
        guessedLetters: [],
        letterBank: state.alphabet,
      };
    case "GUESS_LETTER":
      const guessedLetter = action.payload;

      const remainingLetters = state.letterBank.filter((letter) => {
        return String(letter) !== String(guessedLetter);
      });

      // let intersection = arr1.filter(x => arr2.includes(x));
      const guessedLetters = state.alphabet.filter((letter) => {
        return !remainingLetters.includes(letter);
      });

      return {
        ...state,
        letterBank: remainingLetters,
        guessedLetters: guessedLetters,
      };
    case "HAS_WON":
      return { ...state, hasWon: action.payload };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
