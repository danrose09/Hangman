import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryWord from "../components/category-components/CategoryWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import CategorySpaces from "../components/category-components/CategorySpaces";
import { Store } from "../react-store/store";
import AddWord from "../components/category-components/AddWord";
import DeleteWord from "../components/category-components/DeleteWord";

const CategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, category, gameHasStarted } = state;
  const [isStarted, setIsStarted] = useState(false);
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
    setIsStarted(true);
  };

  const categoryName = category.name;
  const categoryWords = category.words;
  const allCategoryWords = String(categoryWords).split("");

  return (
    <div className="category-screen">
      {!isStarted ? (
        <div>
          <h1>{categoryName}</h1>
          <AddWord />
          <DeleteWord />
          <button className="grid-button-start" onClick={handleClick}>
            Play
          </button>
          <p>{allCategoryWords}</p>
        </div>
      ) : (
        <div>
          <h1>Hangman</h1>
          <CategoryWord />
          <CategorySpaces />
          {gameHasStarted && <LetterBank />}
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
