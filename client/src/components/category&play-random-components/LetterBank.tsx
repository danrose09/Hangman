import { useContext } from "react";
import { Store } from "../../react-store/store";

const LetterBank = (props: any) => {
  const { state, dispatch } = useContext(Store);
  const { letterBank, hasWon, remainingAttempts, randomWord, categoryWord } =
    state;

  const audio = new Audio("/audio/soft-click.wav");
  const audioLose = new Audio("/audio/lose.wav");

  console.log(randomWord[0].word.toLowerCase().split(""));

  const submitLetterHandler = (letter: String) => {
    audio.play();
    dispatch({ type: "GUESS_LETTER", payload: letter });
    if (
      remainingAttempts >= 1 &&
      randomWord[0].word.toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    } else if (remainingAttempts === 0) {
      audioLose.play();
      dispatch({ type: "SET_HAS_LOST", payload: true });
    }
  };

  const availableLetters = letterBank.map((letter: String, index: number) => {
    return (
      <div className="letter-container" hidden={hasWon}>
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
  return <div className="available-letters-container">{availableLetters}</div>;
};

export default LetterBank;
