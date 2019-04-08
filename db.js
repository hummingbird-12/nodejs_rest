"use strict";

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: process.env.PSQL_PORT
});

pool.connect((err, client, release) =>{
  if (err) {
    return console.error("Error acquiring client.", err.stack);
  }
  console.log("Successfully connected to PostgreSQL DB!");
  client.release();
});

module.exports = pool;
