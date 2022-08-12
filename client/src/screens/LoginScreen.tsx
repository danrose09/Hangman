import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Store } from "../react-store/store";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { dispatch } = useContext(Store);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Login unsuccessful");
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <label>Username: </label>
        <input
          name="username"
          type="text"
          placeholder="name..."
          onChange={handleChange}
        ></input>
        <label>Password: </label>
        <input
          name="password"
          type="password"
          placeholder="password..."
          onChange={handleChange}
        ></input>
        <button className="grid-button" type="submit">
          Login
        </button>
      </form>
      {errorMessage.length > 1 ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : null}
      <p>
        Don't have an account? <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
