const express = require("express");
const cors = require("cors");
require("dotenv").config();
var Pool = require("pg-pool");

const app = express();

app.use(express.json());
app.use(cors());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const dbConfig = {
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  host: PGHOST,
  ssl: true,
};

app.get("/historic", async (req, res) => {
  let pool = new Pool(dbConfig);
  let client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM historic");
    res.json(result);
  } catch (e) {
    console.error(e.message, e.stack);
    res.status(500).json({ error: "Erro ao obter os dados" });
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
