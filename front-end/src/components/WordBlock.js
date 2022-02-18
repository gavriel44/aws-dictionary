import { Skeleton, Typography } from "@mui/material";
import skeletonLoaderArray from "./WordBlockSkeleton";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/help";
import WordDefinition from "./WordDefinition";

export default function WordBlock() {
  // eslint-disable-next-line no-unused-vars
  const [searchHistory, setSearchHistory] = useOutletContext();
  const { word: currentWord } = useParams();
  const isSurpriseWord = currentWord === "rand-word";
  const [randomPart, setRandomPart] = useState("n");

  const baseUrl = "https://v8pauve0t1.execute-api.us-east-1.amazonaws.com";

  const capitalizedWord = capitalizeFirstLetter(currentWord);

  let searchUrl = `${baseUrl}/word/${capitalizedWord}`;
  if (isSurpriseWord) {
    console.log("in comp");
    searchUrl = baseUrl + "/partOfSpeech" + "/" + randomPart;
  }

  useEffect(() => {
    return () => {
      console.log("in effect");
      setRandomPart(Math.random() < 0.5 ? "n" : "v");
    };
  }, []);

  const {
    isLoading,
    error,
    data: wordDefinition,
  } = useQuery(
    `${currentWord}Data`,
    () =>
      axios.get(searchUrl).then((res) => {
        return [].concat(res.data);
      }),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const word = currentWord[0].word;
    setSearchHistory((previousHistory) => {
      return {
        ...previousHistory,
        [word]: wordDefinition,
      };
    });
  }, [currentWord, setSearchHistory, wordDefinition]);

  if (error) {
    const errorCode = error.response.status;
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
  console.log(wordDefinition);
  if (wordDefinition.length !== 0) {
    return (
      <div className="word-block">
        <h1>{wordDefinition[0].word}</h1>
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
