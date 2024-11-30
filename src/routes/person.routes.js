import { Router } from "express";
import { methods as PersonController } from "../controllers/person.controller.js";
const {validateCreatePerson} = require('../validators/person.validator.js')
const router = Router();

router.get("/", PersonController.getAllPersons);
router.get("/pilots/", PersonController.getAllPilots);
router.post("/pilotsActives/", PersonController.getAllPilotsActives);
router.get("/:id", PersonController.getOnePerson);
router.post("/", validateCreatePerson, PersonController.createNewPerson);
router.put("/:id", validateCreatePerson, PersonController.updateOnePerson);
router.delete("/:id", PersonController.deleteOnePerson);

export default router;