import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../react-store/store";

const Homescreen = () => {
  const { state } = useContext(Store);
  const { userInfo, message } = state;

  const imageLocation = "/images/hangman.png";

  return (
    <div className="homescreen-container">
      {message === "Account successfully deleted." && (
        <p className="message-success">{message}</p>
      )}
      <h1 className="title">HANGMAN</h1>
      <h3 className="homescreen-subtitle">The Game and Dictionary App</h3>

      {/* <img
        className="homescreen-image"
        alt="A hangman drawing"
        src={imageLocation}
        height={200}
        width={200}
        style={{ color: "#23232e" }}
      ></img> */}
      {!userInfo && (
        <div className="homescreen-buttons">
          <Link className="button-link" to="/login">
            <button className="grid-button-start">Sign In</button>
          </Link>
        </div>
      )}

      <div className="game-mode-cards-container" style={{ textAlign: "left" }}>
        <Link to="/playrandom/common" style={{ textDecoration: "none" }}>
          <div className="game-mode-card">
            <img
              className="card-image"
              src="/images/hangmanClassic.jpg"
              alt="classic"
            />
            <div className="game-mode-container">
              <h2 className="game-mode-card-title">
                <b>Classic</b>
              </h2>
              <p className="game-mode-card-description">
                Over 1,000 everyday words to test your skills while providing a
                classic hangman experience.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/playrandom/genius" style={{ textDecoration: "none" }}>
          <div
            className="game-mode-card"
            style={{ backgroundColor: "#3fa796" }}
          >
            <img
              className="card-image"
              src="/images/hangmanClassic.jpg"
              alt="genius"
            />
            <div className="game-mode-container">
              <h2 className="game-mode-card-title-genius">
                <b>Genius</b>
              </h2>
              <p className="game-mode-card-description">
                A truly random experience chock full of scientific and obscure
                vocabulary.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <div
            className="game-mode-card"
            style={{ backgroundColor: "#2666cf" }}
          >
            <img
              className="card-image"
              src="/images/hangmanClassic.jpg"
              alt="categories"
            />
            <div className="game-mode-container">
              <h2 className="game-mode-card-title-categories">
                <b>Categories</b>
              </h2>
              <p className="game-mode-card-description">
                Play from one of six existing categories or create your own
                category.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Homescreen;
