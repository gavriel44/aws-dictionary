const partOfSpeechRouter = require("express").Router();
const { dynamoDbClient } = require("../services/dynamoDBService");

partOfSpeechRouter.get("/:part", async (req, res) => {
  const part = req.params.part;
  const letter = req.query.letter;
  let params = {
    TableName: "dictionary-table-dev",
    IndexName: "partOfSpeechIndex",
  };
  if (!letter) {
    params.KeyConditionExpression = "partOfSpeech = :part";
    params.ExpressionAttributeValues = {
      ":part": part,
    };
  } else {
    params.KeyConditionExpression =
      "partOfSpeech = :part and firstLetter = :letter";
    params.ExpressionAttributeValues = {
      ":part": part,
      ":letter": letter,
    };
  }

  try {
    const data = await dynamoDbClient.query(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

partOfSpeechRouter.get("/:part");

module.exports = partOfSpeechRouter;
