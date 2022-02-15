import React from "react";
import { useOutletContext } from "react-router-dom";
import WordDefinition from "./WordDefinition";

export default function SearchHistory() {
  const [searchHistory] = useOutletContext();
  console.log(searchHistory);
  const arr = [];

  const values = Object.values(searchHistory);

  console.log(Object.values(searchHistory));

  // if (values.length === 0) {
  //   console.log("in if");

  // }
  values.forEach((word) => {
    if (!word) return;
    word.forEach((definition) => {
      arr.push(
        <WordDefinition key={definition.definition} word={definition} title />
      );
    });
  });

  if (arr.length === 0) {
    return <div className="word-history">no search history</div>;
  }

  return <div className="word-history">{arr}</div>;
}
