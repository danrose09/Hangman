import React from "react";
import { Link } from "react-router-dom";
import "../../css/header.css";

const Header = () => {
  return (
    <div>
      <input type="checkbox" id="toggle" name="toggle" />

      <ul className="navigation-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#">Categories</a>
        </li>
        <li>
          <a href="#">Quick Play</a>
        </li>
      </ul>

      <div className="navbar">
        <label htmlFor="toggle">
          <i className="fa-solid fa-bars">Menu</i>
        </label>
      </div>
    </div>
  );
};

export default Header;
