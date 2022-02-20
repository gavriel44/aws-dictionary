import { Skeleton, Typography } from "@mui/material";
import skeletonLoaderArray from "./WordBlockSkeleton";
import { Box } from "@mui/system";
import axios, { Axios, AxiosError } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/help";
import WordDefinition from "./WordDefinition";
import {
  isWordDefinition,
  IWordDefinition,
  SearchHistory,
  Word,
} from "../types/SearchHistory";
import { OutletContext } from "../App";

export default function WordBlock(): ReactElement {
  // eslint-disable-next-line no-unused-vars
  const [searchHistory, setSearchHistory] = useOutletContext<OutletContext>();
  const { word: currentWord } = useParams<string>();
  const isSurpriseWord = currentWord === "rand-word";

  const baseUrl = "https://v8pauve0t1.execute-api.us-east-1.amazonaws.com";

  if (!currentWord) return <>un error accrued</>;

  const capitalizedWord = capitalizeFirstLetter(currentWord);

  let searchUrl = `${baseUrl}/word/${capitalizedWord}`;
  if (isSurpriseWord) {
    searchUrl =
      baseUrl + "/partOfSpeech" + "/" + (Math.random() < 0.5 ? "n" : "v");
  }

  const fetchData = async () => {
    const res = await axios.get(searchUrl);
    console.log(res.data);

    return [].concat(res.data);
  };

  const {
    isLoading,
    error,
    data: wordDefinition,
    refetch,
  } = useQuery<IWordDefinition, AxiosError>(`${currentWord}Data`, fetchData, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isWordDefinition(wordDefinition)) return;
    const word = wordDefinition[0].word;
    setSearchHistory((previousHistory: SearchHistory) => {
      const x: SearchHistory = {
        ...previousHistory,
        [word]: wordDefinition,
      };
      return x;
    });
  }, [currentWord, setSearchHistory, wordDefinition]);

  if (error) {
    const errorCode = error.response?.status || 500;
    return (
      <div className="word-block" style={{ color: "white" }}>
        <Typography variant="h2">Oops! {errorCode}</Typography>
        <Typography sx={{ margin: "50px" }} variant="h6">
          Something went wrong.
        </Typography>

        <img src={`https://http.cat/${errorCode}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ width: "40%", margin: "auto", marginTop: "80px" }}>
        {skeletonLoaderArray}
      </Box>
    );
  }

  if (isWordDefinition(wordDefinition)) {
    return (
      <div className="word-block">
        <h1>{wordDefinition[0].word}</h1>
        {wordDefinition.map((partOfSpeechDefinition) => {
          return (
            <WordDefinition
              key={partOfSpeechDefinition.definition[0]}
              word={partOfSpeechDefinition}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="word-block" style={{ color: "white" }}>
      <Typography variant="h2">Oops! 204</Typography>
      <Typography sx={{ margin: "50px" }} variant="h6">
        Its seems we dont have your word in our Data Base yet. D:
      </Typography>

      <img src="https://http.cat/204" />
    </div>
  );
}
