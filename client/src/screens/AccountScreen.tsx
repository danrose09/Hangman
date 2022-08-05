import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";

const AccountScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, myDictionary, activeSince } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const fetchAccountData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/account/${userInfo.username}`
      );
      dispatch({ type: "FETCH_MY_DICTIONARY", payload: data.myDictionary });
      dispatch({ type: "FETCH_CREATED_AT", payload: data.activeSince });
      console.log(data);
    };

    fetchAccountData();
  }, [userInfo, navigate, dispatch]);

  let recentlyAdded = myDictionary[myDictionary.length - 1];
  console.log(recentlyAdded);
  const activeFrom = activeSince.split("-");

  return (
    <div>
      <h1>My Account</h1>
      <div>
        <h3>Account Details</h3>
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        <p>Active Since: {activeFrom}</p>
        <button className="grid-button">Edit</button>
      </div>
      <div>
        <h3>Dictionary</h3>
        <p>Number of words: {myDictionary.length}</p>
        <h2>Recently Added</h2>
        <p>{recentlyAdded.word}</p>
        <p>{recentlyAdded.origin}</p>
        <p>{recentlyAdded.partOfSpeech}</p>
        <p>{recentlyAdded.definition}</p>
      </div>
    </div>
  );
};

export default AccountScreen;
