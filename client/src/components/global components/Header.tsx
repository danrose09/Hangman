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
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/playrandom">Quick Play</Link>
        </li>
      </ul>

      <div className="navbar">
        <label className="toggle-label" htmlFor="toggle">
          <i className="fa-solid fa-bars">
            <span style={{ marginLeft: "10px" }}>Menu</span>
          </i>
        </label>
      </div>
    </div>
  );
};

export default Header;
