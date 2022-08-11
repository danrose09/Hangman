import { Fragment, useState, useContext } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";

const AddToDictionary = (props: any) => {
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;
  const { hasWon, randomWord } = props;
  const { word, definition } = randomWord[0];
  const [addToDictionary, setAddToDictionary] = useState(false);
  const [buttonIsHidden, setButtonIsHidden] = useState(false);
  const [newPartOfSpeech, setNewPartOfSpeech] = useState("");
  const [newOrigin, setNewOrigin] = useState("");

  const submitHandler = async (e: any) => {
    try {
      await axios.put(
        `http://localhost:5000/api/definitions/addtomydictionary`,
        {
          word,
          partOfSpeech: newPartOfSpeech,
          origin: newOrigin,
          definition,
          username: userInfo.username,
        }
      );
    } catch (error) {
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
        className="grid-button-start"
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
            readOnly
            value={word}
            type="text"
            placeholder="word..."
          ></input>
          <label>Part of Speech:</label>
          <input
            name="partOfSpeech"
            value={newPartOfSpeech}
            type="text"
            placeholder="part of speech..."
            onChange={(e) => setNewPartOfSpeech(e.target.value)}
          ></input>
          <br />
          <label>Origin:</label>
          <input
            name="origin"
            value={newOrigin}
            type="text"
            placeholder="origin..."
            onChange={(e) => setNewOrigin(e.target.value)}
          ></input>
          <label>Definition:</label>
          <input
            name="definition"
            readOnly
            value={definition}
            type="text"
            placeholder="definition..."
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
