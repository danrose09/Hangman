import React from "react";
import RandomWord from "../components/RandomWord";
import LetterBank from "../components/LetterBank";
import GuessedLetters from "../components/GuessedLetters";
import Refresh from "../components/Refresh";

const PlayRandomScreen = () => {
  return (
    <div>
      <RandomWord />
      <LetterBank />
      <GuessedLetters />
      <Refresh />
    </div>
  );
};

export default PlayRandomScreen;
