import { useContext } from "react";
import { Store } from "../../react-store/store";

const AllCategoryWords = (props: any) => {
  const { category } = props;
  const { state } = useContext(Store);
  const { alphabet } = state;
  const allLettersAndWords = alphabet.map((char: string) => {
    const allWords = category.words.filter((word: string) => {
      const wordToArray = word.split("");
      return wordToArray[0].toLowerCase() === char.toLowerCase();
    });

    return (
      <div>
        <h1>{allWords.length > 0 && char.toUpperCase()}</h1>
        <p>
          {allWords.map((word: string) => {
            return word + ", ";
          })}
        </p>
      </div>
    );
  });
  return allLettersAndWords;
};

export default AllCategoryWords;
