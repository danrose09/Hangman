import { useContext, useEffect } from "react";
import Confetti from "react-confetti";
import { Store } from "../../react-store/store";
import axios from "axios";

const CategorySpaces = () => {
  const { state, dispatch } = useContext(Store);
  const { categoryWord, guessedLetters, hasWon, userInfo, winsAndLosses } =
    state;
  let { wins, losses } = winsAndLosses;
  const letterArray = categoryWord.toString().split("");
  const letterArrayLength = letterArray.length;

  const containsAll = letterArray
    .filter((letter: string) => {
      return letter !== " ";
    })
    .every((letter: String) => {
      return guessedLetters.includes(letter.toLowerCase());
    });

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;

    if (letter === " ") {
      isGuessed = true;
    } else if (guessedLetters.includes(letter.toLowerCase())) {
      isGuessed = true;
    }
    return (
      <div className="underline" key={index}>
        {isGuessed && letter === " " ? (
          <div style={{ marginLeft: "5px", marginRight: "5px" }}></div>
        ) : isGuessed ? (
          <h2>{letter}</h2>
        ) : (
          <h2>_</h2>
        )}
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
