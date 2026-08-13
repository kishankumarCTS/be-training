const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blogs",
  password: "toor",
  port: 5432,
});

module.exports = pool;
