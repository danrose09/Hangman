import { useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";
import Category from "../components/category-components/Category";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, categories } = state;

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

  const allCategories = categories.map((category: any, index: number) => {
    return (
      <Fragment key={index}>
        <Category category={category} />
      </Fragment>
    );
  });

  return (
    <div>
      <h1>Categories</h1>
      <div className="game-mode-cards-container">{allCategories}</div>
      <button className="grid-button-start" onClick={clickHandler}>
        Create Category
      </button>
    </div>
  );
};

export default CategoriesScreen;
