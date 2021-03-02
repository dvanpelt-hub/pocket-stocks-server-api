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

const approvedOrigins = [
  "http://localhost:3000",
  "https://quiet-woodland-22837.herokuapp.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (approvedOrigins.indexOf(origin) === -1) {
        const msg = "CORS error, please try again";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(morgan(morganOption));
app.use(helmet());
app.use(errorHandler);

//Plugs stocksRouter at the "/api/stocks" route (aka the 'root' route for this)
app.use("/api/stocks", stocksRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content Type, Accept"
  );
  next();
});

module.exports = app;
