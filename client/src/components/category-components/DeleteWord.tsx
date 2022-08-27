import { useState, useContext } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const DeleteWord = (props: any) => {
  const { categoryname } = props;
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
        categoryName: categoryname,
      });
      setWord("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
        <input
          onChange={handleChange}
          placeholder="remove a word..."
          className="input-box"
        ></input>
        <button
          className="grid-button"
          style={{ margin: "0", width: "50%" }}
          type="submit"
        >
          <FontAwesomeIcon
            style={{ paddingRight: "0.5rem" }}
            icon={faCircleMinus}
          />
          Remove
        </button>
      </form>
    </div>
  );
};

export default DeleteWord;
