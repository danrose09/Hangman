import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";
import axios from "axios";

const AccountScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo, myDictionary, winsAndLosses } = state;
  const { username, email, createdAt } = userInfo;
  const { wins, losses } = winsAndLosses;

  const totalGames = wins + losses;
  console.log(winsAndLosses);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const fetchWinsAndLosses = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/statistics/wins-losses/${userInfo.username}`,
          config
        );
        dispatch({ type: "FETCH_WINS_LOSSES", payload: data });
      } catch (error: any) {
        console.log(error);
      }
    };

    const authorizeAndFetch = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/mydictionary/${userInfo.username}`,
          config
        );
        dispatch({ type: "FETCH_MY_DICTIONARY", payload: data });
      } catch (error: any) {
        console.log(error);
      }
    };
    if (userInfo) {
      authorizeAndFetch();
      fetchWinsAndLosses();
    }
  }, [userInfo, navigate, dispatch]);

  let recentlyAdded = myDictionary[myDictionary.length - 1];

  const deleteAccount = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/delete-account", {
        username: userInfo.username,
      });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Account successfully deleted.",
      });
      navigate("/");
      dispatch({ type: "SIGN_OUT" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="account-user-info-container">
        <h1>My Account</h1>
        <div>
          <p>Total Games: {wins + losses}</p>
          <p hidden={wins === 0 && true}>
            Win Percentage: {((wins / totalGames) * 100).toFixed(0)}%
          </p>
        </div>
        <button
          className="grid-button-start"
          onClick={() => navigate("/edit-account")}
        >
          Edit
        </button>
        <button className="grid-button" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>

      <div>
        <h3 className="account-subtitle">
          <u>Account Details</u>
        </h3>
        <div className="account-user-info-container">
          <p className="account-bold">Username: </p>
          <p>{username}</p>
        </div>
        <div className="account-user-info-container">
          <p className="account-bold">Email: </p>
          <p>{email}</p>
        </div>
        <div className="account-user-info-container">
          <p className="account-bold">Account Since: </p>
          <p>{createdAt.slice(0, 10)}</p>
        </div>
      </div>
      <div>
        <h3 className="account-subtitle">
          <u>Dictionary</u>
        </h3>
        <div className="account-user-info-container">
          <p className="account-bold">Number of Words: </p>
          <p>{myDictionary.length}</p>
        </div>
        <div className="recently-added">
          <h3 className="account-subtitle">
            <u>Recently Added</u>
          </h3>
          {myDictionary.length >= 1 ? (
            <div>
              <div className="account-user-info-container">
                <p className="account-bold">Word: </p>
                <p>{recentlyAdded.word}</p>
              </div>
              <div className="account-user-info-container">
                <p className="account-bold">Part of Speech: </p>
                <p>{recentlyAdded.partOfSpeech}</p>
              </div>
              <div className="account-user-info-container">
                <p className="account-bold">Origin: </p>
                <p>{recentlyAdded.origin}</p>
              </div>
              <div className="account-user-info-container">
                <p className="account-bold">Definition: </p>
                <p>{recentlyAdded.definition}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;
