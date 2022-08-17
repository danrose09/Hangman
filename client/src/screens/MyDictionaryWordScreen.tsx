import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MerriamWebsterTerm from "../components/dictionary-components/MerriamWebsterTerm";
import { Store } from "../react-store/store";

const MyDictionaryWordScreen = () => {
  const params = useParams();
  const { word } = params;
  const { dispatch, state } = useContext(Store);
  const { merriamWebsterData } = state;

  const apiKey = "140eecdf-bd1e-4b4c-8477-0f78ec151b06";

  useEffect(() => {
    const fetchMerriamWebster = async () => {
      try {
        const { data } = await axios.get(
          `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
        );
        if (data) {
          dispatch({ type: "SET_MERRIAM_WEBSTER_DATA", payload: data[0] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerriamWebster();
  }, [word, dispatch]);

  console.log(merriamWebsterData);

  return (
    <div>
      {merriamWebsterData ? (
        <MerriamWebsterTerm merriamWebsterData={merriamWebsterData} />
      ) : null}
    </div>
  );
};

export default MyDictionaryWordScreen;
