import { useContext, useState } from "react";
import { Store } from "../react-store/store";
import axios from "axios";

const EditUserAccountScreen = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, message } = state;
  const { username, email } = userInfo;
  const [userState, setUserState] = useState({
    newUsername: "",
    newEmail: "",
    password: "",
    confirmedPassword: "",
  });

  console.log(userInfo);
  console.log(message);

  const updateAccount = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/edit-account",
        {
          username: username,
          newUsername: userState.newUsername,
          newEmail: userState.newEmail,
          password: userState.password,
          confirmedPassword: userState.confirmedPassword,
        }
      );

      dispatch({
        type: "UPDATE_ACCOUNT",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserState({
        newUsername: "",
        newEmail: "",
        password: "",
        confirmedPassword: "",
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "SET_MESSAGE",
        payload: "Account was unsuccessfully updated.",
      });
    }
  };

  return (
    <div>
      <h1>Edit Account</h1>
      <form onSubmit={updateAccount}>
        <label>
          <b>Current Username: </b>
        </label>
        <input type="text" value={username} readOnly></input>
        <label>
          <b>New Username: </b>
        </label>
        <input
          type="text"
          value={userState.newUsername}
          onChange={(e: any) =>
            setUserState({ ...userState, newUsername: e.target.value })
          }
        ></input>
        <label>
          <b>Current Email: </b>
        </label>
        <input type="text" value={email} readOnly></input>
        <label>
          <b>New Email: </b>
        </label>
        <input
          type="text"
          value={userState.newEmail}
          onChange={(e: any) =>
            setUserState({ ...userState, newEmail: e.target.value })
          }
        ></input>
        <button type="submit" className="grid-button-start">
          Confirm Changes
        </button>
      </form>
      <p className="message-success">
        {message === "Account successfully updated." && message}
      </p>
      <h3>Confirm Password</h3>
    </div>
  );
};

export default EditUserAccountScreen;
