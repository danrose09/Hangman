import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddWord = () => {
  const params = useParams();
  const { name } = params;
  const [newWord, setNewWord] = useState("");

  console.log(newWord);
  const handleClick = async () => {
    if (newWord) {
      try {
        await axios.post("http://localhost:5000/api/vocabulary/new", {
          newWord,
          name,
        });

        setNewWord("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <form>
        <input
          name="newWord"
          type="text"
          placeholder="add a word..."
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        ></input>
        <button type="submit" onClick={handleClick}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default AddWord;
