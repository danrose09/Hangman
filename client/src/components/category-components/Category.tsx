import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../../react-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Category = (props: any) => {
  const { category } = props;
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  const deleteCategory = async () => {
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

  // const allCategoryWords =
  //   category.name === "animals"
  //     ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
  //     : category.name === "countries"
  //     ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
  //     : category.name === "fruits"
  //     ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
  //     : category.name === "sports"
  //     ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
  //     : category.name === "capitals"
  //     ? String(category.words).replaceAll(",", " ").toLowerCase().split("")
  //     : String(category.words).replaceAll(",", " ").split("");

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
      <div className="category-card">
        <div className="game-mode-card">
          {/* <img className="card-image" src={`/images/${category.name}.jpg`} /> */}
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
                  <FontAwesomeIcon className="category-buttons" icon={faPlay} />
                </Link>
                <Link to={`/all-words/${category.name}`}>
                  <FontAwesomeIcon className="category-buttons" icon={faEye} />
                </Link>
                <Link to={`/update-category/${category.name}`}>
                  <FontAwesomeIcon
                    className="category-buttons"
                    icon={faPencil}
                  />
                </Link>
                <FontAwesomeIcon
                  className="category-buttons"
                  onClick={deleteCategory}
                  icon={faTrash}
                />
              </div>
            </div>
            <p className="game-mode-card-description category-description">
              {randomCategoryWords(category.words, 5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
