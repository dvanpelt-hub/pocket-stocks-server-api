const path = require("path");
const express = require("express");
const xss = require("xss");
const StocksService = require("./stocks-service");

const stocksRouter = express.Router();
const jsonParser = express.json();

const sanitizeStocks = (stock) => ({
  ...stock,
  name: xss(stock.ticker_symbol),
});

stocksRouter
  .route("/home")
  .get((req, res, next) => {
    StocksService.getAllStocks(req.app.get("db"))
      .then((stock) => {
        res.json(stock.map(sanitizeStocks));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { newStock } = req.body;
    console.log(newStock);

    for (const [key, value] of Object.entries(ticker_symbol, recommendation_status, stock_value, posting)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` },
        });
      }
    }
    StocksService.insertStock(req.app.get("db"), newStock).then((stock) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${stock.id}`))
        .json(sanitizeStocks(stock));
      })
      .catch(next);
    });

    stocksRouter
      .route("/:id")
      .all((req, res, next) => {
        StocksService.getById(req.app.get("db"), req.params.id)
          .then(stock => {
            if (!stock) {
              return res.status(404).json({
                error: { message: "Stock doesn't exist" },
              });
            }
            res.stock = stock;
            next();
          })
          .catch(next);
      })

    .get((req, res, next) => {
      res.json(sanitizeStocks(res.stock));
    })
    .delete((req, res, next) => {
      StocksService.deleteStock(req.app.get("db"), req.params.id)
        .then(() => {
          res.status(204).end();
        })
        .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
      const { ticker_symbol } = req.body;
      const stockToUpdate = { ticker_symbol };
      
      if(!ticker_symbol) {
        return res.status(400).json({
          error: {
            message: "Request must contain ticker symbol"
          }
        })
      }
      StocksService.updateStock(
        req.app.get("db"),
        req.params.id,
        stockToUpdate
      )
        .then(() => {
          res.status(204).end();
        })
        .catch(next);
    });
    
module.exports = stocksRouter;