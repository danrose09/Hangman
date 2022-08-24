import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryWord from "../components/category-components/CategoryWord";
import LetterBank from "../components/category&play-random-components/LetterBank";
import CategorySpaces from "../components/category-components/CategorySpaces";
import DifficultySettings from "../components/play random components/DifficultySettings";
import { Store } from "../react-store/store";
import AddWord from "../components/category-components/AddWord";
import DeleteWord from "../components/category-components/DeleteWord";
import Attempts from "../components/category&play-random-components/Attempts";
import UserLose from "../components/category&play-random-components/UserLose";

const CategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, category, gameHasStarted, message, hasLost } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const params = useParams();
  const { name } = params;

  useEffect(() => {
    dispatch({ type: "REFRESH" });
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
    dispatch({ type: "SET_MESSAGE", payload: "" });
  }, [name, dispatch, userInfo.username]);

  const handleClick = () => {
    if (category.words.length >= 1) {
      setIsStarted(true);
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Category must contain at least one word in order to play",
      });
    }
  };

  const deleteCategory = async () => {
    setMessageIsHidden(false);
    try {
      await axios.put("http://localhost:5000/api/delete-category", {
        username: userInfo.username,
        category: category.name,
      });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Category successfully deleted",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHidden = (e: any) => {
    setMessageIsHidden(true);
  };

  const categoryName = category.name;
  const categoryWords = category.words;
  const allCategoryWords = String(categoryWords).split("");

  return (
    <div className="category-screen">
      {message ===
        "Category must contain at least one word in order to play" && (
        <div hidden={messageIsHidden} className="alert">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      {message === "Category successfully deleted" && (
        <div hidden={messageIsHidden} className="success">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      {!gameHasStarted && !isStarted && <DifficultySettings />}
      {!isStarted ? (
        <div>
          <h1>{categoryName}</h1>
          <AddWord />
          <DeleteWord />
          <button className="grid-button-start" onClick={handleClick}>
            Play
          </button>
          <button className="grid-button" onClick={deleteCategory}>
            Delete Category
          </button>
          <p>{allCategoryWords}</p>
        </div>
      ) : !hasLost ? (
        <div>
          <h1>Hangman</h1>
          <Attempts />
          <CategoryWord />
          <CategorySpaces />
          {gameHasStarted && <LetterBank />}
        </div>
      ) : (
        <UserLose />
      )}
    </div>
  );
};

export default CategoryScreen;
