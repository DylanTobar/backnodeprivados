import { Router } from "express";
import { methods as RequestController } from "../controllers/exteriorRequest.controller.js";
//const { validateCreateRequest } = require('../validators/person.validator')
const router = Router();

router.get("/", RequestController.getAllRequests);
router.get("/:id", RequestController.getOneRequest);
router.post("/", /*validateCreateRequest,*/ RequestController.createNewRequest);
router.put("/edit/:id", RequestController.updateOneRequest);

export default router;