import React from "react";

const MerriamWebsterTerm = (props: any) => {
  const { merriamWebsterData } = props;
  const term = merriamWebsterData.meta.id;
  const conjugations = merriamWebsterData.ins
    ? merriamWebsterData.ins.map((con: any) => {
        return <h4> {con.if}; </h4>;
      })
    : null;
  const partOfSpeech = merriamWebsterData.fl;
  const vd = merriamWebsterData.def[0].vd;
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
  const firstKnownUse = merriamWebsterData.date;

  return (
    <div>
      <div className="term-and-pos-container">
        <h1 style={{ paddingRight: "10px", marginBottom: "0" }}>
          {term && term}
        </h1>
        <p style={{ paddingTop: "10px", marginBottom: "0" }}>
          <u>
            <i>{partOfSpeech && partOfSpeech}</i>
          </u>
        </p>
      </div>
      <div className="conjugations-container">
        {conjugations && conjugations}
      </div>

      <p>
        \ {pronunciation}, <i>{pAlternate && pAlternate}</i>,{" "}
        {pAlternateIPA && pAlternateIPA}\
      </p>
      <p>
        <i>{vd}</i>
      </p>
      <ul>{definitions && definitions}</ul>
      {term && firstKnownUse && (
        <div>
          <h3>First Known Use of {term}: </h3>
          <p>{firstKnownUse}</p>
        </div>
      )}
    </div>
  );
};

export default MerriamWebsterTerm;
