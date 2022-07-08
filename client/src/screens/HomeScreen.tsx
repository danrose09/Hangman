import React from "react";
import HomescreenButtons from "../components/HomescreenButtons";

const Homescreen = () => {
  const imageLocation = "https://miro.medium.com/max/300/0*6WFhG2qCe5dPH1Fz.";
  return (
    <div>
      <h1 className="title">Hangman</h1>
      <img
        className="homescreen-image"
        alt="A hangman drawing"
        src={imageLocation}
        height={300}
        width={300}
      ></img>
      <HomescreenButtons />
    </div>
  );
};

export default Homescreen;
