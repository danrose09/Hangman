import React, { useState, useEffect, useContext } from "react";
import RandomWord from "../components/RandomWord";
import UnderlinedLetters from "../components/UnderlinedLetters";
import LetterBank from "../components/LetterBank";
import GuessedLetters from "../components/GuessedLetters";
import { Store } from "../store";
import Refresh from "../components/Refresh";

const PlayRandomScreen = () => {
  return (
    <div>
      <RandomWord />
      <UnderlinedLetters />
      <LetterBank />
      <GuessedLetters />
      <Refresh />
    </div>
  );
};

export default PlayRandomScreen;
