const db = require("../db/connection");

function list() {
  return db("products").select("*");
}

function read(product_id) {
  return db("products").select("*").where({ product_id }).first();
}

function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

module.exports = {
  list,
  read,
  listOutOfStockCount,
};
