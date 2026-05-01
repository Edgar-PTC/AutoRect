import e from "express";
import registerUserController from "../controllers/registerUserController.js"

const router = e.Router();

router.route("/")
.post(registerUserController.insertUser)

router.route("/verifyCode")
.post(registerUserController.verifyCode)

export default router;