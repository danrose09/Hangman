import React, { useContext } from "react";
import { Store } from "../store";

const LetterBank = () => {
  const { state, dispatch } = useContext(Store);
  const { letterBank } = state;

  const audio = new Audio("/audio/click.wav");
  // const randomIndex = Math.floor(Math.random() * letterBank.length);
  // const randomLetter = letterBank[randomIndex];

  const submitLetterHandler = (letter: String) => {
    audio.play();
    dispatch({ type: "GUESS_LETTER", payload: letter });
  };

  // const getClue = (randomletter: String) => {
  //   dispatch({ type: "PROVIDE_CLUE", payload: randomletter });
  // };

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
      {availableLetters}
      {/* <button onClick={() => getClue(randomLetter)}>Clue?</button> */}
    </div>
  );
};

export default LetterBank;
