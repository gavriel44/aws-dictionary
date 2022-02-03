const express = require("express");
const wordRouter = require("./routers/wordRouter");
const partOfSpeechRouter = require("./routers/partOfSpeechRouter");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/word", wordRouter);
app.use("/partOfSpeech", partOfSpeechRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found sorry! and go",
  });
});

module.exports = app;
