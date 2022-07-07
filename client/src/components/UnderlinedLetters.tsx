import React, { useContext, useEffect } from "react";
import { Store } from "../store";

const UnderlinedLetters = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, guessedLetters, hasWon } = state;
  const letterArray = randomWord.toString().split("");

  useEffect(() => {
    const won = () => {
      dispatch({ type: "HAS_WON", payload: true });
    };
    const hasNotWon = () => {
      dispatch({ type: "HAS_WON", payload: false });
    };
    const containsAll = letterArray.every((letter: String) => {
      return guessedLetters.includes(letter);
    });
    if (
      guessedLetters.length > 1 &&
      letterArray.length >= guessedLetters.length &&
      containsAll
    ) {
      won();
    } else {
      hasNotWon();
    }
  }, [guessedLetters, dispatch, letterArray]);

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;
    if (guessedLetters.includes(letter)) {
      isGuessed = true;
    }
    return (
      <div>
        <h3 hidden={!isGuessed} key={index}>
          {letter}{" "}
        </h3>{" "}
        <span hidden={isGuessed}>_</span>
      </div>
    );
  });

  return (
    <div className="underlined-letters">
      {underlinedLetters}
      <h1 hidden={!hasWon}>You won!</h1>
    </div>
  );
};

export default UnderlinedLetters;
