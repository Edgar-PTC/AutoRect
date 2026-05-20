import e from "express";
import logOutController from "../controller/LogOutController.js";

const router = e.Router();

router.route("/").post(logOutController.logOut)

export default router;