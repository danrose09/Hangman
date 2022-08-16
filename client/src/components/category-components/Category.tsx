import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../react-store/store";
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

  const allCategoryWords = String(category.words).split("");

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
