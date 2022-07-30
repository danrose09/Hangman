import React, { useState } from "react";

const LoginScreen = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  console.log(state);

  return (
    <div>
      <form>
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
          type="text"
          placeholder="password..."
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};

export default LoginScreen;
