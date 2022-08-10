import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryWord from "../components/CategoryWord";
import LetterBank from "../components/LetterBank";
import CategorySpaces from "../components/CategorySpaces";
import { Store } from "../store";
import Refresh from "../components/Refresh";
import AddWord from "../components/AddWord";
import DeleteWord from "../components/DeleteWord";

const CategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, category } = state;
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const params = useParams();
  const { name } = params;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/category/${userInfo.username}/${name}`
        );
        dispatch({ type: "FETCH_CATEGORY", payload: data });
      } catch (error: any) {
        alert(error);
      }
    };
    fetchCategory();
  }, [name, dispatch, userInfo.username]);

  const handleClick = () => {
    setGameHasStarted(true);
  };

  const categoryName = category.name;
  const categoryWords = category.words;
  const allCategoryWords = String(categoryWords).split("");

  return (
    <div className="category-screen">
      {!gameHasStarted ? (
        <div>
          <h1>{categoryName}</h1>
          <AddWord />
          <DeleteWord />
          <button className="grid-button" onClick={handleClick}>
            Start
          </button>
          <p>{allCategoryWords}</p>
        </div>
      ) : (
        <div>
          <h1>Hangman</h1>
          <CategoryWord />
          <CategorySpaces />
          <LetterBank />
          <Refresh />
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
