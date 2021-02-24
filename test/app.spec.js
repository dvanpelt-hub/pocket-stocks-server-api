const app = require("../src/app");
const server = require("../src/server");
const stocksRouter = require("../src/stocks/stocks-router");

describe("/ as root API call", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});

describe("GET /api/stocks/home call", () => {
  context("stock table exists and responds", () => {
    it("GET / responds with 200 containing stocks from stock_holdings database", () => {
      return supertest(stocksRouter).get("/api/stocks/home").expect(200);
    });
  });
});
