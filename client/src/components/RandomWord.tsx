import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../store";
import Confetti from "react-confetti";
import AddToDictionary from "./AddToDictionary";

const RandomWord = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, guessedLetters, hasWon, stopConfetti } = state;

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [defIsVisible, setDefIsVisible] = useState(false);
  const [wordHidden, setWordHidden] = useState(true);

  const letterArray = word.toLowerCase().split("");

  const letterArrayLength = letterArray.length;

  const containsAll = letterArray.every((letter: String) => {
    return guessedLetters.includes(letter);
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://random-words-api.vercel.app/word"
      );
      dispatch({ type: "NEW_RANDOM_WORD", payload: data });
    };
    fetchData();
  }, [dispatch]);

  const fetchRandomWord = async () => {
    const { data } = await axios.get(
      "https://random-words-api.vercel.app/word"
    );
    dispatch({ type: "NEW_RANDOM_WORD", payload: data });
    setWord(randomWord[0].word.toLowerCase());
    setDefinition(randomWord[0].definition.toLowerCase());
    setDefIsVisible(false);

    console.log(randomWord);
  };

  const showDefinition = () => {
    setDefIsVisible((prevValue) => {
      return !prevValue;
    });
  };

  //Letter Spaces Section

  useEffect(() => {
    const checkIfWon = (containsall: boolean, letterarraylength: number) => {
      const won = () => {
        const audio = new Audio("/audio/unlock.wav");
        audio.play();
        dispatch({ type: "HAS_WON", payload: true });
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
      <div key={index} className="underline">
        {isGuessed ? <h3>{letter}</h3> : <h3>_</h3>}
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
      <div className="random-word-buttons">
        <button className="grid-button" onClick={fetchRandomWord}>
          Get New Word
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
      <div hidden={wordHidden || hasWon}>{word}</div>
      <div hidden={!defIsVisible ? true : false}>{definition}</div>
      {hasWon && !stopConfetti && <Confetti />}
      <div className="underlined-letters">{underlinedLetters}</div>
      <AddToDictionary hasWon={hasWon} />
    </div>
  );
};

export default RandomWord;
