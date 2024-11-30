import { Router } from "express";
import { methods as InfoController } from "../controllers/info.controller.js";
const router = Router();

router.get("/jobs", InfoController.getAllJobs);
router.get("/vehicles", InfoController.getAllStatusForVehicles);
router.get("/persons", InfoController.getAllStatusForPersons);
router.get("/request", InfoController.getAllStatusForRequest);
router.get("/trips", InfoController.getAllStatusForTrips);
router.get("/types", InfoController.getAllTypes);
router.get("/roles", InfoController.getAllRoles);

export default router;