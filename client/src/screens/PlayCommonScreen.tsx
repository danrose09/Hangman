import { Fragment, useContext, useEffect } from "react";
import DifficultySettings from "../components/play random components/DifficultySettings";
import LetterBank from "../components/category&play-random-components/LetterBank";
import { Store } from "../react-store/store";
import UserLose from "../components/category&play-random-components/UserLose";
import Attempts from "../components/category&play-random-components/Attempts";
import AddToDictionary from "../components/play random components/AddToDictionary";
import CommonWord from "../components/play common components/CommonWord";

const PlayCommonScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { gameHasStarted, hasLost, hasWon, commonWord } = state;

  console.log(`won: ${hasWon}`);
  console.log(`lost: ${hasLost}`);

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div className="play-random-screen">
      <h1>Hangman</h1>
      {!gameHasStarted && <DifficultySettings />}
      {gameHasStarted && <Attempts />}
      {!hasLost ? (
        <CommonWord />
      ) : (
        <Fragment>
          <UserLose commonWord={commonWord} />{" "}
        </Fragment>
      )}
      {gameHasStarted && !hasWon && !hasLost && <LetterBank />}
    </div>
  );
};

export default PlayCommonScreen;
