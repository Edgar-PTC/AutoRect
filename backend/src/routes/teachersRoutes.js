import e from "express";
import teachersController from "../controller/teachersController.js"

const router = e.Router();

router.route("/")
.get(teachersController.get)

router.route("/:id")
.put(teachersController.put)
.delete(teachersController.delete)

export default router;