import { Router } from "express";
import {
  addItem,
  deleteItem,
  updateItem,
  getHistoric,
  getHistoricDetails,
} from "../controllers/historicController";

const routes = Router();

routes.get("/historic", getHistoric);
routes.delete("/historic/:id", deleteItem);
routes.put("/historic/:id", updateItem);
routes.post("/historic", addItem);
routes.get("/historic/details", getHistoricDetails);

export default routes;
