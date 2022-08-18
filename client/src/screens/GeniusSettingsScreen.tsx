import React from "react";
import { Link } from "react-router-dom";
import DifficultySettings from "../components/play random components/DifficultySettings";

const GeniusSettingsScreen = () => {
  return (
    <div>
      GeniusSettingsScreen
      <DifficultySettings />
      <Link to="/playrandom/genius">
        <button className="grid-button-start">Play</button>
      </Link>
    </div>
  );
};

export default GeniusSettingsScreen;
