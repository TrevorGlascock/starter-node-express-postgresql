const db = require("../db/connection");

function create(supplier) {
  return db("suppliers")
    .insert(supplier)
    .returning("*")
    .then((rows) => rows[0]);
}

module.exports = {
  create,
};
