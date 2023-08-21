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

async function updateItem({
  id,
  title,
  operation,
  category,
  valueItem,
  dateInput,
}) {
  try {
    // TODO: Verify type of date
    const { rowCount } = await query(`UPDATE historic
      SET title = '${title}',
        operation = '${operation}',
        category = '${category}',
        value_item = '${valueItem}',
        date_input = '${dateInput}'  /
        WHERE id = ${id};`);

    return rowCount;
  } catch (error) {
    throw new Error("Error updating a historic from the database");
  }
}

module.exports = {
  getAllHistoric,
  deleteItem,
  updateItem,
};
