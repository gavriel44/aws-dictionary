import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDictionaryFetch } from "../hooks/useDictionaryFetch";
import WordDefinition from "./WordDefinition";

export default function WordBlock() {
  // eslint-disable-next-line no-unused-vars
  const [searchHistory, setSearchHistory] = useOutletContext();
  const { word: currentWord } = useParams();
  const { wordDefinition, isLoading } = useDictionaryFetch(currentWord);

  useEffect(() => {
    setSearchHistory((previousHistory) => {
      return {
        ...previousHistory,
        [currentWord]: wordDefinition,
      };
    });
  }, [currentWord, setSearchHistory, wordDefinition]);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (currentWord !== []) {
    return (
      <div className="word-block">
        <h1>{currentWord}</h1>
        {wordDefinition.map((partOfSpeechDefinition) => {
          return (
            <WordDefinition
              key={partOfSpeechDefinition.definition}
              word={partOfSpeechDefinition}
            />
          );
        })}
      </div>
    );
  }
  return <div style={{ color: "white" }}>not found</div>;
}
