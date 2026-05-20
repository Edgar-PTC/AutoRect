import e from "express";
import loginTeachers from "../controller/logInTeachersController.js";

const router = e.Router();

router.route("/").post(loginTeachers.LogIn)

export default router;