const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");

describe("Stock postings endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("stock_holdings").truncate());

  afterEach("cleanup", () => db("stock_holdings").truncate());

  context("Given there are stocks in the table", () => {
    const testStocks = [
      {
        id: 1,
        ticker_symbol: "ABC",
        recommendation_status: "Buy",
        stock_value: "Overvalued",
        posting: "First test",
        purchase_price: 100,
      },
      {
        id: 2,
        ticker_symbol: "DEF",
        recommendation_status: "Sell",
        stock_value: "Undervalued",
        posting: "Second test",
        purchase_price: 200,
      },
      {
        id: 3,
        ticker_symbol: "GHI",
        recommendation_status: "Hold",
        stock_value: "Accurate",
        posting: "Third test",
        purchase_price: 300,
      },
    ];
    beforeEach("insret stocks", () => {
      return db.into("stock_holdings").insert(testStocks);
    });
    it("GET /api/stocks/home responds with 200 and the positions for stocks", () => {
      return supertest(app).get("/api/stocks/home").expect(200);
    });
    it("GET by :id", () => {
      const stockId = 2;
      // const expectedStock = testStocks[stockId - 1];
      return supertest(app).get(`/api/stocks/${stockId}`).expect(200);
    });
    // it("POST", function (done) {
    //   return supertest(app)
    //     .post("/api/stocks/home")
    //     .send({
    //       ticker_symbol: "JKL",
    //       recommendation_status: "BUY",
    //       stock_value: "Accurate",
    //       posting: "BUY!",
    //       purchase_price: 200,
    //     })
    //     .expect(200)
    //     .end(function (err, res) {
    //       if (err) return done(err);
    //       expect(res.body[0].ticker_symbol).to.eq("JKL");
    //       done();
    //     });
    // describe(`POST /api/stocks/home`, () => {
    //   it(`POSTs a new holding and receives a status of 201`, function () {
    //     return supertest(app)
    //       .post("/api/stocks/home")
    //       .send({
    //         ticker_symbol: "JKL",
    //         recommendation_status: "BUY",
    //         stock_value: "Accurate",
    //         posting: "BUY!",
    //         purchase_price: 200,
    //       })
    //       .expect(201);
    //   });
    // });
  });
});

describe(`DELETE /api/stocks/home/:id`, () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the table", () => db("stock_holdings").truncate());
  afterEach("cleanup", () => db("stock_holdings").truncate());

  context("Given there are stocks in the database", () => {
    const testStocks = [
      {
        id: 1,
        ticker_symbol: "ABC",
        recommendation_status: "Buy",
        stock_value: "Overvalued",
        posting: "First test",
        purchase_price: 100,
      },
      {
        id: 2,
        ticker_symbol: "DEF",
        recommendation_status: "Sell",
        stock_value: "Undervalued",
        posting: "Second test",
        purchase_price: 200,
      },
      {
        id: 3,
        ticker_symbol: "GHI",
        recommendation_status: "Hold",
        stock_value: "Accurate",
        posting: "Third test",
        purchase_price: 300,
      },
    ];
    beforeEach("insert stocks", () => {
      return db.into("stock_holdings").insert(testStocks);
    });
    it("responds with 204 and removes the stock", () => {
      const idToRemove = 2;
      // const expectedStocks = testStocks.filter(
      //   (stock) => stock.id !== idToRemove
      // );
      return supertest(app).delete(`/api/stocks/${idToRemove}`).expect(204);
      // .then((res) =>
      //   supertest(app).get(`/api/stocks/home`).expect(expectedStocks)
      // );
    });
  });
});
