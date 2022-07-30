import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  randomWord: [
    {
      word: "",
      definition: "",
      pronunciation: "",
    },
  ],
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
  myDefinition: {},
  myDictionary: [],
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
      const guessedLetters = state.alphabet.filter((letter) => {
        return !remainingLetters.includes(letter);
      });

      return {
        ...state,
        letterBank: remainingLetters,
        guessedLetters: guessedLetters,
      };
    // case "PROVIDE_CLUE":
    //   const randomLetter = action.payload;
    //   const remainLetters = state.letterBank.filter((letter) => {
    //     return String(letter) !== String(randomLetter);
    //   });
    //   const guessLetters = state.alphabet.filter((letter) => {
    //     return !remainLetters.includes(letter);
    //   });
    //   return {
    //     ...state,
    //     letterBank: remainLetters,
    //     guessLetters: guessLetters,
    //   };
    case "FETCH_MY_DICTIONARY":
      return {
        ...state,
        myDictionary: action.payload,
      };
    case "FETCH_MY_DEFINITION":
      return {
        ...state,
        myDefinition: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload };
    case "ADD_TO_DICTIONARY":
      return {
        ...state,
        myDictionary: action.payload,
      };
    case "HAS_WON":
      return { ...state, hasWon: action.payload };
    case "SIGN_IN":
      return { ...state, userInfo: action.payload };
    case "SIGN_OUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
