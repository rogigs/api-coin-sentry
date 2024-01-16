import { Router } from "express";
import * as Historic from "../controllers/historic.controller";

const router = Router();

router.get("/historic", Historic.getHistoric);
router.delete("/historic/:id", Historic.deleteItem);
router.put("/historic/:id", Historic.updateItem);
router.post("/historic", Historic.addItem);
router.get("/historic/details", Historic.getHistoricDetails);

export default router;
