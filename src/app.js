require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const stocksRouter = require("./stocks/stocks-router");
const errorHandler = require("./errorHandler");
const { NODE_ENV } = require("./config");

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors());
app.use(morgan(morganOption));
app.use(helmet());
app.use(errorHandler);
app.use("/api/stocks", stocksRouter);

app.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content Type, Accept"
  );
  next();
});

module.exports = app;
