import e from "express";
import studenstController from "../controller/studentsController.js"

const router = e.Router();

router.route("/")
.get(studenstController.get)

router.route("/:id")
.put(studenstController.put)
.delete(studenstController.delete)

export default router;