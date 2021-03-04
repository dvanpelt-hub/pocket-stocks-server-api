const request = require("supertest")(
  "postgresql://postgres@localhost/pocket_stocks_test"
);

// const app = require("../src/app");

// // describe("/ as root API call", () => {
// //   it('GET / responds with 200 containing "Hello, world!"', () => {
// //     return supertest(app).get("/").expect(200, "Hello, world!");
// //   });
// // });
