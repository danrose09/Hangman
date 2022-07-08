import { Link } from "react-router-dom";

const HomescreenButtons = () => {
  const imageLocation = "https://miro.medium.com/max/300/0*6WFhG2qCe5dPH1Fz.";
  return (
    <div>
      <img
        alt="A hangman drawing"
        src={imageLocation}
        height={300}
        width={300}
      ></img>
      <button>
        <Link className="button-link" to="/playrandom">
          Quick Play
        </Link>
      </button>
      <button>
        <Link className="button-link" to={"/categories"}>
          Categories
        </Link>
      </button>
    </div>
  );
};

export default HomescreenButtons;
