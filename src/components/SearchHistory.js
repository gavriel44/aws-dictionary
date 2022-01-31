import React from "react";
import { useOutletContext } from "react-router-dom";
import WordDefinition from "./WordDefinition";

export default function SearchHistory() {
  const [searchHistory] = useOutletContext();
  console.log(searchHistory);
  const arr = [];

  Object.values(searchHistory).forEach((word) => {
    word.forEach((definition) => {
      arr.push(
        <WordDefinition key={definition.definition} word={definition} title />
      );
    });
  });

  return <div className="word-history">{arr}</div>;
}
