const MerriamWebsterTerm = (props: any) => {
  const { merriamWebsterData } = props;

  const term = merriamWebsterData.meta.id
    ? merriamWebsterData.meta.id.replace(":1", "")
    : null;
  const partOfSpeech = merriamWebsterData.fl ? merriamWebsterData.fl : null;
  const vd = merriamWebsterData.def[0].vd ? merriamWebsterData.def[0].vd : null;
  const pronunciation = merriamWebsterData.hwi.prs[0]
    ? merriamWebsterData.hwi.prs[0].mw
    : null;
  const pAlternate = merriamWebsterData.hwi.prs[1]
    ? merriamWebsterData.hwi.prs[1].l
    : null;
  const pAlternateIPA = merriamWebsterData.hwi.prs[1]
    ? merriamWebsterData.hwi.prs[1].mw
    : null;
  const definitions = merriamWebsterData.shortdef.map((def: string) => {
    return <li>{def}</li>;
  });
  const firstKnownUse = merriamWebsterData.date
    ? merriamWebsterData.date
        .replaceAll("{ds|t|1||}", "")
        .replaceAll("{ds||2|b|}", "")
    : null;

  const etymology = merriamWebsterData.et ? merriamWebsterData.et[0] : null;
  const note = merriamWebsterData.et ? merriamWebsterData.et[1] : null;

  return (
    <div className="mwt-screen">
      <div className="term-and-pos-container">
        <h1 style={{ paddingRight: "10px", marginBottom: "0" }}>
          {term && term}
        </h1>
        <p
          style={{
            paddingTop: "10px",
            marginBottom: "0",
            marginTop: "22.5px",
            color: "#3FA796",
          }}
        >
          <i>{partOfSpeech && partOfSpeech}</i>
        </p>
      </div>
      <p>
        \ {pronunciation}, <i>{pAlternate && pAlternate}</i>,{" "}
        {pAlternateIPA && pAlternateIPA}\
      </p>
      <p>
        <i>
          <u>{vd}</u>
        </i>
      </p>
      {term && (
        <h3>
          Definition of <i>{term}</i>
        </h3>
      )}
      <ol>{definitions && definitions}</ol>
      {firstKnownUse && (
        <div>
          <h3>
            First Known Use of <i>{term}</i>:{" "}
          </h3>
          <p>{firstKnownUse}</p>
        </div>
      )}
      {etymology && (
        <div>
          <h3>
            History and Etymology of <i>{term}</i>
          </h3>
          <p>
            {etymology.map((sentence: string) => {
              if (sentence !== "text") {
                const newSentence = sentence
                  .replaceAll("{it}", " ")
                  .replaceAll("{/it}", " ")
                  .replaceAll("{ma}", " ")
                  .replaceAll("{/ma}", " ")
                  .replaceAll("{mat|", " ")
                  .replaceAll("|}", " ");
                return newSentence;
              } else {
                return null;
              }
            })}
          </p>
        </div>
      )}

      {note && note[1][0][1] ? (
        <div>
          <h4>NOTE </h4>
          <p>
            {note[1][0][1].replaceAll("{it}", " ").replaceAll("{/it}", " ")}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MerriamWebsterTerm;
