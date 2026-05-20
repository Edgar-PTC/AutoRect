import e from "express";
import loginStudents from "../controller/logInStudentsController.js";

const router = e.Router();

router.route("/").post(loginStudents.LogIn)

export default router;