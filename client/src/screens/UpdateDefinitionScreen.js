import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../react-store/store";

const UpdateDefinitionScreen = () => {
  const params = useParams();
  const { state, dispatch } = useContext(Store);
  const { myDefinition, userInfo, message } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);
  const [definitionState, setDefinitionState] = useState({
    word: "",
    partOfSpeech: "",
    origin: "",
    definition: "",
  });

  console.log(definitionState);

  useEffect(() => {
    dispatch({ type: "CLEAR_MESSAGE", payload: "" });
    const fetchMyDefinition = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/definitions/${userInfo.username}/${params.word}`
        );

        dispatch({ type: "FETCH_MY_DEFINITION", payload: data[0] });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchMyDefinition();
  }, [dispatch, params.word, userInfo.username]);

  const handleChange = (e) => {
    const newDefinitionState = { ...definitionState };
    newDefinitionState[e.target.id] = e.target.value;
    setDefinitionState(newDefinitionState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessageIsHidden(false);
    await axios
      .put(`http://localhost:5000/api/update/${params.word}`, {
        word: definitionState.word,
        partOfSpeech: definitionState.partOfSpeech,
        origin: definitionState.origin,
        definition: definitionState.definition,
        username: userInfo.username,
      })
      .then(
        dispatch({ type: "UPDATE_SUCCESSFUL", payload: "Update Successful" })
      );
  };

  const toggleHidden = (e) => {
    setMessageIsHidden(true);
  };

  return (
    <div>
      {message === "Update Successful" && (
        <div hidden={messageIsHidden} className="success">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="dictionary-grid">
          <div className="grid-item grid-item-1">
            <h2 className="dictionary-word">
              {`${myDefinition.word} `}
              <input
                type="text"
                id="word"
                placeholder={myDefinition.word}
                required
                className="input-box"
                onChange={(e) => handleChange(e)}
              ></input>
            </h2>
          </div>
          <p className="grid-item grid-item-2">
            <strong>Part of speech:</strong> {`${myDefinition.partOfSpeech} `}
            <input
              type="text"
              id="partOfSpeech"
              required
              placeholder={myDefinition.partOfSpeech}
              className="input-box"
              onChange={(e) => handleChange(e)}
            ></input>
          </p>

          <p className="grid-item grid-item-3">
            <strong>Origin:</strong> {`${myDefinition.origin} `}
            <input
              type="text"
              id="origin"
              placeholder={myDefinition.origin}
              className="input-box"
              onChange={(e) => handleChange(e)}
            ></input>
          </p>

          <p className="grid-item grid-item-4">
            <strong>Definition:</strong> {`${myDefinition.definition} `}
            <input
              type="text"
              id="definition"
              required
              placeholder={myDefinition.definition}
              className="input-box"
              onChange={(e) => handleChange(e)}
            ></input>
          </p>
        </div>

        <img
          src="https://i.etsystatic.com/13221305/r/il/294079/1501754794/il_570xN.1501754794_8hlr.jpg"
          height={70}
          width={120}
          alt=""
        ></img>
        <button className="grid-button-start" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateDefinitionScreen;
