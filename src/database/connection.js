var Pool = require("pg-pool");

require("dotenv").config();

let connection;
const dbConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  ssl: true,
};

async function getDatabaseConnection() {
  if (!connection) {
    let pool = new Pool(dbConfig);
    let client = await pool.connect();

    console.log("Hire a");

    return client;
  }

  console.log("Hire");

  return connection;
}

async function query(sql, values) {
  const conn = await getDatabaseConnection();

  try {
    if (!conn) {
      throw new Error("Could not connect to the database");
    }

    const res = await conn.query(sql, values);
    return res;
  } catch (error) {
    console.error("Error executing query:", error);
    return error;
  } finally {
    if (con) {
      conn.release();
    }
  }
}

module.exports = {
  query,
};
