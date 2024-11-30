import { Router } from "express";
import { methods as TripController } from "../controllers/trips.controller.js";
//const {validateCreateTrip} = require('../validators/Trip.validator')
const router = Router();

router.get("/", TripController.getAllTrips);
router.get("/:id", TripController.getOneTrip);
router.post("/", /*validateCreateTrip,*/ TripController.createNewTrip);
router.put("/:id", /*validateCreateTrip,*/ TripController.updateOneTrip);
router.get("/pdf/:id", TripController.getOnePDF);

export default router;