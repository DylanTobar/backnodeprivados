import { Router } from "express";
import { methods as VehiclesController } from "../controllers/vehicles.controller.js";
//import checkToken from "../middlewares/auth.js";
//import checkRole from "../middlewares/roleAuth.js";
const {validateCreateVehicle} = require('../validators/vehicles.validator')
const router = Router();

router.get("/", VehiclesController.getAllVehicles);
router.post("/active/", VehiclesController.getAllVehiclesActives);
router.get("/:id", VehiclesController.getOneVehicle);
router.get("/voucher/:id", VehiclesController.getOneVehicleForVoucher);
router.post("/", validateCreateVehicle, VehiclesController.createNewVehicle);
router.put("/:id", validateCreateVehicle, VehiclesController.updateOneVehicle);
router.delete("/:id", VehiclesController.deleteOneVehicle);

export default router;