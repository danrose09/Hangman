import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../../react-store/store";

const CategoryWord = () => {
  const params = useParams();
  const { name } = params;
  const { state, dispatch } = useContext(Store);
  const {
    gameHasStarted,
    guessedLetters,
    categoryWord,
    userInfo,
    hasWon,
    winsAndLosses,
  } = state;
  let { wins } = winsAndLosses;
  const [wordHidden, setWordHidden] = useState(true);

  const letterArray = categoryWord.toLowerCase().split("");
  const letterArrayLength = letterArray.length;
  const containsAll = letterArray
    .filter((letter: string) => {
      return letter !== " ";
    })
    .every((letter: string) => {
      return guessedLetters.includes(letter.toLowerCase());
    });

  const fetchCategoryWord = async () => {
    const fetchWinsLosses = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/statistics/wins-losses/${userInfo.username}`
      );
      dispatch({ type: "FETCH_WINS_LOSSES", payload: data });
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/category/${userInfo.username}/${name}`
    );
    const categoryWords = data.words;
    const newCategoryWord =
      name === "countries" || name === "capitals"
        ? categoryWords[Math.floor(Math.random() * categoryWords.length)]
        : categoryWords[
            Math.floor(Math.random() * categoryWords.length)
          ].toLowerCase();

    dispatch({ type: "NEW_CATEGORY_WORD", payload: newCategoryWord });
    dispatch({ type: "START_STOP_GAME", payload: true });
    fetchWinsLosses();
  };

  useEffect(() => {
    const checkIfWon = (containsall: boolean, letterarraylength: number) => {
      const updateWinsAndLosses = async () => {
        try {
          await axios.put("http://localhost:5000/api/statistics/wins-losses", {
            username: userInfo.username,
            winsAndLosses: { ...winsAndLosses, wins: (wins += 1) },
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
        setWordHidden(true);
      };
      const hasNotWon = () => {
        dispatch({ type: "HAS_WON", payload: false });
      };

      if (letterarraylength > 1 && containsall) {
        won();
      } else {
        hasNotWon();
      }
    };
    checkIfWon(containsAll, letterArrayLength);
  }, [guessedLetters, dispatch, containsAll, letterArrayLength]);

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;
    if (letter === " ") {
      isGuessed = true;
    } else if (guessedLetters.includes(letter.toLowerCase())) {
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
      <div>
        <button className="grid-button-start" onClick={fetchCategoryWord}>
          Start
        </button>
        <button onClick={toggleHidden} className="grid-button">
          Show Word
        </button>
      </div>
      <div hidden={wordHidden || hasWon}>
        <p className="category-hidden-word">{categoryWord}</p>
      </div>
      <div className="underlined-letters">{underlinedLetters}</div>
      {hasWon && <h2>{categoryWord}</h2>}
    </div>
  );
};

export default CategoryWord;
