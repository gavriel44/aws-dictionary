const wordRouter = require("express").Router();
const DBService = require("../services/DBService");

/* 
  Returns the specific word definitions Array by the following format:

  [
    {
      partOfSpeech: "n" or "v" ...
      definition: [...definitions]
      word: "theWord"
      firstLetter: "theFirstLetter"
    },
    { same as above but different partOfSpeech }
    ...
  ]

*/
wordRouter.get("/:word", async (req, res) => {
  const word = req.params.word;

  try {
    const word = await DBService.getWord(word);
    res.json(word);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

/* 
  Returns a specific word with a specific partOfWord if it exists.
  The return format is **not an array and is as follows:

  {
    partOfSpeech: "n" or "v" ...
    definition: [...definitions]
    word: "theWord"
    firstLetter: "theFirstLetter"
  }

*/
wordRouter.get("/:word/:partOfSpeech", async (req, res) => {
  const word = req.params.word;
  const partOfSpeech = req.params.partOfSpeech;

  try {
    word = await DBService.getWordWithPartOfSpeech(word, partOfSpeech);
    res.json(word);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = wordRouter;
