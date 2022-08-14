import { useContext } from "react";
import { Store } from "../../react-store/store";

const DifficultySettings = () => {
  const { dispatch } = useContext(Store);

  const selectFruit = (e: any) => {
    dispatch({ type: "SET_DIFFICULTY", payload: e.target.value });
  };

  return (
    <div>
      <label htmlFor="difficulty">Choose a Difficulty: </label>
      <select id="difficulty" name="difficulty" onChange={selectFruit}>
        <option value="easy">Easy</option>
        <option value="normal" selected>
          Normal
        </option>
        <option value="hard">Hard</option>
        <option value="genius">Genius</option>
      </select>
    </div>
  );
};

export default DifficultySettings;
