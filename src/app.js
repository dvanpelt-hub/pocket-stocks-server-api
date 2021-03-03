require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const stocksRouter = require("./stocks/stocks-router");
const errorHandler = require("./errorHandler");
const { NODE_ENV } = require("./config");
const { CLIENT_ORIGIN } = require("./cors/cors");

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors(CLIENT_ORIGIN));

app.use(express.json());
app.use(morgan(morganOption));
app.use(helmet());
app.use(errorHandler);

//Plugs stocksRouter at the "/api/stocks" route (aka the 'root' route for this)
app.use("/api/stocks", stocksRouter);

module.exports = app;
