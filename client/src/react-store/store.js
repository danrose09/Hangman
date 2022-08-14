import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  myDictionary: [],
  categories: [],
  category: [],
  difficulty: "normal",
  maxAttempts: 10,
  remainingAttempts: 10,
  activeSince: "",
  myDefinition: {
    word: "",
    partOfSpeech: "",
    origin: "",
    definition: "",
  },
  stopConfetti: false,
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
  gameHasStarted: false,
  hasWon: false,
  hasLost: false,
  message: "",
  updateSuccessful: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_STOP_GAME":
      return { ...state, gameHasStarted: action.payload };
    case "NEW_RANDOM_WORD":
      return {
        ...state,
        randomWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        hasWon: false,
        hasLost: false,
      };
    case "NEW_CATEGORY_WORD":
      return {
        ...state,
        categoryWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        haswon: false,
        hasLost: false,
      };
    case "REFRESH":
      return {
        ...state,
        gameHasStarted: false,
        hasWon: false,
        hasLost: false,
        maxAttemps: 10,
        remainingAttempts: 10,
        randomWord: [
          {
            word: "",
            definition: "",
            pronunciation: "",
          },
        ],
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

    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "FETCH_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
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
    // case "ADD_TO_DICTIONARY":
    //   return {
    //     ...state,
    //     myDictionary: action.payload,
    //   };
    case "REMOVE_FROM_DICTIONARY":
      return {
        ...state,
        myDictionary: action.payload,
      };
    case "UPDATE_SUCCESSFUL":
      return {
        ...state,
        message: action.payload,
        updateSuccessful: true,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "ATTEMPT_COUNTER":
      return {
        ...state,
        remainingAttempts: action.payload,
      };
    case "SET_MAX_ATTEMPTS":
      return {
        ...state,
        maxAttempts: action.payload,
      };
    case "HAS_WON":
      return { ...state, hasWon: action.payload };
    case "SET_HAS_LOST":
      return {
        ...state,
        hasLost: true,
      };
    case "STOP_CONFETTI":
      return {
        ...state,
        stopConfetti: action.payload,
      };
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
