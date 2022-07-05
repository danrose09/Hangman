import React, { useContext } from "react";
import { Store } from "../store";

const LetterBank = () => {
  const { state, dispatch } = useContext(Store);
  const { letterBank, guessedLetters } = state;

  console.log(letterBank);
  console.log(guessedLetters);

  const submitLetterHandler = (letter) => {
    console.log(`${letter} got clicked!`);
    dispatch({ type: "GUESS_LETTER", payload: letter });
  };

  const availableLetters = letterBank.map((letter) => {
    return (
      <button
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
