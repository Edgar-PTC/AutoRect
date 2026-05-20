import e from "express";
import homeworksController from "../controller/homeworksController.js"

const router = e.Router();

router.route("/")
.get(homeworksController.get)
.post(homeworksController.insert)

router.route("/:id")
.put(homeworksController.put)
.delete(homeworksController.delete)

export default router;