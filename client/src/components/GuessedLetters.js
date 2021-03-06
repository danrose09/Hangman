import React, { useContext } from "react";
import { Store } from "../store";

const GuessedLetters = () => {
  const { state } = useContext(Store);
  const { guessedLetters } = state;
  const allGuessedLetters = guessedLetters.map((letter) => {
    return <button className="guessed-letters-button">{letter}</button>;
  });
  return (
    <div>
      Guessed Letters:
      {allGuessedLetters}
    </div>
  );
};

export default GuessedLetters;
