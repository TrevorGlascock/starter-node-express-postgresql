const db = require("../db/connection");

/**************************** CRUDL Queries ****************************/
function read(product_id) {
  return db("products").select("*").where({ product_id }).first();
}

function list() {
  return db("products").select("*");
}

/**************************** Aggregate Data Functions ****************************/

function listOutOfStockCount() {
  return db("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

function listPriceSummary() {
  return db("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

module.exports = {
  read,
  list,
  listOutOfStockCount,
  listPriceSummary,
};
