import axios from "axios";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/help";

export function useDictionaryFetch(word) {
  const [wordDefinition, setWordDefinition] = useState([{ word: "test" }]);
  const [isLoading, setIsLoading] = useState(true);

  const capitalizedWord = capitalizeFirstLetter(word);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://v8pauve0t1.execute-api.us-east-1.amazonaws.com/word/${capitalizedWord}`
      )
      .then((response) => {
        console.log("response", response.data);
        setWordDefinition(response.data);
        setIsLoading(false);
      });
  }, [capitalizedWord]);

  return { wordDefinition, isLoading };
}
