import React, { useContext } from "react";
import { Store } from "../store";

const LetterBank = () => {
  const { state, dispatch } = useContext(Store);
  const { letterBank } = state;

  const submitLetterHandler = (letter: String) => {
    dispatch({ type: "GUESS_LETTER", payload: letter });
  };

  const availableLetters = letterBank.map((letter: String, index: number) => {
    return (
      <button
        key={index}
        className="letter-button"
        onClick={() => submitLetterHandler(String(letter))}
      >
        {letter}
      </button>
    );
  });
  return (
    <div>
      LetterBank
      {availableLetters}
    </div>
  );
};

export default LetterBank;
