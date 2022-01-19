const csv = require("csvtojson");
const path = require("path");
const { DICTIONARY_TABLE } = require("./config");
const { dynamoDbClient } = require("../services/dynamoDBService");

const csvFilePath = path.resolve("./assets/Z.csv");
console.log("--------", csvFilePath);

async function loadData() {
  const wordsRow = await csv().fromFile(csvFilePath);
  const wordsJsonArray = wordsRow
    .map((value) => {
      return value["Z"];
    })
    .filter((value) => value !== "")
    .map((value) => {
      if (!value) {
        return null;
      }
      return {
        word: value.slice(0, value.indexOf("(")).trim(),
        partOfSpeech: value[value.indexOf("(") + 1],
        definition: value.slice(value.indexOf(")") + 1).trim(),
      };
    });

  for (let entry of wordsJsonArray) {
    // console.log(entry);
    try {
      const params = {
        TableName: DICTIONARY_TABLE,
        Item: entry,
        ReturnValues: "ALL_OLD",
      };
      const data = await dynamoDbClient.put(params).promise();
      console.log(data);
    } catch (err) {
      console.error("error", err);
    }
  }

  // console.log(wordsJsonArray);
  // console.log(DICTIONARY_TABLE);
}

loadData();

module.exports = loadData;

// .map((value) => {
//   console.log(value);
//   return {
//     word: value.slice(0, value.indexOf("(")),
//     partOfSpeech: value[value.indexOf("(") + 1],
//     definition: value.slice(value.indexOf(")")),
//   };
// });
