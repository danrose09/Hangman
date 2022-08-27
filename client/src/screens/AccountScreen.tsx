import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <h1>
          My Account{" "}
          <span className="account-icons-sm">
            <FontAwesomeIcon
              style={{ color: "#ff7eee", marginLeft: "10px" }}
              height={22}
              width={22}
              icon={faPencil}
              onClick={() => navigate("/edit-account")}
            />
            <FontAwesomeIcon
              style={{ color: "#ff7eee", marginLeft: "10px" }}
              height={19}
              width={19}
              icon={faTrash}
              onClick={deleteAccount}
            />
          </span>
        </h1>

        <button
          className="grid-button-start account-button-lg"
          onClick={() => navigate("/edit-account")}
        >
          Edit
        </button>
        <button
          className="grid-button account-button-lg"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </div>

      {/*//////////////////////////////////////////////////////// */}
      <div className="account-grid-row-1">
        {/*//////////////////////////////////////////////////////// */}
        <div>
          <h3 className="account-subtitle">
            <u>Account Details</u>
          </h3>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Account Since:</strong> {createdAt.slice(0, 10)}
          </p>
        </div>
        {/*//////////////////////////////////////////////////////// */}
        <div>
          <h3 className="account-subtitle">
            <u>Dictionary</u>
          </h3>
          <p>
            <strong>Number of Words:</strong> {myDictionary.length}
          </p>
        </div>
        {/*//////////////////////////////////////////////////////// */}
        <div>
          <h3 className="account-subtitle">
            <u>Stats</u>
          </h3>
          <div>
            <p>
              <strong>Wins:</strong> {wins}
            </p>
            <p>
              <strong>Losses:</strong> {losses}
            </p>
            <p>
              <strong>Total Games:</strong> {wins + losses}
            </p>
            <p hidden={wins === 0 && true}>
              <strong>Win Percentage:</strong>{" "}
              {((wins / totalGames) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
      {/*//////////////////////////////////////////////////////// */}
      <div className="recently-added">
        <h3 className="account-subtitle">
          <u>Most Recently Added</u>
        </h3>
        {myDictionary.length >= 1 ? (
          <div>
            <p>
              <strong>Word:</strong> {recentlyAdded.word}
            </p>
            <p>
              <strong>Part of Speech:</strong> {recentlyAdded.partOfSpeech}
            </p>
            <p>
              <strong>Origin:</strong> {recentlyAdded.origin}
            </p>
            <p>
              <strong>Definition:</strong> {recentlyAdded.definition}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AccountScreen;
