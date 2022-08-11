import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const AddWord = () => {
  const params = useParams();
  const { name } = params;
  const [newWord, setNewWord] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleClick = async () => {
    if (newWord.length > 1) {
      try {
        await axios.post("http://localhost:5000/api/vocabulary/new", {
          newWord,
          categoryName: name,
          username: userInfo.username,
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
        <button className="grid-button" type="submit" onClick={handleClick}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddWord;
