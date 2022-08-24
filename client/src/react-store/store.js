import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  myDictionary: [],
  categories: [],
  category: {
    name: "",
    words: [],
  },
  difficulty: "normal",
  maxAttempts: 10,
  remainingAttempts: 10,
  activeSince: "",
  mwDefinition: null,
  myDefinition: {
    word: "",
    partOfSpeech: "",
    origin: "",
    definition: "",
  },
  randomWord: ["random"],
  commonWord: "",
  shortDef: "",
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
  merriamWebsterData: null,
  thesaurusData: null,
  showThesaurus: false,
  fetchSuccess: false,
  fetchFailure: false,

  winsAndLosses: {
    wins: 0,
    losses: 0,
  },
  winPercentage: 0,
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
        maxAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        remainingAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        hasWon: false,
        hasLost: false,
      };
    case "NEW_COMMON_WORD":
      return {
        ...state,
        commonWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        maxAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        remainingAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        hasWon: false,
        hasLost: false,
      };
    case "NEW_CATEGORY_WORD":
      return {
        ...state,
        categoryWord: action.payload,
        letterBank: state.alphabet,
        guessedLetters: [],
        maxAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        remainingAttempts:
          state.difficulty === "easy"
            ? 15
            : state.difficulty === "normal"
            ? 10
            : state.difficulty === "hard"
            ? 7
            : state.difficulty === "genius"
            ? 5
            : 10,
        haswon: false,
        hasLost: false,
      };
    case "SET_SHORTDEF":
      return {
        ...state,
        shortDef: action.payload,
      };
    case "REFRESH":
      return {
        ...state,
        gameHasStarted: false,
        hasWon: false,
        hasLost: false,
        difficulty: "normal",
        randomWord: ["random"],
        winsAndLosses: {
          wins: 0,
          losses: 0,
        },
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
    case "FETCH_MW_DEFINITION":
      return {
        ...state,
        mwDefinition: action.payload,
      };
    case "CLEAR_MW_DEFINITION":
      return { ...state, mwDefinition: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        fetchSuccess: true,
      };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload };
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
      return {
        ...state,
        hasWon: action.payload,
      };
    case "SET_HAS_LOST":
      return {
        ...state,
        hasLost: true,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        userInfo: action.payload,
        message: "Account successfully updated.",
      };
    case "SIGN_IN":
      return { ...state, userInfo: action.payload, message: "" };
    case "SIGN_OUT":
      return { ...state, userInfo: null };
    case "SET_MERRIAM_WEBSTER_DATA":
      return {
        ...state,
        merriamWebsterData: action.payload,
      };
    case "SET_THESAURUS_DATA":
      return {
        ...state,
        thesaurusData: action.payload,
      };
    case "SHOW_THESAURUS":
      return {
        ...state,
        showThesaurus: action.payload,
      };
    case "FETCH_WINS_LOSSES":
      return {
        ...state,
        winsAndLosses: action.payload,
      };
    case "WIN_LOSE_COUNTER":
      return {
        ...state,
        winsAndLosses: action.payload,
      };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
