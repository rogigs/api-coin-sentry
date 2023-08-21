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
  value_item,
  dateInput,
}) {
  try {
    // TODO: Verify type of date
    const { rowCount } = await query(`UPDATE historic
    SET title = '${title}',
      operation = '${operation}',
      category = '${category}',
      value_item = '${value_item}',
      date_input = '${dateInput}'  
      WHERE id = ${id}`);

    return rowCount;
  } catch (error) {
    throw new Error("Error updating a historic from the database");
  }
}

async function addItem({ title, operation, category, value_item, date_input }) {
  try {
    // TODO: Verify type of date
    const { rowCount } =
      await query(`INSERT INTO historic (title, operation, category, value_item, date_input) 
    VALUES(
      '${title}',
      '${operation}',
      '${category}',
      '${value_item}',
      '${date_input}'
      )`);

    return rowCount;
  } catch (error) {
    throw new Error("Error updating a historic from the database");
  }
}

async function getHistoricDetails() {
  try {
    const { rows } = await query(`SELECT 
      SUM(CASE WHEN operation = 'entrada' THEN value_item ELSE 0 END) AS entradaTotal,
      SUM(CASE WHEN operation = 'saída' THEN value_item ELSE 0 END) AS saidaTotal,
      SUM(value_item) AS total
    FROM historic
  `);

    return rows[0];
  } catch (error) {
    throw new Error("Error deleting a historic from the database");
  }
}

async function getItem({ id }) {
  try {
    const { rows } = await query(`SELECT * FROM historic WHERE id = ${id}`);

    return rows[0];
  } catch (error) {
    throw new Error("Error fetching item from the database");
  }
}

module.exports = {
  getAllHistoric,
  deleteItem,
  updateItem,
  addItem,
  getHistoricDetails,
  getItem,
};
