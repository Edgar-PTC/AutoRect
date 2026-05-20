import e from "express";
import RecoveryStudent from "../controller/recoveryPasswordStudentsController.js"

const router = e.Router();

router.route("/requestCode").post(RecoveryStudent.requestCode);
router.route("/verifyCode").post(RecoveryStudent.verifyCode);
router.route("/newPassword").post(RecoveryStudent.newPassword);

export default router;