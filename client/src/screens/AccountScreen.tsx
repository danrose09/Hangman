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
      <h1>My Account</h1>
      <div>
        <h3>Account Details</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Account Since: {createdAt}</p>
        <button className="grid-button">Edit</button>
      </div>
      <div>
        <h3>Dictionary</h3>
        <p>Number of words: {myDictionary.length}</p>
        <div className="recently-added">
          <h2>Recently Added</h2>
          {myDictionary.length >= 1 ? (
            <div>
              <p>{recentlyAdded.word}</p>
              <p>{recentlyAdded.origin}</p>
              <p>{recentlyAdded.partOfSpeech}</p>
              <p>{recentlyAdded.definition}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;
