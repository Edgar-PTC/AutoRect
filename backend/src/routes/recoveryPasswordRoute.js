import e from "express";
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

const router = e.Router();

router.route("/sendEmail")
.post(recoveryPasswordController.sendEmail)

router.route("/verifyCode")
.post(recoveryPasswordController.verifyCode)

router.route("/updatePassword")
.post(recoveryPasswordController.updatePassword)

export default router;