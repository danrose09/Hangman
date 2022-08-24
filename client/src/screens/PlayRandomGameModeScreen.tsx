import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Store } from "../react-store/store";

const PlayRandomGameModeScreen = () => {
  const { dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, [dispatch]);

  return (
    <div>
      <h1>Game Mode</h1>
      <div className="game-mode-cards-container">
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
          <div className="game-mode-card">
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
                These words will push your lexicon to the next level.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <div className="game-mode-card">
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
                Play hangman using words from several existing categories, or
                create your own category.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlayRandomGameModeScreen;
