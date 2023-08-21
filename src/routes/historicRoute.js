const express = require("express");
const routes = express.Router();
const historicController = require("../controllers/historicController");

routes.get("/historic", historicController.getHistoric);
routes.delete("/historic/:id", historicController.deleteItem);

module.exports = routes;
