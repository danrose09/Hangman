import { useContext, useState } from "react";
import axios from "axios";
import { Store } from "../react-store/store";

const AddCategoryScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, message } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    setMessageIsHidden(false);
    const createCategory = async () => {
      try {
        await axios.put("http://localhost:5000/api/add-category", {
          username: userInfo.username,
          categoryName,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryName.length >= 1) {
      createCategory();
      setCategoryName("");
      dispatch({
        type: "SET_MESSAGE",
        payload: "Category successfully created",
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload:
          "Category name must contain at least one number, letter or symbol",
      });
    }
  };

  const handleCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  const toggleHidden = (e: any) => {
    setMessageIsHidden(true);
  };

  return (
    <div>
      {message === "Category successfully created" && (
        <div hidden={messageIsHidden} className="success">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      {message ===
        "Category name must contain at least one number, letter or symbol" && (
        <div hidden={messageIsHidden} className="alert">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      <h1>Create Category</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={categoryName}
          onChange={handleCategoryName}
          className="input-box"
          placeholder="category..."
        ></input>
        <button className="grid-button-start" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategoryScreen;
