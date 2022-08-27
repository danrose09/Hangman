import { useContext, useEffect } from "react";
import { Store } from "../../react-store/store";
import axios from "axios";

const LetterBank = (props: any) => {
  const { state, dispatch } = useContext(Store);
  const {
    letterBank,
    userInfo,
    remainingAttempts,
    randomWord,
    categoryWord,
    commonWord,
    winsAndLosses,
  } = state;
  const { wins, losses } = winsAndLosses;

  console.log(wins);
  console.log(losses);

  const audio = new Audio("/audio/soft-click.wav");

  useEffect(() => {
    const fetchWinsLosses = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/statistics/wins-losses/${userInfo.username}`
      );
      dispatch({ type: "FETCH_WINS_LOSSES", payload: data });
    };
    const updateWinsAndLosses = async () => {
      try {
        await axios.put("http://localhost:5000/api/statistics/wins-losses", {
          username: userInfo.username,
          winsAndLosses: { ...winsAndLosses, losses: losses + 1 },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (remainingAttempts === 0) {
      dispatch({ type: "SET_HAS_LOST", payload: true });
      fetchWinsLosses();
      updateWinsAndLosses();
    }
  }, [dispatch, remainingAttempts, losses, winsAndLosses, userInfo.username]);

  const submitLetterHandler = (letter: String) => {
    audio.play();
    dispatch({ type: "GUESS_LETTER", payload: letter });
    if (
      categoryWord.length >= 1 &&
      remainingAttempts >= 1 &&
      categoryWord.toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
    if (
      commonWord.length >= 1 &&
      remainingAttempts >= 1 &&
      commonWord.toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
    if (
      randomWord[0] !== "random" &&
      remainingAttempts >= 1 &&
      randomWord[0].length >= 1 &&
      randomWord[0].toLowerCase().split("").includes(letter) === false
    ) {
      dispatch({ type: "ATTEMPT_COUNTER", payload: remainingAttempts - 1 });
    }
  };

  const availableLetters = letterBank.map((letter: String, index: number) => {
    return (
      <button
        key={index}
        className="letter-button"
        onClick={() => submitLetterHandler(String(letter))}
      >
        {letter}
      </button>
    );
  });
  return <div style={{ marginTop: "25px" }}>{availableLetters}</div>;
};

export default LetterBank;
