import { useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, categories } = state;

  useEffect(() => {
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

  const allCategories = categories.map((category: any, index: number) => {
    return (
      <div key={index}>
        <Link className="button-link" to={`/categories/${category.name}`}>
          <button className="grid-button">{category.name}</button>
        </Link>
      </div>
    );
  });
  return (
    <div>
      <h1>Categories</h1>
      {allCategories}
    </div>
  );
};

export default CategoriesScreen;
