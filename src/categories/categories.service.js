const db = require("../db/connection");

function list() {
  return db("categories").select("*");
}

module.exports = {
  list,
};