import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Word } from "../types/SearchHistory";
import { lettersOnly } from "../utils/help";

interface Props {
  word: Word;
}

const partOfSpeechDict = {
  n: "noun",
  v: "verb",
  p: "pronoun",
  adj: "adjective",
  adv: "adverb",
  c: "conjunction",
  i: "interjection",
};

export default function WordDefinition({ word }: Props): ReactElement {
  const navigate = useNavigate();
  const handleWordClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    const word = lettersOnly(e.currentTarget.innerText);
    navigate(`../${word}`);
  };
  // let wordClass;
  // if (word.partOfSpeech === "n") {
  //   wordClass = "noun";
  // }
  return (
    <div className={`${word.partOfSpeech} word-definition`}>
      {/* {title ? <h3>{word.word}</h3> : null} */}
      <h3>As a {partOfSpeechDict[word.partOfSpeech]}</h3>
      {word.definition.map((definition) => {
        return (
          <p key={definition}>
            {definition.split(" ").map((word, i) => (
              <span key={i} onClick={handleWordClick}>
                {word}{" "}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
