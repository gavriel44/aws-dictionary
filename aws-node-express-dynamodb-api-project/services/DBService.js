const { IS_OFFLINE } = require("../utils/config");
const AWS = require("aws-sdk");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const dynamoDbClientParams = {};
if (IS_OFFLINE) {
  dynamoDbClientParams.region = "localhost";
  dynamoDbClientParams.endpoint = "http://localhost:8000";
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

async function getWord(word) {
  params = {
    TableName: "dictionary-table-dev",
    KeyConditionExpression: "word = :word",
    ExpressionAttributeValues: {
      ":word": word,
    },
  };

  const data = await dynamoDbClient.query(params).promise();
  return data.Items;
}

async function getWordWithPartOfSpeech(word, partOfSpeech) {
  const params = {
    TableName: "dictionary-table-dev",
    Key: {
      word: word,
      partOfSpeech: partOfSpeech,
    },
  };

  const data = await dynamoDbClient.get(params).promise();
  return data.Item;
}

async function getRandomWord(
  partOfSpeech,
  letter = alphabet[Math.floor(Math.random() * 26)]
) {
  const params = {
    TableName: "dictionary-table-dev",
    IndexName: "partOfSpeechIndex",
    KeyConditionExpression: "partOfSpeech = :part and firstLetter = :letter",
    ExpressionAttributeValues: {
      ":part": partOfSpeech,
      ":letter": letter,
    },
  };

  const data = await dynamoDbClient.query(params).promise();
  return data.Items[Math.floor(Math.random() * data.Items.length)];
}

module.exports = {
  dynamoDbClient,
  getWord,
  getWordWithPartOfSpeech,
  getRandomWord,
};
