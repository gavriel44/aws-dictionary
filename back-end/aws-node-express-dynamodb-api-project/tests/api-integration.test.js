const request = require("supertest");
const DBService = require("../services/DBService");
const mockData = require("./mockData");

const server = request("http://localhost:3000");

describe("API tests", () => {
  describe(" add and get word from db", () => {
    it("add word", async () => {
      const response = await server.post("/word").send(mockData[0]);
      expect(response.status).toBe(200);
      expect(response.body.body.word).toBe(mockData[0].word);
    });

    it("get word", async () => {
      const response = await server.get("/word/TheWord");

      expect(response.status).toBe(200);
      console.log(response.body);
      expect(response.body[0].word).toBe(mockData[0].word);
    });

    it("word are returned as json", async () => {
      const response = await server.get("/word/TheWord");

      expect(response.status).toBe(200);
      expect(response.header["content-type"]).toMatch(/application\/json/);
    });
  });
});

describe("word router", () => {
  beforeEach(async () => {
    await DBService.batchWrite(mockData, true);
    await DBService.batchWrite(mockData);
  });

  describe("GET /word/:word/:partOfSpeech - get word with a specific partOfSpeech", () => {
    it("get a noun", async () => {
      const response = await server.get("/word/Dog/n");
      //   console.log(response.body.partOfSpeech);
      expect(response.body.partOfSpeech).toBe("n");
    });

    it("get a verb", async () => {
      const response = await server.get("/word/Dog/v");
      expect(response.body.partOfSpeech).toBe("v");
    });
  });

  it("GET /word/:word", async () => {
    const response = await server.get("/word/Book");
    expect(response.body).toHaveLength(2);
  });
});
