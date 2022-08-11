import { useContext } from "react";
import RandomWord from "../components/RandomWord";
import LetterBank from "../components/LetterBank";
import { Store } from "../store";

const PlayRandomScreen = () => {
  const { state } = useContext(Store);
  const { gameHasStarted } = state;

  return (
    <div className="play-random-screen">
      <h1>Hangman</h1>
      <RandomWord />
      {gameHasStarted && <LetterBank />}
    </div>
  );
};

export default PlayRandomScreen;
