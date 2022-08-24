import { useEffect, useContext, useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";
import Category from "../components/category-components/Category";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, categories, message } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);

  useEffect(() => {
    dispatch({ type: "REFRESH" });
    if (!userInfo) {
      navigate("/login");
    }
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/categories/${userInfo.username}`
        );

        dispatch({ type: "FETCH_CATEGORIES", payload: data });
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [dispatch, navigate, userInfo]);

  const clickHandler = () => {
    navigate("/add-category");
  };

  const toggleHidden = (e: any) => {
    setMessageIsHidden(true);
  };

  const allCategories = categories.map((category: any, index: number) => {
    return (
      <Fragment key={index}>
        <Category category={category} />
      </Fragment>
    );
  });

  return (
    <div>
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

      <h1>Categories</h1>
      <div className="game-mode-cards-container">{allCategories}</div>
      <div style={{ textAlign: "center" }}>
        <button
          className="grid-button"
          style={{ width: "50%" }}
          onClick={clickHandler}
        >
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CategoriesScreen;
