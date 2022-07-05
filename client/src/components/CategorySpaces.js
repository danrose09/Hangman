import React, { useContext, useEffect } from "react";
import { Store } from "../store";

const CategorySpaces = () => {
  const { state, dispatch } = useContext(Store);
  const { categoryWord, guessedLetters, hasWon } = state;
  const letterArray = categoryWord.toString().split("");

  console.log(`letterArray: ${letterArray}`);
  console.log(`Guessed Letters: ${guessedLetters}`);
  console.log(hasWon);

  useEffect(() => {
    const containsAll = letterArray.every((letter) => {
      return guessedLetters.includes(letter);
    });
    if (
      guessedLetters.length > 1 &&
      letterArray.length >= guessedLetters.length &&
      containsAll
    ) {
      dispatch({ type: "HAS_WON", payload: true });
    }
  }, [guessedLetters]);

  const underlinedLetters = letterArray.map((letter, index) => {
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

export default CategorySpaces;
