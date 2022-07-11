import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo nav-item">
            <Link className="nav-link" to="/">
              {/* <img
                className="logo-png"
                src="./images/hangman.png"
                height={50}
                width={50}
              ></img> */}
              <i className="fa-brands fa-drupal"></i>
              <span className="link-text logo-text">HANGMAN</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fa-solid fa-house"></i>
              <span className="link-text">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/playrandom">
              <i className="fa-solid fa-play"></i>
              <span className="link-text">Quick Play</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              <i className="fa-solid fa-folder-open"></i>
              <span className="link-text">Categories</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mydictionary">
              <i className="fa-solid fa-book"></i>
              <span className="link-text">My Dictionary</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fa-solid fa-user"></i>
              <span className="link-text">Login</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
