import { Router } from "express";
import { methods as DepartmentController } from "../controllers/department.controller.js";
//const { validateCreateRequest } = require('../validators/person.validator')
const router = Router();

router.get("/", DepartmentController.getAllDepartments);
router.get("/:id", DepartmentController.getOneDepartment);

export default router;