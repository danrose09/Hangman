import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Store } from "../react-store/store";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { dispatch, state } = useContext(Store);
  const { message } = state;
  const [messageIsHidden, setMessageIsHidden] = useState(false);
  const [userState, setUserState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userState;

  const handleChange = (e: any) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setMessageIsHidden(false);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username: username,
          password: password,
        }
      );

      dispatch({ type: "SIGN_IN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_MESSAGE", payload: "Login unsuccessful" });
    }
  };
  const toggleHidden = (e: any) => {
    setMessageIsHidden(true);
  };

  return (
    <div>
      {message === "Login unsuccessful" && (
        <div hidden={messageIsHidden} className="alert">
          <span onClick={toggleHidden} className="closebtn">
            &times;
          </span>
          {message}
        </div>
      )}
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <label>Username: </label>
        <input
          name="username"
          type="text"
          placeholder="name..."
          className="input-box"
          onChange={handleChange}
        ></input>
        <label>Password: </label>
        <input
          name="password"
          type="password"
          placeholder="password..."
          className="input-box"
          onChange={handleChange}
        ></input>
        <button className="grid-button-start" type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
