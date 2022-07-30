import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../store";

const Header = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  const handleSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  console.log(userInfo);

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
            <Link
              className="nav-link"
              to={userInfo ? `/mydictionary/${userInfo.username}` : "/login"}
            >
              <i className="fa-solid fa-book"></i>
              <span className="link-text">My Dictionary</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={userInfo ? "/account" : "/login"}>
              <i className="fa-solid fa-user"></i>
              <span className="link-text">
                {userInfo ? userInfo.username : "Login"}
              </span>
            </Link>
          </li>
          {userInfo ? (
            <li className="nav-item">
              <Link
                onClick={handleSignOut}
                className="nav-link"
                to={userInfo ? "/account" : "/login"}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="link-text">Logout</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
