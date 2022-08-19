import { useContext, useEffect } from "react";
import DifficultySettings from "../components/play random components/DifficultySettings";
import RandomWord from "../components/play random components/RandomWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import { Store } from "../react-store/store";
import UserLose from "../components/category&play-random-components/UserLose";

const PlayGeniusScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { gameHasStarted, hasLost, hasWon } = state;

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div className="play-random-screen">
      <h1>Hangman</h1>
      {!gameHasStarted && <DifficultySettings />}
      {!hasLost ? <RandomWord /> : <UserLose />}
      {gameHasStarted && !hasWon && !hasLost && <LetterBank />}
    </div>
  );
};

export default PlayGeniusScreen;
