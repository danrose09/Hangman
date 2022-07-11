import { Fragment, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const MyDictionaryScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { myDictionary } = state;

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
    return (
      <div key={index}>
        <div className="dictionary-grid">
          <div className="grid-item grid-item-1">
            <h2 className="dictionary-word">{`${index + 1}: ${term.word}`}</h2>

            {/* <Link
              to={`/mydictionary/update/${term.word}`}
              style={{ textDecoration: "none", color: "ffffff" }}
            > */}
            <button className="grid-button">Update</button>
            {/* </Link> */}

            <button className="grid-button" onClick={deleteFromDictionary}>
              Delete
            </button>
          </div>
          <p className="grid-item grid-item-2">
            <strong>Part of speech:</strong> {`${term.partOfSpeech}`}
          </p>

          <p className="grid-item grid-item-3">
            <strong>Origin:</strong> {`${term.origin}`}
          </p>
          <p className="grid-item grid-item-4">
            <strong>Definition:</strong> {`${term.definition}`}
          </p>
        </div>
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
