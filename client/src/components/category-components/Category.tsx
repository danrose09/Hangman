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

      <div>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <div className="game-mode-card">
            <img className="card-image" src={`/images/${category.name}.jpg`} />
            <div className="game-mode-container">
              <div className="category-title-and-buttons">
                <div>
                  <h2
                    className="game-mode-card-title-categories"
                    style={{ color: "#ff7eee" }}
                  >
                    <b>{category.name}</b>
                  </h2>
                </div>
                <div style={{ width: "100%" }}>
                  <FontAwesomeIcon className="category-buttons" icon={faPlay} />
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
              <p className="game-mode-card-description">
                Play hangman using words from several existing categories, or
                create your own category.
              </p>
            </div>
          </div>
        </Link>
        <h1>{category.name}</h1>
        <AddWord />
        <DeleteWord />
        <button className="grid-button-start">Play</button>
        <button className="grid-button" onClick={deleteCategory}>
          Delete Category
        </button>
        <p>{allCategoryWords}</p>
      </div>
    </div>
  );
};

export default Category;
