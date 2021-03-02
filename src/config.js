require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/pocket_stocks",
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  CLIENT_ORIGIN: [
    "http://localhost:3000",
    "https://pocket-stocks-client.vercel.app/home",
    "https://quiet-woodland-22837.herokuapp.com",
  ],
};
