import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../store";
import AddToDictionary from "./AddToDictionary";

const RandomWord = () => {
  const { state, dispatch } = useContext(Store);
  const { randomWord, guessedLetters, hasWon } = state;

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [defIsVisible, setDefIsVisible] = useState(false);

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
      <div>
        <h3 hidden={!isGuessed} key={index}>
          {letter}{" "}
        </h3>{" "}
        <span hidden={isGuessed}>_</span>
      </div>
    );
  });

  return (
    <div>
      Random Word: {word}
      <button onClick={fetchRandomWord}>Get New Word</button>
      <button onClick={showDefinition}>Definition</button>
      <a
        rel="noreferrer"
        target="_blank"
        href={`https://www.merriam-webster.com/dictionary/${word}`}
      >
        <button hidden={!hasWon}>Look Up</button>
      </a>
      <button>Add to My Dictionary</button>
      <br />
      <div hidden={!defIsVisible ? true : false}>Definition: {definition}</div>
      <h1 hidden={!hasWon}>You won!</h1>
      <div className="underlined-letters">{underlinedLetters}</div>
      <AddToDictionary hasWon={hasWon} word={word} definition={definition} />
    </div>
  );
};

export default RandomWord;
