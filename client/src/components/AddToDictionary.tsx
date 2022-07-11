import React, { useState } from "react";
import axios from "axios";
import { Store } from "../store";

const AddToDictionary = (props: any) => {
  const { hasWon } = props;
  const [newWord, setNewWord] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [origin, setOrigin] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = await axios.post(
      `http://localhost:5000/api/definitions/addtomydictionary/${newWord}`,
      {
        newWord,
        partOfSpeech,
        origin,
        newDefinition,
      }
    );
    console.log(data);
  };

  return (
    <div hidden={!hasWon}>
      AddToDictionary
      <form>
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
        <button className="grid-button" type="submit" onSubmit={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddToDictionary;
