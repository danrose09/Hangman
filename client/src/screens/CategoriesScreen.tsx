import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, categories: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const CategoriesScreen = () => {
  const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    categories: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/categories"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };
    fetchCategories();
  }, []);

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
