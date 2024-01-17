import { Router } from "express";
import * as FinancesController from "../../controllers/finances.controller";

const router = Router();

router.get("/finances", FinancesController.getFinances);
router.delete("/finances/:id", FinancesController.deleteFinance);
router.put("/finances/:id", FinancesController.putFinanceById);
router.post("/finances", FinancesController.postFinance);
router.get("/finances/details", FinancesController.getSumFinances);

export default router;
