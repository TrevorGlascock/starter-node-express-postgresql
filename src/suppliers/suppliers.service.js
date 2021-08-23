const db = require("../db/connection");

function create(supplier) {
  return db("suppliers")
    .insert(supplier)
    .returning("*")
    .then((rows) => rows[0]);
}

function read(supplier_id) {
  return db("suppliers").select("*").where({ supplier_id }).first();
}

function update(newSupplier) {
  return db("suppliers")
    .select("*")
    .where({ supplier_id: newSupplier.supplier_id })
    .update(newSupplier, "*")
    .then((rows) => rows[0]);
}

module.exports = {
  create,
  read,
  update,
};
