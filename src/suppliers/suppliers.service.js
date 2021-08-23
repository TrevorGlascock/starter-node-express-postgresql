const db = require("../db/connection");

function create(supplier) {
  return db("suppliers")
    .insert(supplier)
    .returning("*")
    .then((rows) => rows[0]); // Returning cannot use first() so it must be written out
}

function read(supplier_id) {
  return db("suppliers").select("*").where({ supplier_id }).first(); // select only version of then((rows) => rows[0]);
}

function update(newSupplier) {
  return db("suppliers")
    .select("*")
    .where({ supplier_id: newSupplier.supplier_id })
    .update(newSupplier, "*")
    .then((rows) => rows[0]); // update cannot use first() so it must be written out
}

module.exports = {
  create,
  read,
  update,
};
