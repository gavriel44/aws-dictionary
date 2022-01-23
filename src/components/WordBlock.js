import React from "react";
import { useParams } from "react-router-dom";
import { useDictionaryFetch } from "../hooks/useDictionaryFetch";
import WordDefinition from "./WordDefinition";

export default function Word() {
  const { word: currentWord } = useParams();
  const { wordDefinition, isLoading } = useDictionaryFetch(currentWord);

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
