import { useContext } from "react";
import { Store } from "../../react-store/store";
import AddToDictionary from "../play random components/AddToDictionary";

const UserLose = (props: any) => {
  const { dispatch, state } = useContext(Store);
  const { categoryWord } = state;
  const { randomWord } = props;

  console.log(randomWord);

  const playAgain = () => {
    dispatch({ type: "REFRESH" });
  };
  return (
    <div>
      <h1>Oh No. The word was:</h1>
      <h1 className="lost-word">
        {randomWord
          ? randomWord[0].length >= 1 && randomWord[0].toLowerCase()
          : categoryWord}
      </h1>

      <button className="grid-button-start" onClick={playAgain}>
        Play Again?
      </button>
    </div>
  );
};

export default UserLose;
