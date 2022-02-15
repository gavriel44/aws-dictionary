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

    it("get word", () => {
      server
        .get("/word/Theword")
        .expect(200)
        .expect((res) => {
          assert(res.body[0].word, "Theword");
        });
    });

    it("word are returned as json", () => {
      server
        .get("/word/Theword")
        .expect(200)
        .expect("Content-Type", /application\/json/);
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
      console.log(response.body.partOfSpeech);
      expect(response.body.partOfSpeech).toBe("n");
    });

    it("get a verb", async () => {
      const response = await server.get("/word/Dog/v");
      expect(response.body.partOfSpeech).toBe("v");
    });
  });
});

// .expect(200)
//       .expect(function (res) {
//         res.body[0].word = "Theword";
//       });
