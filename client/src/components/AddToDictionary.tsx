import React, { Fragment, useState, useContext } from "react";
import axios from "axios";
import { Store } from "../store";

const AddToDictionary = (props: any) => {
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;
  const { hasWon } = props;
  const [addToDictionary, setAddToDictionary] = useState(false);
  const [buttonIsHidden, setButtonIsHidden] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [origin, setOrigin] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  const submitHandler = async (e: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/definitions/addtomydictionary`,
        {
          word: newWord,
          partOfSpeech: partOfSpeech,
          origin: origin,
          definition: newDefinition,
          username: userInfo.username,
        }
      );
      dispatch({ type: "ADD_TO_DICTIONARY", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.log("failure");
      console.log(error);
    }
  };

  const clickHandler = () => {
    setAddToDictionary((prevValue) => {
      return !prevValue;
    });
    setButtonIsHidden(true);
    dispatch({ type: "STOP_CONFETTI", payload: true });
  };

  return (
    <Fragment>
      <button
        className="grid-button"
        hidden={!hasWon || buttonIsHidden}
        onClick={clickHandler}
      >
        Add to My Dictionary
      </button>
      <div hidden={!addToDictionary}>
        <form onSubmit={(e) => submitHandler(e)}>
          <label>Word:</label>
          <input
            name="word"
            value={newWord}
            type="text"
            placeholder="word..."
            onChange={(e) => setNewWord(e.target.value)}
          ></input>
          <label>Part of Speech:</label>
          <input
            name="partOfSpeech"
            value={partOfSpeech}
            type="text"
            placeholder="part of speech..."
            onChange={(e) => setPartOfSpeech(e.target.value)}
          ></input>
          <br />
          <label>Origin:</label>
          <input
            name="origin"
            value={origin}
            type="text"
            placeholder="origin..."
            onChange={(e) => setOrigin(e.target.value)}
          ></input>
          <label>Definition:</label>
          <input
            name="definition"
            value={newDefinition}
            type="text"
            placeholder="definition"
            onChange={(e) => setNewDefinition(e.target.value)}
          ></input>
          <button className="grid-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddToDictionary;
