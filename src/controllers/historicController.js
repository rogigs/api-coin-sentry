const historicModel = require("../models/historicModel");

async function getHistoric(_, res) {
  try {
    const historic = await historicModel.getAllHistoric();

    if (!historic) {
      res.status(204).send({ status: 204, historic: [] });
    } else {
      res.json({ status: 200, historic });
    }
  } catch (error) {
    console.error("Error fetching all historic:", error);
    res.status(500).json({
      status: 500,
      error: "Error fetching all historic from the database",
    });
  }
}

async function deleteItem(req, res) {
  try {
    const id = req.params.id;
    const item = await historicModel.deleteItem({ id });
    const hasItem = item > 0;

    if (!hasItem) {
      res
        .status(404)
        .json({ error: "Error fetching item don't found from the database" });
    } else {
      res.json({ status: 200, message: "Sucesso ao deletar item" });
    }
  } catch (error) {
    console.error("Error deleting a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error deleting a historic from the database",
    });
  }
}

async function updateItem(req, res) {
  try {
    const item = await historicModel.updateItem({
      id: req.params.id,
      ...req.body,
    });
    const hasItem = item > 0;

    if (!hasItem) {
      res.status(404).json({
        status: 404,
        error: "Error fetching item don't found from the database",
      });
    } else {
      res.json({ status: 200, message: "Sucesso ao atualizar item" });
    }
  } catch (error) {
    console.error("Error updating a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error updating a historic from the database",
    });
  }
}

async function addItem(req, res) {
  try {
    const item = await historicModel.addItem({
      ...req.body,
    });

    res.json({ status: 200, message: "Sucesso ao adicionar item" });
  } catch (error) {
    console.error("Error updating a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error updating a historic from the database",
    });
  }
}

module.exports = {
  getHistoric,
  deleteItem,
  updateItem,
  addItem,
};
