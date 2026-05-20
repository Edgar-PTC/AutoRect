import e from "express";
import registerTeachers from "../controller/registerTeachersController.js";

const router = e.Router();

router.route("/").post(registerTeachers.insert)

router.route("/verifyCode").post(registerTeachers.verifyCode)

export default router;