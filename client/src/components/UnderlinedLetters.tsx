import React, { useContext, useEffect } from "react";
import { Store } from "../store";

const UnderlinedLetters = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, guessedLetters, hasWon } = state;
  const letterArray = randomWord.toString().split("");

  const containsAll = letterArray.every((letter: String) => {
    return guessedLetters.includes(letter);
  });
  const guessedLength = guessedLetters.length;
  const arrayLength = letterArray.length;

  useEffect(() => {
    const checkIfWon = (
      containsall: String,
      letterlength: number,
      guessedlength: number
    ) => {
      const won = () => {
        dispatch({ type: "HAS_WON", payload: true });
      };
      const hasNotWon = () => {
        dispatch({ type: "HAS_WON", payload: false });
      };

      if (guessedlength > 1 && letterlength >= guessedlength && containsall) {
        won();
      } else {
        hasNotWon();
      }
    };
    checkIfWon(containsAll, arrayLength, guessedLength);
  }, [guessedLetters, dispatch, arrayLength, containsAll, guessedLength]);

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
