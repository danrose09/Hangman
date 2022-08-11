import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const CategoryWord = () => {
  const params = useParams();
  const { name } = params;
  const { state, dispatch } = useContext(Store);
  const { categoryWord, userInfo } = state;
  const [wordHidden, setWordHidden] = useState(true);

  const fetchCategoryWord = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/category/${userInfo.username}/${name}`
    );
    const categoryWords = data.words;
    const newCategoryWord =
      categoryWords[Math.floor(Math.random() * categoryWords.length)];
    dispatch({ type: "NEW_CATEGORY_WORD", payload: newCategoryWord });
    dispatch({ type: "START_STOP_GAME", payload: true });
  };

  const toggleHidden = () => {
    setWordHidden((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div>
      <div>
        <button onClick={toggleHidden} className="grid-button">
          Show Word
        </button>
        <button className="grid-button" onClick={fetchCategoryWord}>
          Start
        </button>
      </div>
      <div hidden={wordHidden}>
        <p className="category-hidden-word">{categoryWord}</p>
      </div>
    </div>
  );
};

export default CategoryWord;
