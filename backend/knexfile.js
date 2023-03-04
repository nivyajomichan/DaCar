const pg = require("pg");
const path = require("path");
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
console.log("DB_URL", process.env.DATABASE_URL);
const config = {
  client: "pg",
  debug: !!+process.env.DEBUG_DATABASE,
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    max: 20,
  },
};

const knex = require("knex")(config);
module.exports = knex;
