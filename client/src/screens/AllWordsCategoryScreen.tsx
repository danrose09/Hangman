import { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Store } from "../react-store/store";
import AllCategoryWords from "../components/category-components/AllCategoryWords";

const AllWordsCategoryScreen = () => {
  const params = useParams();
  const { categoryname } = params;
  const { dispatch, state } = useContext(Store);
  const { category, userInfo } = state;

  console.log(category);
  useEffect(() => {
    dispatch({ type: "REFRESH" });
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/category/${userInfo.username}/${categoryname}`
        );
        dispatch({ type: "FETCH_CATEGORY", payload: data });
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error: any) {
        alert(error);
      }
    };
    fetchCategory();
  }, [categoryname, dispatch, userInfo.username]);

  return (
    <div>{category ? <AllCategoryWords category={category} /> : null}</div>
  );
};

export default AllWordsCategoryScreen;
