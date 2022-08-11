import { useContext, useEffect } from "react";
import Confetti from "react-confetti";
import { Store } from "../../react-store/store";

const CategorySpaces = () => {
  const { state, dispatch } = useContext(Store);
  const { categoryWord, guessedLetters, hasWon } = state;
  const letterArray = categoryWord.toString().split("");

  const letterArrayLength = letterArray.length;

  const containsAll = letterArray.every((letter: String) => {
    return guessedLetters.includes(letter);
  });

  useEffect(() => {
    const checkIfWon = (containsall: String, letterarraylength: number) => {
      const audio = new Audio("/audio/win.wav");
      const won = () => {
        audio.play();
        dispatch({ type: "HAS_WON", payload: true });
      };
      const hasNotWon = () => {
        dispatch({ type: "HAS_WON", payload: false });
      };

      if (letterarraylength > 1 && containsall) {
        won();
      } else {
        hasNotWon();
      }
    };
    checkIfWon(containsAll, letterArrayLength);
  }, [guessedLetters, dispatch, containsAll, letterArrayLength]);

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;
    if (guessedLetters.includes(letter)) {
      isGuessed = true;
    }
    return (
      <div className="underline" key={index}>
        {isGuessed ? <h3>{letter}</h3> : <h3>_</h3>}
      </div>
    );
  });

  return (
    <div className="underlined-letters">
      {underlinedLetters}
      <Confetti hidden={!hasWon} run />
    </div>
  );
};

export default CategorySpaces;
