import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../../react-store/store";

const DeleteWord = () => {
  const params = useParams();
  const { name } = params;
  const [word, setWord] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleChange = (e: any) => {
    setWord(e.target.value);
  };

  const submitHandler = async (e: any) => {
    try {
      await axios.put(`http://localhost:5000/api/vocabulary/remove/${word}`, {
        removedWord: word,
        username: userInfo.username,
        categoryName: name,
      });
      setWord("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input onChange={handleChange} placeholder="remove a word..."></input>
        <button className="grid-button" type="submit">
          Remove
        </button>
      </form>
    </div>
  );
};

export default DeleteWord;
