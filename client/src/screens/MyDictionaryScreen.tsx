import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const MyDictionaryScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { myDictionary, userInfo } = state;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const authorizeAndFetch = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/mydictionary/${userInfo.username}`,
          config
        );
        dispatch({ type: "FETCH_MY_DICTIONARY", payload: data });
      } catch (error: any) {}
    };
    if (userInfo) {
      authorizeAndFetch();
    }
  }, [navigate, userInfo, dispatch]);

  const allDefinitions = myDictionary
    .filter((term: any, index: number) => {
      if (searchTerm === "") {
        return term;
      } else if (term.word.toLowerCase().includes(searchTerm)) {
        return term;
      } else {
        return null;
      }
    })
    .map((term: any, index: number) => {
      const deleteFromDictionary = async () => {
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/delete/${userInfo.username}/${term.word}`
          );
          dispatch({ type: "REMOVE_FROM_DICTIONARY", payload: data });
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <div key={index}>
          <div className="dictionary-grid">
            <div className="grid-item grid-item-1">
              <h2 className="dictionary-word">{`${index + 1}. ${
                term.word
              }`}</h2>
              <Link to={`/mydictionary/term/${term.word}`}>
                <button className="grid-button-start">
                  <span>
                    <FontAwesomeIcon
                      className="dictionary-button-icon"
                      icon={faBookOpen}
                    />
                  </span>
                  Look Up
                </button>
              </Link>
              <button
                onClick={() =>
                  navigate(`/update/${userInfo.username}/${term.word}`)
                }
                className="grid-button"
              >
                <span>
                  <FontAwesomeIcon
                    className="dictionary-button-icon"
                    icon={faPencil}
                  />
                </span>
                Update
              </button>
              <button className="grid-button" onClick={deleteFromDictionary}>
                <span>
                  <FontAwesomeIcon
                    className="dictionary-button-icon"
                    icon={faTrashCan}
                  />
                </span>
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
        </div>
      );
    });

  return (
    <div className="mydictionary-screen">
      <div className="dictionary-title-and-search">
        <h1>My Dictionary</h1>
        <span>
          <FontAwesomeIcon
            className="magnifying-glass"
            icon={faMagnifyingGlass}
          />
        </span>
        <input
          className="search-box"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        ></input>
      </div>
      {myDictionary.length === 0 ? (
        <h3>Your Dictionary is Empty</h3>
      ) : (
        <div>{allDefinitions}</div>
      )}
    </div>
  );
};

export default MyDictionaryScreen;
