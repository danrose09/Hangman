import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Thesaurus = (props: any) => {
  const { thesaurusData } = props;

  const synonyms = thesaurusData.meta.syns[0]
    ? thesaurusData.meta.syns[0]
    : null;

  const allSynonyms =
    thesaurusData &&
    synonyms.map((synonym: string) => {
      return <p className="synonym">{synonym}</p>;
    });

  return (
    <div className="thesaurus-column">
      <div className="thesaurus-container">
        <h3 className="thesaurus-title">Thesaurus</h3>
        <div className="synonyms-container">{allSynonyms}</div>
      </div>
    </div>
  );
};

export default Thesaurus;
