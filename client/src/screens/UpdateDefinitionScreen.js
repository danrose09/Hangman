import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const UpdateDefinitionScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { myDefinition, userInfo } = state;
  const [definitionState, setDefinitionState] = useState({
    word: "",
    partOfSpeech: "",
    origin: "",
    definition: "",
  });

  console.log(userInfo);

  useEffect(() => {
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
  }, [dispatch]);

  const handleChange = (e) => {
    const newDefinitionState = { ...definitionState };
    newDefinitionState[e.target.id] = e.target.value;
    setDefinitionState(newDefinitionState);
  };

  console.log(definitionState);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/update/${params.word}`, {
      word: definitionState.word,
      partOfSpeech: definitionState.partOfSpeech,
      origin: definitionState.origin,
      definition: definitionState.definition,
      username: userInfo.username,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="dictionary-grid">
          <button onClick={() => navigate("/mydictionary")}>Back</button>
          <div className="grid-item grid-item-1">
            <h2 className="dictionary-word">
              {`${myDefinition.word} `}
              <input
                type="text"
                id="word"
                placeholder={myDefinition.word}
                required
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
              onChange={(e) => handleChange(e)}
            ></input>
          </p>

          <p className="grid-item grid-item-3">
            <strong>Origin:</strong> {`${myDefinition.origin} `}
            <input
              type="text"
              id="origin"
              placeholder={myDefinition.origin}
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
              onChange={(e) => handleChange(e)}
            ></input>
          </p>
        </div>

        <img
          src="https://i.etsystatic.com/13221305/r/il/294079/1501754794/il_570xN.1501754794_8hlr.jpg"
          height={70}
          width={120}
        ></img>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDefinitionScreen;
