import { Router } from "express";
import * as User from "../controllers/user.controller";

const router = Router();

router.get("/user/me", User.getUser);
router.post("/user/me", User.createUser);

export default router;
