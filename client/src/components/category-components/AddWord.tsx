import { useState, useContext } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddWord = (props: any) => {
  const { categoryname } = props;
  const [newWord, setNewWord] = useState("");
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  const handleClick = async () => {
    if (newWord.length > 1) {
      try {
        await axios.post("http://localhost:5000/api/vocabulary/new", {
          newWord: newWord,
          categoryName: categoryname,
          username: userInfo.username,
        });

        setNewWord("");
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload: "word must contain at least one character",
      });
    }
  };
  return (
    <div>
      <form style={{ textAlign: "center" }}>
        <input
          name="newWord"
          type="text"
          placeholder="add a word..."
          value={newWord}
          className="input-box"
          onChange={(e) => setNewWord(e.target.value)}
        ></input>
        <button
          className="grid-button-start"
          style={{ margin: "0", width: "50%" }}
          type="submit"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            style={{ paddingRight: "0.5rem" }}
            icon={faPlusCircle}
          />
          Add
        </button>
      </form>
    </div>
  );
};

export default AddWord;
