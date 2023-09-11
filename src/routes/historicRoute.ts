import { Router } from "express";

const routes = Router();
const historicController = require("../controllers/historicController");

routes.get("/historic", historicController.getHistoric);
routes.delete("/historic/:id", historicController.deleteItem);
routes.put("/historic/:id", historicController.updateItem);
routes.post("/historic", historicController.addItem);
routes.get("/historic/details", historicController.getHistoricDetails);

module.exports = routes;
