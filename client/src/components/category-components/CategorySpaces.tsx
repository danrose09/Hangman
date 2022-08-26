import { useContext } from "react";
import Confetti from "react-confetti";
import { Store } from "../../react-store/store";

const CategorySpaces = () => {
  const { state } = useContext(Store);
  const { categoryWord, guessedLetters, hasWon } = state;
  const letterArray = categoryWord.toString().split("");

  const underlinedLetters = letterArray.map((letter: String, index: number) => {
    let isGuessed = false;

    if (letter === " ") {
      isGuessed = true;
    } else if (guessedLetters.includes(letter.toLowerCase())) {
      isGuessed = true;
    }
    return (
      <div className="underline" key={index}>
        {isGuessed && letter === " " ? (
          <div style={{ marginLeft: "5px", marginRight: "5px" }}></div>
        ) : isGuessed ? (
          <h2>
            {letter.toUpperCase() === letter
              ? letter.toUpperCase()
              : letter.toLowerCase()}
          </h2>
        ) : (
          <h2>_</h2>
        )}
      </div>
    );
  });

  return (
    <div className="underlined-letters">
      {underlinedLetters}
      <Confetti hidden={!hasWon} run />
    </div>
  );
};

export default CategorySpaces;
