import e from "express";
import RecoveryTeachers from "../controller/recoveryPasswordTeacherController.js"

const router = e.Router();

router.route("/requestCode").post(RecoveryTeachers.requestCode);
router.route("/verifyCode").post(RecoveryTeachers.verifyCode);
router.route("/newPassword").post(RecoveryTeachers.newPassword);

export default router;