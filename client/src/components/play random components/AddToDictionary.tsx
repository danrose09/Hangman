import { useState, useContext } from "react";
import axios from "axios";
import { Store } from "../../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const AddToDictionary = (props: any) => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, mwDefinition } = state;
  const { hasWon, hasLost, randomWord } = props;
  const word = randomWord[0];

  const [addToDictionary, setAddToDictionary] = useState(false);
  const [newPartOfSpeech, setNewPartOfSpeech] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [userDefinition, setUserDefinition] = useState("");

  const apiKey = "140eecdf-bd1e-4b4c-8477-0f78ec151b06";

  const merriamWebsterDefinition =
    mwDefinition && mwDefinition[0].shortdef
      ? mwDefinition[0].shortdef[0]
      : null;

  const submitHandler = async (e: any) => {
    try {
      await axios.put(
        `http://localhost:5000/api/definitions/addtomydictionary`,
        {
          word,
          partOfSpeech: newPartOfSpeech,
          origin: newOrigin,
          definition: merriamWebsterDefinition
            ? merriamWebsterDefinition
            : userDefinition,
          username: userInfo.username,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addToDictionaryHandler = () => {
    setAddToDictionary((prevValue) => {
      return !prevValue;
    });
    dispatch({ type: "CLEAR_MW_DEFINITION" });
    const fetchDefintion = async () => {
      try {
        const { data } = await axios.get(
          `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
        );
        console.log(data);

        dispatch({ type: "FETCH_MW_DEFINITION", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDefintion();
  };

  return (
    <div>
      <div hidden={!hasWon && !hasLost}>
        <FontAwesomeIcon
          className="add-to-dictionary-icon"
          icon={faBookOpen}
          style={{ height: "50px", width: "50px", color: "#ff7eee" }}
          onClick={addToDictionaryHandler}
        />
        <h3 style={{ color: "#ff7eee" }}>Add to My Dictionary</h3>
      </div>
      <div hidden={!addToDictionary}>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="add-to-dictionary-container">
            <label>Word:</label>
            <input
              name="word"
              readOnly
              value={word}
              type="text"
              className="input-box"
              placeholder="word..."
            ></input>
            <label>Part of Speech:</label>
            <input
              name="partOfSpeech"
              value={newPartOfSpeech}
              type="text"
              placeholder="part of speech..."
              className="input-box"
              onChange={(e) => setNewPartOfSpeech(e.target.value)}
            ></input>
            <br />
            <label>Origin:</label>
            <input
              name="origin"
              value={newOrigin}
              type="text"
              placeholder="origin..."
              className="input-box"
              onChange={(e) => setNewOrigin(e.target.value)}
            ></input>
            <label>Definition:</label>
            <input
              name="definition"
              value={
                merriamWebsterDefinition
                  ? merriamWebsterDefinition
                  : userDefinition
              }
              onChange={(e) => setUserDefinition(e.target.value)}
              type="text"
              className="input-box"
              placeholder="definition..."
            ></input>
          </div>
          <button className="grid-button-start" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToDictionary;
