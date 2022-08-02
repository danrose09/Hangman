import { useEffect, useState, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryWord from "../components/CategoryWord";
import LetterBank from "../components/LetterBank";
import GuessedLetters from "../components/GuessedLetters";
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
  // const displayCategoryWords = categoryWords.map((word: string) => {
  //   return (
  //     <Fragment>
  //       <p>{word}</p>
  //     </Fragment>
  //   );
  // });
  return (
    <div>
      {!gameHasStarted ? (
        <div>
          <h1>{categoryName}</h1>
          <AddWord />
          <DeleteWord />
          <button onClick={handleClick}>Start</button>
          <p>{allCategoryWords}</p>
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
