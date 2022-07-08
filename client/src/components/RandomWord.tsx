import { useContext } from "react";
import axios from "axios";
import { Store } from "../store";

const RandomWord = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, hasWon } = state;
  console.log(`Has Won?: ${hasWon}`);

  const fetchRandomWord = async () => {
    const { data } = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );
    dispatch({ type: "NEW_RANDOM_WORD", payload: data });
  };

  return (
    <div>
      RandomWord: {randomWord}
      <button onClick={fetchRandomWord}>Get New Word</button>
    </div>
  );
};

export default RandomWord;
