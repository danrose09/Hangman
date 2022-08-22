import { useContext, useEffect } from "react";
import DifficultySettings from "../components/play random components/DifficultySettings";
import RandomWord from "../components/play random components/RandomWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import { Store } from "../react-store/store";
import UserLose from "../components/category&play-random-components/UserLose";
import Attempts from "../components/category&play-random-components/Attempts";

const PlayGeniusScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { gameHasStarted, hasLost, hasWon, randomWord } = state;

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div className="play-random-screen">
      <h1>Hangman</h1>
      {!gameHasStarted && <DifficultySettings />}
      {gameHasStarted && <Attempts />}
      {!hasLost ? <RandomWord /> : <UserLose randomWord={randomWord} />}
      {gameHasStarted && !hasWon && !hasLost && <LetterBank />}
    </div>
  );
};

export default PlayGeniusScreen;
