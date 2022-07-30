import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [state, setState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
    passMatch: true,
  });

  const { name, username, email, password, confirmedPassword, passMatch } =
    state;

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setState({
        ...state,
        passMatch: false,
      });
    } else {
      setState({
        ...state,
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

        navigate(redirect || "/");
      } catch (error) {
        alert(error);
      }
    }
  };

  console.log(state);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Name: </label>
        <input name="name" required type="text" onChange={handleChange}></input>
        <label>Username: </label>
        <input
          name="username"
          required
          type="text"
          onChange={handleChange}
        ></input>
        <label>Email: </label>
        <input
          name="email"
          required
          type="email"
          onChange={handleChange}
        ></input>
        <label>Password: </label>
        <input
          name="password"
          required
          type="password"
          onChange={handleChange}
        ></input>
        <label>Confirm Password: </label>
        <input
          name="confirmedPassword"
          required
          type="password"
          onChange={handleChange}
        ></input>
        <button type="submit">Sign Up</button>
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
