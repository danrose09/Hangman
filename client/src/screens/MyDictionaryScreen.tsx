import { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, myDictionary: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

const MyDictionaryScreen = () => {
  const [{ loading, error, myDictionary }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    myDictionary: [],
  });

  console.log(myDictionary);

  useEffect(() => {
    const fetchMyDictionary = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/mydictionary"
        );
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchMyDictionary();
  }, []);

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
            <h2>{`${index + 1}: ${term.word}`}</h2>
            <button className="grid-button">
              <Link
                to={`/mydictionary/update/${term.word}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                Update
              </Link>
            </button>
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
