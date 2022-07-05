import React from "react";
import { Link } from "react-router-dom";

const HomescreenButtons = () => {
  return (
    <div>
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
