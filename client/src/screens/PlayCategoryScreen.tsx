import { useContext, useEffect } from "react";
import { Store } from "../react-store/store";
import Attempts from "../components/category&play-random-components/Attempts";
import CategoryWord from "../components/category-components/CategoryWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import DifficultySettings from "../components/play random components/DifficultySettings";
import UserLose from "../components/category&play-random-components/UserLose";

const PlayCategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { gameHasStarted, hasWon, hasLost, categoryWord } = state;

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hangman</h1>
      {!gameHasStarted && <DifficultySettings />}
      {gameHasStarted && <Attempts />}
      {!hasLost ? <CategoryWord /> : <UserLose categoryWord={categoryWord} />}
      {gameHasStarted && !hasWon && !hasLost && <LetterBank />}
    </div>
  );
};

export default PlayCategoryScreen;
