import { useEffect, useReducer, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryWord from "../components/CategoryWord";
import LetterBank from "../components/LetterBank";
import GuessedLetters from "../components/GuessedLetters";
import CategorySpaces from "../components/CategorySpaces";
import { Store } from "../store";
import Refresh from "../components/Refresh";
import AddWord from "../components/AddWord";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, category: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const CategoryScreen = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const params = useParams();
  const { name } = params;

  const [{ loading, error, category }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/categories/${name}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchCategory();
  }, [name]);

  const handleClick = () => {
    setGameHasStarted(true);
  };

  const categoryName = category.name;
  const categoryWords = category.words;
  const allCategoryWords = String(categoryWords).split("");

  return (
    <div>
      {!gameHasStarted ? (
        <div>
          {categoryName}
          <p>{allCategoryWords}</p>
          <AddWord />
          <button onClick={handleClick}>Start</button>
        </div>
      ) : (
        <div>
          <CategoryWord />
          <CategorySpaces />
          <LetterBank />
          <GuessedLetters />
          <Refresh />
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
