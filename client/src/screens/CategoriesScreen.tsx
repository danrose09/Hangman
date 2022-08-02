import { useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, categories } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/categories/${userInfo.username}`
        );

        dispatch({ type: "FETCH_CATEGORIES", payload: data });
      } catch (error: any) {
        alert(error);
      }
    };
    fetchCategories();
  }, [dispatch, userInfo.username]);

  const allCategories = categories.map((category: any, index: number) => {
    return (
      <button key={index}>
        <Link className="button-link" to={`/categories/${category.name}`}>
          {category.name}
        </Link>
      </button>
    );
  });
  return (
    <div>
      CategoriesScreen
      {allCategories}
    </div>
  );
};

export default CategoriesScreen;
