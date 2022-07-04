import React, { useContext, useState } from "react";
import { Store } from "../store";

const UnderlinedLetters = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord } = state;
  const letterArray = randomWord.toString().split("");

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    console.log(index);
    return <h3 key={index}>{"_"} </h3>;
  });

  return <div className="underlined-letters">{underlinedLetters}</div>;
};

export default UnderlinedLetters;
