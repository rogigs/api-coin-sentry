import { Router } from "express";
import * as User from "../controllers/user.controller";

const router = Router();

router.post("/user/auth", User.authUser);
router.post("/user/token", User.handleToken);
router.post("/user/logout", User.logoutUser);
router.post("/user/create-account", User.postUser);

export default router;
