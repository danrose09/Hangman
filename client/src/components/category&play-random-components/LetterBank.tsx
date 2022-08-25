import { useContext, useEffect } from "react";
import { Store } from "../../react-store/store";

const LetterBank = (props: any) => {
  const { state, dispatch } = useContext(Store);
  const {
    letterBank,
    remainingAttempts,
    randomWord,
    categoryWord,
    commonWord,
  } = state;

  const audio = new Audio("/audio/soft-click.wav");

  useEffect(() => {
    if (remainingAttempts === 0) {
      dispatch({ type: "SET_HAS_LOST", payload: true });
    }
  }, [dispatch, remainingAttempts]);

  const submitLetterHandler = (letter: String) => {
    audio.play();
    dispatch({ type: "GUESS_LETTER", payload: letter });
    if (
      categoryWord.length >= 1 &&
      remainingAttempts >= 1 &&
      categoryWord.toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
    if (
      commonWord.length >= 1 &&
      remainingAttempts >= 1 &&
      commonWord.toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
    if (
      randomWord[0] !== "random" &&
      remainingAttempts >= 1 &&
      randomWord[0].length >= 1 &&
      randomWord[0].toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
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
  return <div>{availableLetters}</div>;
};

export default LetterBank;
