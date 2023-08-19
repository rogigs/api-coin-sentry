const { query } = require("../database/connection");

async function getAllHistoric() {
  try {
    const { rows } = await query("SELECT * FROM historic");

    return rows;
  } catch (error) {
    throw new Error("Error fetching historic from the database");
  }
}

module.exports = {
  getAllHistoric,
};
