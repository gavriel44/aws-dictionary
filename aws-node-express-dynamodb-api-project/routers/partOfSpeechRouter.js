const partOfSpeechRouter = require("express").Router();
const DBService = require("../services/DBService");

/* 
  Returns a random word with given partOfSpeech.
  If letter="..." query param is supplied, the random 
  word will start with that letter.

  The return format is as follows:

  {
    partOfSpeech: "n" or "v" ...
    definition: [...definitions]
    word: "theWord"
    firstLetter: "theFirstLetter"
  }

*/

partOfSpeechRouter.get("/:part", async (req, res) => {
  const part = req.params.part;
  const letter = req.query.letter;

  try {
    const word = await DBService.getWord(word, letter);
    res.json(word);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = partOfSpeechRouter;
