import { useContext } from "react";
import { Store } from "../../react-store/store";

const UserLose = () => {
  const { dispatch, state } = useContext(Store);
  const { randomWord, categoryWord } = state;

  const playAgain = () => {
    dispatch({ type: "REFRESH" });
  };
  return (
    <div>
      <h1>Oh No. The word was:</h1>
      <h1 className="lost-word">
        {randomWord[0].word.length >= 1 ? randomWord[0].word : categoryWord}
      </h1>
      <button className="grid-button-start" onClick={playAgain}>
        Play Again?
      </button>
    </div>
  );
};

export default UserLose;
