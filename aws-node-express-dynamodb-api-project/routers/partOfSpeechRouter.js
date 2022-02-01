const partOfSpeechRouter = require("express").Router();
const { dynamoDbClient } = require("../services/dynamoDBService");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
  // if (!letter) {
  //   params.KeyConditionExpression = "partOfSpeech = :part";
  //   params.ExpressionAttributeValues = {
  //     ":part": part,
  //   };
  // } else {
  // params.KeyConditionExpression =
  //   "partOfSpeech = :part and firstLetter = :letter";
  // params.ExpressionAttributeValues = {
  //   ":part": part,
  //   ":letter": letter,
  // };

  try {
    const data = await dynamoDbClient.query(params).promise();
    res.json(data.Items[Math.floor(Math.random() * data.Items.length)]);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = partOfSpeechRouter;
