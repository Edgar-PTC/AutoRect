import e from "express"
import logInController from "../controllers/logInController.js"

const router = e.Router();

router.route("/")
.post(logInController.login)

export default router;