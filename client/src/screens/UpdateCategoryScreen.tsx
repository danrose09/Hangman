import React from "react";
import { useParams } from "react-router-dom";
import AddWord from "../components/category-components/AddWord";
import DeleteWord from "../components/category-components/DeleteWord";
const UpdateCategoryScreen = () => {
  const params = useParams();
  const { categoryname } = params;
  return (
    <div>
      <h1>{categoryname}</h1>
      <AddWord categoryname={categoryname} />
      <DeleteWord categoryname={categoryname} />
    </div>
  );
};

export default UpdateCategoryScreen;
