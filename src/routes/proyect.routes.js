import { Router } from "express";
import { methods as ProyectController } from "../controllers/proyect.controller.js";
const {validateCreateProyect} = require('../validators/proyect.validator.js')
const router = Router();


router.get("/allproyects", ProyectController.getAllProyects);
router.post("/", validateCreateProyect, ProyectController.createNewProyect);

export default router;