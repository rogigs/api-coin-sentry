const express = require("express");
const cors = require("cors");
const { query } = require("./database/connection");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/historic", async (_, res) => {
  try {
    const { rows } = await query("SELECT * FROM historic");

    if (rows.length === 0) {
      res.status(204).send();
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "Error fetching historic from the database" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
