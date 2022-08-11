import { useContext } from "react";
import RandomWord from "../components/play random components/RandomWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import { Store } from "../react-store/store";

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
