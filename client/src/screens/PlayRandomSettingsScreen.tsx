import React from "react";
import { Link } from "react-router-dom";

const PlayRandomSettingsScreen = () => {
  return (
    <div>
      <h1>Settings</h1>
      <div className="settings-buttons">
        <Link to="/settings/genius">
          <button className="grid-button">Genius</button>
        </Link>
        <Link to="/settings/common">
          <button className="grid-button">Common</button>
        </Link>
      </div>
    </div>
  );
};

export default PlayRandomSettingsScreen;
