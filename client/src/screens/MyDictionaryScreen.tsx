import { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, myDictionary: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const MyDictionaryScreen = () => {
  const [{ loading, error, myDictionary }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    myDictionary: [],
  });

  console.log(myDictionary[0]);

  useEffect(() => {
    const fetchMyDictionary = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/mydictionary`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
      fetchMyDictionary();
    };
  }, []);

  return <div>MyDictionaryScreen</div>;
};

export default MyDictionaryScreen;
