// ENV is either the currect Environment or it's development
const env = process.env.NODE_ENV || "development";

// knexfile["development"] same as knexfile.development
const config = require("../../knexfile")[env];

// Initializes a knew instance with the above defined config
const knex = require("knex")(config);

module.exports = knex;
