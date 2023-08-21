const { query } = require("../database/connection");

async function getAllHistoric() {
  try {
    const { rows } = await query("SELECT * FROM historic");

    return rows;
  } catch (error) {
    throw new Error("Error fetching all historic from the database");
  }
}

async function deleteItem({ id }) {
  try {
    const { rowCount } = await query(`DELETE FROM historic WHERE id=${id}`);

    return rowCount;
  } catch (error) {
    throw new Error("Error deleting a historic from the database");
  }
}

module.exports = {
  getAllHistoric,
  deleteItem,
};
