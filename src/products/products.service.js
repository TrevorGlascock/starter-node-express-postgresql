const db = require("../db/connection");

function list() {
  return db("products").select("*");
}

function read(product_id) {
  return db("products").select("*").where({ product_id }).first();
}

module.exports = {
  list,
  read,
};
