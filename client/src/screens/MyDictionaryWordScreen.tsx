import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MerriamWebsterTerm from "../components/dictionary-components/MerriamWebsterTerm";
import { Store } from "../react-store/store";

const MyDictionaryWordScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { word } = params;
  const { dispatch, state } = useContext(Store);
  const { merriamWebsterData, userInfo } = state;

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
      {merriamWebsterData && typeof merriamWebsterData === "object" ? (
        <MerriamWebsterTerm merriamWebsterData={merriamWebsterData} />
      ) : (
        <div>
          <h4>
            Sorry... There is no extra information available about this word.
          </h4>
          <button
            className="grid-button-start"
            onClick={() => navigate(`/mydictionary/${userInfo.username}`)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDictionaryWordScreen;
