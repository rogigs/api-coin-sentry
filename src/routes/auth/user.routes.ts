import { Router } from "express";
import * as User from "../../controllers/user.controller";

const router = Router();

router.get("/user/me", User.getUser);

export default router;
