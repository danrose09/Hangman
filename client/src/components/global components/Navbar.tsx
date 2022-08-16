import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../react-store/store";

const Header = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  const handleSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div className="header">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item logo">
            <Link className="nav-link" to="/">
              <FontAwesomeIcon
                className="logo-icon fa-2x"
                icon={faBookOpenReader}
              />
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
            <Link className="nav-link" to={userInfo ? `/account` : "/login"}>
              <i className="fa-solid fa-user"></i>
              <span className="link-text">
                {userInfo ? userInfo.username : "Login"}
              </span>
            </Link>
          </li>
          {userInfo ? (
            <li className="nav-item">
              <Link onClick={handleSignOut} className="nav-link" to="/">
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
