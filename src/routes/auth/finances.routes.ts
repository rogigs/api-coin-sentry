import { Router } from "express";
import * as FinancesController from "../../controllers/finances.controller";

const router = Router();

router.post("/finances", FinancesController.postFinance);

router.get("/finances", FinancesController.getFinances);
router.get("/finances/details", FinancesController.getSumFinances);

router.delete("/finances/:id", FinancesController.deleteFinance);

router.put("/finances/:id", FinancesController.putFinanceById);

export default router;
