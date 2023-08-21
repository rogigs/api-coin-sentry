const express = require("express");
const routes = express.Router();
const historicController = require("../controllers/historicController");

routes.get("/historic", historicController.getHistoric);
routes.delete("/historic/:id", historicController.deleteItem);
routes.put("/historic/:id", historicController.updateItem); // TODO: Change method when implement ORM
routes.post("/historic", historicController.addItem);

module.exports = routes;
