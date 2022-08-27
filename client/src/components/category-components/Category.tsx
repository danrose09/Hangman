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

  const randomCategoryWords = (
    sourceArray: string[],
    neededElements: number
  ) => {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
      result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
    }
    return result.map((word) => {
      return <p>{word}</p>;
    });
  };

  return (
    <div className="category-container">
      <div className="category-card">
        <div className="game-mode-card">
          <div
            className="category-card-container"
            style={{ borderRadius: "4px" }}
          >
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
                    style={{ paddingLeft: "2px" }}
                    icon={faPlay}
                  />
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
              {category.words.length > 5
                ? randomCategoryWords(category.words, 5)
                : category.words.map((word: string) => {
                    return <p>{word}</p>;
                  })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
