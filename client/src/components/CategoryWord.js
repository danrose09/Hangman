import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const CategoryWord = () => {
  const params = useParams();
  const { name } = params;
  const { state, dispatch } = useContext(Store);
  const { categoryWord } = state;
  console.log(`The word is: ${categoryWord}`);

  const fetchCategoryWord = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/categories/${name}`
    );
    const categoryWords = data.words;
    const newCategoryWord =
      categoryWords[Math.floor(Math.random() * categoryWords.length)];
    dispatch({ type: "NEW_CATEGORY_WORD", payload: newCategoryWord });
  };

  return (
    <div>
      RandomWord: {categoryWord}
      <button onClick={fetchCategoryWord}>Start</button>
    </div>
  );
};

export default CategoryWord;
