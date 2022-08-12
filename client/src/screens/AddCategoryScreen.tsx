import { useContext, useState } from "react";
import axios from "axios";
import { Store } from "../react-store/store";

const AddCategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, message } = state;

  const [categoryName, setCategoryName] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    const createCategory = async () => {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/add-category",
          {
            username: userInfo.username,
            categoryName,
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryName.length >= 1) {
      createCategory();
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload:
          "Category name must contain at least one number, letter or symbol.",
      });
    }
  };

  const handleCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  return (
    <div>
      <h1>Create Category</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={categoryName}
          onChange={handleCategoryName}
          placeholder="category..."
        ></input>
        <button className="grid-button-start" type="submit">
          Submit
        </button>
      </form>
      <p style={{ color: "red" }}>
        {message ===
        "Category name must contain at least one number, letter or symbol."
          ? message
          : null}
      </p>
    </div>
  );
};

export default AddCategoryScreen;
