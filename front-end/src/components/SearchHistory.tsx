import React, { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../App";
import { Word } from "../types/SearchHistory";
import WordDefinition from "./WordDefinition";

export default function SearchHistory() {
  const [searchHistory] = useOutletContext<OutletContext>();
  console.log(searchHistory);
  const arr: ReactElement[] = [];

  const values = Object.values(searchHistory);

  console.log(Object.values(searchHistory));

  // if (values.length === 0) {
  //   console.log("in if");

  // }
  values.forEach((word) => {
    if (!word) return;
    word.forEach((definition) => {
      return arr.push(
        <WordDefinition key={definition.definition[0]} word={definition} />
      );
    });
  });

  if (arr.length === 0) {
    return <div className="word-history">no search history</div>;
  }

  return <div className="word-history">{arr}</div>;
}
