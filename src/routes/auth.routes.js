import { Router } from "express";
import { methods as AuthController } from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", AuthController.loginUser);

export default router;