import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";

const CommonWord = () => {
  const { state, dispatch } = useContext(Store);
  const {
    commonWord,
    guessedLetters,
    hasWon,
    gameHasStarted,
    userInfo,
    winsAndLosses,
    shortDef,
  } = state;
  const word = commonWord;

  let { wins } = winsAndLosses;

  const [defIsVisible, setDefIsVisible] = useState(false);
  const [wordHidden, setWordHidden] = useState(true);
  const apiKey = "140eecdf-bd1e-4b4c-8477-0f78ec151b06";

  const letterArray = word.toLowerCase().split("");
  const letterArrayLength = letterArray.length;
  const containsAll = letterArray.every((letter: String) => {
    return guessedLetters.includes(letter);
  });

  const fetchCommonWord = async () => {
    const fetchWinsLosses = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/statistics/wins-losses/${userInfo.username}`
      );
      dispatch({ type: "FETCH_WINS_LOSSES", payload: data });
    };
    const { data } = await axios.get("http://localhost:5000/api/common-word");

    dispatch({ type: "START_STOP_GAME", payload: true });
    dispatch({ type: "NEW_COMMON_WORD", payload: data });
    setDefIsVisible(false);
    setWordHidden(true);

    fetchWinsLosses();
  };

  const showDefinition = async () => {
    setDefIsVisible((prevValue) => {
      return !prevValue;
    });
    const { data } = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
    );
    dispatch({
      type: "SET_SHORTDEF",
      payload: data[0].shortdef[0]
        ? data[0].shortdef[0]
        : "definition unavailable",
    });
  };

  useEffect(() => {
    const checkIfWon = (containsall: boolean, letterarraylength: number) => {
      const updateWinsAndLosses = async () => {
        try {
          await axios.put("http://localhost:5000/api/statistics/wins-losses", {
            username: userInfo.username,
            winsAndLosses: { ...winsAndLosses, wins: wins + 1 },
          });
        } catch (error) {
          console.log(error);
        }
      };
      const won = () => {
        const audio = new Audio("/audio/unlock.wav");
        audio.play();
        updateWinsAndLosses();
        dispatch({ type: "HAS_WON", payload: true });
        dispatch({ type: "START_STOP_GAME", payload: false });
      };
      const hasNotWon = () => {
        dispatch({ type: "HAS_WON", payload: false });
      };

      if (letterarraylength > 1 && containsall) {
        won();
        setDefIsVisible(false);
        setWordHidden(true);
      } else {
        hasNotWon();
      }
    };
    checkIfWon(containsAll, letterArrayLength);
  }, [
    guessedLetters,
    dispatch,
    containsAll,
    letterArrayLength,
    userInfo.username,
    wins,
    winsAndLosses,
    word,
  ]);

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;
    if (guessedLetters.includes(letter)) {
      isGuessed = true;
    }
    return (
      <div hidden={!gameHasStarted}>
        {isGuessed ? (
          <h3 className="underline-letter-space">{letter}</h3>
        ) : (
          <h3 className="underline-letter-space">_</h3>
        )}
      </div>
    );
  });

  const toggleHidden = () => {
    setWordHidden((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div>
      <button className="grid-button-start" onClick={fetchCommonWord}>
        Start
      </button>
      {hasWon && <h2 style={{ fontSize: "3rem" }}>{word}</h2>}
      <div className="random-word-buttons">
        <button
          className="grid-button"
          hidden={!gameHasStarted}
          onClick={toggleHidden}
        >
          Show Word
        </button>
        <button
          className="grid-button"
          hidden={!gameHasStarted}
          onClick={showDefinition}
        >
          Definition
        </button>
      </div>

      <div className="underlined-letters">{underlinedLetters}</div>
      <div hidden={wordHidden || hasWon}>{word.toLowerCase()}</div>
      <div hidden={!defIsVisible ? true : false}>{shortDef}</div>
    </div>
  );
};

export default CommonWord;
