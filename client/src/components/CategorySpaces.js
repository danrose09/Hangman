import React, { useContext, useEffect } from "react";
import { Store } from "../store";

const CategorySpaces = () => {
  const { state, dispatch } = useContext(Store);
  const { categoryWord, guessedLetters, hasWon } = state;
  const letterArray = categoryWord.toString().split("");

  const containsAll = letterArray.every((letter) => {
    return guessedLetters.includes(letter);
  });
  const guessedLength = guessedLetters.length;
  const arrayLength = letterArray.length;

  useEffect(() => {
    const checkIfWon = (containsall, guessedlength, arraylength) => {
      const won = () => {
        dispatch({ type: "HAS_WON", payload: true });
      };
      const hasNotWon = () => {
        dispatch({ type: "HAS_WON", payload: false });
      };
      // const containsAll = letterArray.every((letter) => {
      //   return guessedLetters.includes(letter);
      // });

      if (
        // guessedLetters.length > 1 &&
        // letterArray.length >= guessedLetters.length &&
        // containsAll
        guessedlength > 1 &&
        arraylength >= guessedlength &&
        containsall
      ) {
        won();
      } else {
        hasNotWon();
      }
    };
    checkIfWon(containsAll, guessedLength, arrayLength);
  }, [guessedLetters, dispatch, containsAll, arrayLength, guessedLength]);

  const underlinedLetters = letterArray.map((letter, index) => {
    let isGuessed = false;
    if (guessedLetters.includes(letter)) {
      isGuessed = true;
    }
    return (
      <div key={index}>
        <h3 hidden={!isGuessed}>{letter} </h3> <span hidden={isGuessed}>_</span>
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

export default CategorySpaces;
