import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DifficultySettings from "../components/play random components/DifficultySettings";
import LetterBank from "../components/category&play-random-components/LetterBank";
import { Store } from "../react-store/store";
import UserLose from "../components/category&play-random-components/UserLose";
import Attempts from "../components/category&play-random-components/Attempts";
import CommonWord from "../components/play common components/CommonWord";

const PlayCommonScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { gameHasStarted, hasLost, hasWon, commonWord, userInfo } = state;

  console.log(`won: ${hasWon}`);
  console.log(`lost: ${hasLost}`);

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div>
      {!userInfo ? (
        <div style={{ textAlign: "center" }}>
          <h1>Sign In Required</h1>
          <button
            className="grid-button-start"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default PlayCommonScreen;
