import { Router } from "express";
import { methods as VouchersController } from "../controllers/voucher.controller.js";
//import checkToken from "../middlewares/auth.js";
//import checkRole from "../middlewares/roleAuth.js";
const router = Router();

router.get("/diesel/", VouchersController.getAllVouchersDiesel);
router.get("/regular/", VouchersController.getAllVouchersRegular);
router.get("/diesel/:id", VouchersController.getOneVoucherDiesel);
router.get("/regular/:id", VouchersController.getOneVoucherRegular);
router.post("/diesel/", VouchersController.createNewVoucherDiesel);
router.post("/regular/", VouchersController.createNewVoucherRegular);
router.put("/:id", VouchersController.updateOneVoucher);
router.delete("/:id", VouchersController.deleteOneVoucher);

export default router;