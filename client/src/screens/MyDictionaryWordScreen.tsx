import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MerriamWebsterTerm from "../components/dictionary-components/MerriamWebsterTerm";
import Thesaurus from "../components/dictionary-components/Thesaurus";
import { Store } from "../react-store/store";

const MyDictionaryWordScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { word } = params;
  const { dispatch, state } = useContext(Store);
  const { merriamWebsterData, thesaurusData, userInfo } = state;

  const apiKey = "140eecdf-bd1e-4b4c-8477-0f78ec151b06";
  const thesaurusKey = "dbd1f458-7249-4e64-9b14-a1a70066b711";

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
    const fetchThesaurus = async () => {
      try {
        const { data } = await axios.get(
          `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`
        );
        dispatch({ type: "SET_THESAURUS_DATA", payload: data[0] });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMerriamWebster();
    fetchThesaurus();
  }, [word, dispatch]);

  console.log(merriamWebsterData);

  console.log(thesaurusData);

  return (
    <div>
      {merriamWebsterData && typeof merriamWebsterData === "object" ? (
        <div className="mwt-thesaurus-container">
          <MerriamWebsterTerm
            merriamWebsterData={merriamWebsterData}
            thesaurusData={thesaurusData}
          />
          {thesaurusData && typeof thesaurusData === "object" ? (
            <Thesaurus thesaurusData={thesaurusData} />
          ) : null}
        </div>
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
