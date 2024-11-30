import { Router } from "express";
import { methods as ProyectController } from "../controllers/proyect.controller.js";
const router = Router();


router.get("/allproyects", ProyectController.getAllProyects);
router.post("/", ProyectController.createNewProyect);

export default router;