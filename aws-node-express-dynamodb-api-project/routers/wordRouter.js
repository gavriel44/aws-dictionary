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
    const responseWord = await DBService.getWord(word);
    res.json(responseWord);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

wordRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    const consumedCapacity = await DBService.postWord(body);
    res.json({ consumedCapacity, body });
  } catch (error) {
    console.log(error);
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
    const responseWord = await DBService.getWordWithPartOfSpeech(
      word,
      partOfSpeech
    );
    res.json(responseWord);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = wordRouter;
