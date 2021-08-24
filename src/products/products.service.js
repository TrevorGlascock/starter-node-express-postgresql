const db = require("../db/connection");

/**************************** CRUDL Operations ****************************/
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

module.exports = {
  list,
  read,
  listOutOfStockCount,
};
