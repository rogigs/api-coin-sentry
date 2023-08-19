const express = require("express");
const routes = express.Router();
const historicController = require("../controllers/historicController");

routes.get("/historic", historicController.getHistoric);

module.exports = routes;
