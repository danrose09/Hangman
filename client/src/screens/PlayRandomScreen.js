import React, { useState, useEffect, useContext } from "react";
import RandomWord from "../components/RandomWord";
import UnderlinedLetters from "../components/UnderlinedLetters";
import LetterBank from "../components/LetterBank";
import GuessedLetters from "../components/GuessedLetters";
import { Store } from "../store";

const PlayRandomScreen = () => {
  //     const { state, dispatch } = useContext(Store)
  //     const {}
  //   const [hasWon, setHaswon] = useState(false);

  //   useEffect(() => {

  //   })

  return (
    <div>
      <RandomWord />
      <UnderlinedLetters />
      <LetterBank />
      <GuessedLetters />
    </div>
  );
};

export default PlayRandomScreen;
