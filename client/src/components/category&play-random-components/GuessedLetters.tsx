import React, { useContext } from "react";
import { Store } from "../../react-store/store";

const GuessedLetters = () => {
  const { state } = useContext(Store);
  const { guessedLetters } = state;
  const allGuessedLetters = guessedLetters.map(
    (letter: String, index: number) => {
      return (
        <button key={index} className="letter-button">
          {letter}
        </button>
      );
    }
  );
  return (
    <div>
      Guessed Letters:
      {allGuessedLetters}
    </div>
  );
};

export default GuessedLetters;
