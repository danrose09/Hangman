import { useContext } from "react";
import { Store } from "../../react-store/store";

const UserLose = (props: any) => {
  const { dispatch, state } = useContext(Store);
  const { categoryWord } = state;
  const { randomWord, commonWord } = props;

  const playAgain = () => {
    dispatch({ type: "REFRESH" });
  };
  return (
    <div>
      <h1>Oh No. The word was:</h1>
      <h1 className="lost-word">
        {randomWord
          ? randomWord[0].length >= 1 && randomWord[0].toLowerCase()
          : categoryWord
          ? categoryWord
          : commonWord}
      </h1>
      <div>
        <img
          src="/images/sadstickfigure.jpg"
          alt="a sad stick man"
          height={200}
          width={200}
        />
      </div>

      <button
        style={{ marginBottom: "10px" }}
        className="grid-button-start"
        onClick={playAgain}
      >
        Play Again?
      </button>
    </div>
  );
};

export default UserLose;
