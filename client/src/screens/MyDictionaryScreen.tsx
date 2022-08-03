import { Fragment, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const MyDictionaryScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { myDictionary, userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchMyDictionary = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/mydictionary/${userInfo.username}`
        );

        dispatch({ type: "FETCH_MY_DICTIONARY", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchMyDictionary();
  }, [dispatch, userInfo.username]);

  const allDefinitions = myDictionary.map((term: any, index: number) => {
    const deleteFromDictionary = async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/delete/${userInfo.username}/${term.word}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div key={index}>
        <div className="dictionary-grid">
          <div className="grid-item grid-item-1">
            <h2 className="dictionary-word">{`${index + 1}: ${term.word}`}</h2>

            <button
              onClick={() =>
                navigate(`/update/${userInfo.username}/${term.word}`)
              }
              className="grid-button"
            >
              Update
            </button>

            <button className="grid-button" onClick={deleteFromDictionary}>
              Delete
            </button>
            <a
              href={`https://www.merriam-webster.com/dictionary/${term.word}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="grid-button">Look Up</button>
            </a>
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
          alt="line break"
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
      {myDictionary.length === 0 ? (
        <h3>Your Dictionary is Empty</h3>
      ) : (
        <div>{allDefinitions}</div>
      )}
    </Fragment>
  );
};

export default MyDictionaryScreen;
