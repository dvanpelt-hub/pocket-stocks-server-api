const stocksRouter = require("./stocks-router")

const StocksService = {
  getAllStocks(knex) {
    return knex.select("*").from("stock_holdings")
  },
  insertStock(knex, newStock) {
    return knex
      .insert(newStock)
      .into("stock_holdings")
      .returning("*")
      .then(rows => rows[0])
  },
  getById(knex, id) {
    return knex
      .from("stock_holdings").select("*").where("id", id).first()
  },
  deleteStock(knex, id) {
    return knex("stock_holdings")
      .where({ id })
      .delete()
  },
  updateStock(knex, id, newStockFields) {
    return knex("stock_holdings")
      .where({ id })
      .update(newStockFields)
  }
}

module.exports = StocksService;