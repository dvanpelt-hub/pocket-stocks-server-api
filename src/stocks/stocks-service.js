const StocksService = {
  getAllStocks(knex) {
    return knex.select("*").from("stock_holdings")
  },
  // insertStock(knex, ticker_symbol, recommendation_status, stock_value, posting, purchase_price) {
  //   return knex
  //     .insert(ticker_symbol, recommendation_status, stock_value, posting, purchase_price)
  //     .into("stock_holdings")
  //     .returning("*")
  //     .then(rows => rows[0])
  // },
  insertStock(knex) {
    return knex('stock_holdings').insert({ticker_symbol: ticker_symbol}, {recommendation_status: recommendation_status}, {stock_value: stock_value}, {posting: posting}, {purchase_price: purchase_price})
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