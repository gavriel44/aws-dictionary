const { IS_OFFLINE } = require("../utils/config");
const AWS = require("aws-sdk");

const dynamoDbClientParams = {};
if (IS_OFFLINE) {
  dynamoDbClientParams.region = "localhost";
  dynamoDbClientParams.endpoint = "http://localhost:8000";
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

module.exports = { dynamoDbClient };
