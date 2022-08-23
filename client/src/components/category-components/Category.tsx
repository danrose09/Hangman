import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faEye,
  faEyeLowVision,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddWord from "./AddWord";
import DeleteWord from "./DeleteWord";

const Category = (props: any) => {
  const { category } = props;
  const { dispatch, state } = useContext(Store);
  const { message, userInfo, gameHasStarted, hasLost } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);

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

  const allCategoryWords =
    category.name === "animals"
      ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
      : category.name === "countries"
      ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
      : category.name === "fruits"
      ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
      : category.name === "sports"
      ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
      : category.name === "capitals"
      ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
      : String(category.words).replaceAll(",", " ").split("");

  const randomCategoryWords = (
    sourceArray: string[],
    neededElements: number
  ) => {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
      result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
    }
    return result.map((word) => {
      return (
        <p>
          {category.name === "animals" || category.name === "sports"
            ? word.toLowerCase()
            : word}
        </p>
      );
    });
  };

  return (
    <div className="category-container">
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

      <div className="category-card">
        <Link
          to={`/play-category/${category.name}`}
          style={{ textDecoration: "none" }}
        >
          <div className="game-mode-card">
            <img className="card-image" src={`/images/${category.name}.jpg`} />
            <div className="game-mode-container">
              <div className="category-title-and-buttons">
                <div>
                  <h2
                    className="game-mode-card-title-categories"
                    style={{ color: "#ff7eee", letterSpacing: "0.2ch" }}
                  >
                    <b>{category.name.toUpperCase()}</b>
                  </h2>
                </div>
                <div className="card-icons">
                  <Link to={`/play-category/${category.name}`}>
                    <FontAwesomeIcon
                      className="category-buttons"
                      icon={faPlay}
                    />
                  </Link>
                  <FontAwesomeIcon className="category-buttons" icon={faEye} />
                  <FontAwesomeIcon
                    className="category-buttons"
                    icon={faPencil}
                  />
                  <FontAwesomeIcon
                    className="category-buttons"
                    icon={faTrash}
                  />
                </div>
              </div>
              <p className="game-mode-card-description category-description">
                {randomCategoryWords(category.words, 5)}
              </p>
            </div>
          </div>
        </Link>

        {/* <AddWord />
        <DeleteWord />
        <button className="grid-button-start">Play</button>
        <button className="grid-button" onClick={deleteCategory}>
          Delete Category
        </button>
        <p>{allCategoryWords}</p> */}
      </div>
    </div>
  );
};

export default Category;
