import { Router } from "express";
import { methods as AuthController } from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);
router.put("/edit/:id", AuthController.updateOneUser);
router.get("/users", AuthController.getAllUsers);
router.get("/user/:id", AuthController.getOneUser);
router.delete("/user/:id", AuthController.deleteOneUser);
export default router;