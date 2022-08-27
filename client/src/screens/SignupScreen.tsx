import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../react-store/store";

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { dispatch } = useContext(Store);

  const [userState, setUserState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
    passMatch: true,
  });

  const { name, username, email, password, confirmedPassword, passMatch } =
    userState;

  const handleChange = (e: any) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setUserState({
        ...userState,
        passMatch: false,
      });
    } else {
      setUserState({
        ...userState,
        passMatch: true,
      });
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            name: name,
            username: username,
            email: email,
            password: password,
          }
        );
        dispatch({ type: "SIGN_IN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(redirect || "/");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="signin-form">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <label style={{ color: "#ff7eee" }}>Name: </label>
        <input
          name="name"
          required
          type="text"
          className="input-box"
          onChange={handleChange}
        ></input>
        <label style={{ color: "#ff7eee" }}>Username: </label>
        <input
          name="username"
          required
          type="text"
          className="input-box"
          onChange={handleChange}
        ></input>
        <label style={{ color: "#ff7eee" }}>Email: </label>
        <input
          name="email"
          required
          type="email"
          className="input-box"
          onChange={handleChange}
        ></input>
        <label style={{ color: "#ff7eee" }}>Password: </label>
        <input
          name="password"
          required
          type="password"
          className="input-box"
          onChange={handleChange}
        ></input>
        <label style={{ color: "#ff7eee" }}>Confirm Password: </label>
        <input
          name="confirmedPassword"
          required
          type="password"
          className="input-box"
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="grid-button-start"
          style={{ width: "100%", margin: "1rem 0" }}
        >
          Sign Up
        </button>
      </form>

      {!passMatch ? (
        <p style={{ color: "red" }}>
          Confirmed password does not match password!
        </p>
      ) : null}
    </div>
  );
};

export default SignupScreen;
