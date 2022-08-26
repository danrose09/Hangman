import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../react-store/store";

const Homescreen = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo, message } = state;

  const imageLocation = "/images/hangmanClassic.jpg";

  return (
    <div className="homescreen-container">
      {message === "Account successfully deleted." && (
        <p className="message-success">{message}</p>
      )}
      <h1 className="title">HANGMAN</h1>
      <h3 className="homescreen-subtitle">The Dictionary App</h3>

      <img
        className="homescreen-image"
        alt="A hangman drawing"
        src={imageLocation}
        height={300}
        width={300}
        style={{ color: "#23232e" }}
      ></img>
      {!userInfo && (
        <div className="homescreen-buttons">
          <Link className="button-link" to="/login">
            <button className="grid-button-start">Sign In</button>
          </Link>
        </div>
      )}
      <div>
        <button
          className="grid-button-start"
          onClick={() => navigate("/playrandom/game-mode")}
        >
          Play
        </button>
        <button
          className="grid-button"
          onClick={() => navigate(`/mydictionary/${userInfo.username}`)}
        >
          My Dictionary
        </button>
      </div>
    </div>
  );
};

export default Homescreen;
