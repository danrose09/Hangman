import { Fragment, useEffect, useContext, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const MyDictionaryScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { myDictionary } = state;

  const [update, setUpdate] = useState(false);

  console.log(update);

  useEffect(() => {
    const fetchMyDictionary = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/mydictionary"
        );
        console.log(data);
        dispatch({ type: "FETCH_MY_DICTIONARY", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchMyDictionary();
  }, [dispatch]);

  const allDefinitions = myDictionary.map((term: any, index: number) => {
    const deleteFromDictionary = async () => {
      const deleteWord = await axios.put(
        `http://localhost:5000/api/mydictionary/delete/${term.word}`
      );
    };

    const updateEntry = async () => {
      setUpdate(true);
    };

    const submitHandler = () => {};
    return (
      <div key={index}>
        <form hidden={!update} onSubmit={submitHandler}>
          <div className="dictionary-grid">
            <div className="grid-item grid-item-1">
              <h2 hidden={update} className="dictionary-word">{`${index + 1}: ${
                term.word
              }`}</h2>
              <h2 hidden={!update}>
                {`${index + 1}: `}
                <input type="text" placeholder={term.word}></input>
              </h2>

              <button onClick={updateEntry} className="grid-button">
                Update
              </button>

              <button className="grid-button" onClick={deleteFromDictionary}>
                Delete
              </button>
            </div>
            <p hidden={update} className="grid-item grid-item-2">
              <strong>Part of speech:</strong> {`${term.partOfSpeech}`}
            </p>
            <p hidden={!update} className="grid-item grid-item-2">
              <strong>Part of speech:</strong>{" "}
              <input type="text" placeholder={term.partOfSpeech}></input>
            </p>

            <p hidden={update} className="grid-item grid-item-3">
              <strong>Origin:</strong> {`${term.origin}`}
            </p>
            <p hidden={!update} className="grid-item grid-item-3">
              <strong>Origin:</strong>{" "}
              <input type="text" placeholder={term.origin}></input>
            </p>
            <p hidden={update} className="grid-item grid-item-4">
              <strong>Definition:</strong> {`${term.definition}`}
            </p>
            <p hidden={!update} className="grid-item grid-item-4">
              <strong>Definition:</strong>{" "}
              <input type="text" placeholder={term.definition}></input>
            </p>
          </div>
          <button hidden={!update} type="submit">
            Submit Changes
          </button>
        </form>
        <img
          src="https://i.etsystatic.com/13221305/r/il/294079/1501754794/il_570xN.1501754794_8hlr.jpg"
          height={70}
          width={120}
        ></img>
      </div>
    );
  });

  return (
    <Fragment>
      <h1>My Dictionary</h1>
      <div>{allDefinitions}</div>
    </Fragment>
  );
};

export default MyDictionaryScreen;
