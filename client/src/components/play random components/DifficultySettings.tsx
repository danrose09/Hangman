import { useContext } from "react";
import { Store } from "../../react-store/store";

const DifficultySettings = () => {
  const { dispatch } = useContext(Store);

  const selectDifficulty = (e: any) => {
    dispatch({ type: "SET_DIFFICULTY", payload: e.target.value });
  };

  return (
    <div>
      <label htmlFor="difficulty">Difficulty: </label>
      <select
        defaultValue="normal"
        id="difficulty"
        name="difficulty"
        className="input-box"
        onChange={selectDifficulty}
      >
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="genius">Genius</option>
      </select>
    </div>
  );
};

export default DifficultySettings;
