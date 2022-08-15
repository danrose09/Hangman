import { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";
import Confetti from "react-confetti";
import AddToDictionary from "./AddToDictionary";
import Attempts from "../category&play-random-components/Attempts";

const RandomWord = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, guessedLetters, hasWon, stopConfetti, gameHasStarted } =
    state;
  const { word, definition } = randomWord[0];
  const [defIsVisible, setDefIsVisible] = useState(false);
  const [wordHidden, setWordHidden] = useState(true);

  const letterArray = word.toLowerCase().split("");
  const letterArrayLength = letterArray.length;
  const containsAll = letterArray.every((letter: String) => {
    return guessedLetters.includes(letter);
  });

  const fetchRandomWord = async () => {
    const { data } = await axios.get(
      "https://random-words-api.vercel.app/word"
    );
    dispatch({ type: "START_STOP_GAME", payload: true });
    dispatch({ type: "NEW_RANDOM_WORD", payload: data });
  };

  const showDefinition = () => {
    setDefIsVisible((prevValue) => {
      return !prevValue;
    });
  };

  useEffect(() => {
    const checkIfWon = (containsall: boolean, letterarraylength: number) => {
      const won = () => {
        const audio = new Audio("/audio/unlock.wav");
        audio.play();
        dispatch({ type: "HAS_WON", payload: true });
        dispatch({ type: "START_STOP_GAME", payload: false });
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
    if (guessedLetters.includes(letter)) {
      isGuessed = true;
    }
    return (
      <Fragment>
        {isGuessed ? (
          <h3 className="underline-letter-space">{letter}</h3>
        ) : (
          <h3 className="underline-letter-space">_</h3>
        )}
      </Fragment>
    );
  });

  const toggleHidden = () => {
    setWordHidden((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div>
      {gameHasStarted && <Attempts />}
      <div className="random-word-buttons">
        <button className="grid-button-start" onClick={fetchRandomWord}>
          Start
        </button>
        <button className="grid-button" onClick={toggleHidden}>
          Show Word
        </button>
        <button className="grid-button" onClick={showDefinition}>
          Definition
        </button>
      </div>
      <a
        rel="noreferrer"
        target="_blank"
        href={`https://www.merriam-webster.com/dictionary/${word}`}
      >
        <button className="grid-button" hidden={!hasWon}>
          Look Up
        </button>
      </a>

      {hasWon && !stopConfetti && <Confetti />}
      <div className="underlined-letters">{underlinedLetters}</div>
      <div hidden={wordHidden || hasWon}>{word.toLowerCase()}</div>
      <div hidden={!defIsVisible ? true : false}>{definition}</div>
      <AddToDictionary hasWon={hasWon} randomWord={randomWord} />
    </div>
  );
};

export default RandomWord;
