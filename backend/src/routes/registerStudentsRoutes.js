import e from "express";
import registerStudent from "../controller/registerStudentsController.js";

const router = e.Router();

router.route("/").post(registerStudent.insert)

router.route("/verifyCode").post(registerStudent.verifyCode)

export default router;