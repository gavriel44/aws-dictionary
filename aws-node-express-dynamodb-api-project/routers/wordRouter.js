const wordRouter = require("express").Router();
const { dynamoDbClient } = require("../services/dynamoDBService");

wordRouter.get("/:word", async (req, res) => {
  const word = req.params.word;

  params = {
    TableName: "dictionary-table-dev",
    KeyConditionExpression: "word = :word",
    ExpressionAttributeValues: {
      ":word": word,
    },
  };

  try {
    const data = await dynamoDbClient.query(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

wordRouter.get("/:word/:partOfSpeech", async (req, res) => {
  const word = req.params.word;
  const partOfSpeech = req.params.partOfSpeech;

  const params = {
    TableName: "dictionary-table-dev",
    Key: {
      word: word,
      partOfSpeech: partOfSpeech,
    },
  };

  try {
    const data = await dynamoDbClient.get(params).promise();
    res.json(data.Item);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = wordRouter;
