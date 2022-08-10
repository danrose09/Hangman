import { useContext } from "react";
import { Store } from "../store";

const LetterBank = (props: any) => {
  const { state, dispatch } = useContext(Store);
  const { letterBank, hasWon } = state;

  const audio = new Audio("/audio/soft-click.wav");

  const submitLetterHandler = (letter: String) => {
    audio.play();
    dispatch({ type: "GUESS_LETTER", payload: letter });
  };

  const availableLetters = letterBank.map((letter: String, index: number) => {
    return (
      <div className="letter-container">
        <button
          key={index}
          className="letter-button"
          onClick={() => submitLetterHandler(String(letter))}
        >
          {letter}
        </button>
      </div>
    );
  });
  return (
    <div className="available-letters-container" hidden={hasWon}>
      {availableLetters}
    </div>
  );
};

export default LetterBank;
