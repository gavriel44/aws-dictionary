const partOfSpeechRouter = require("express").Router();
const { dynamoDbClient } = require("../services/dynamoDBService");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
  const letter = req.query.letter || alphabet[Math.floor(Math.random() * 26)];
  let params = {
    TableName: "dictionary-table-dev",
    IndexName: "partOfSpeechIndex",
    KeyConditionExpression: "partOfSpeech = :part and firstLetter = :letter",
    ExpressionAttributeValues: {
      ":part": part,
      ":letter": letter,
    },
  };

  try {
    const data = await dynamoDbClient.query(params).promise();
    res.json(data.Items[Math.floor(Math.random() * data.Items.length)]);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = partOfSpeechRouter;
