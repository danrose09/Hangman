import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";

const AccountScreen = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo, myDictionary } = state;
  const { username, email, createdAt } = userInfo;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  let recentlyAdded = myDictionary[myDictionary.length - 1];

  return (
    <div>
      <div className="account-user-info-container">
        <h1>My Account</h1>
        <button className="grid-button-start">Edit</button>
        <button className="grid-button">Delete Account</button>
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
