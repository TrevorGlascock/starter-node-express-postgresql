const db = require("../db/connection");

function list() {
  return db("products").select("*");
}

module.exports = {
  list,
};
