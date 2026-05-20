import e from "express";
import homeworkCategoriesController from "../controller/homeworkCategoriesController.js"

const router = e.Router();

router.route("/")
.get(homeworkCategoriesController.get)
.post(homeworkCategoriesController.insert)

router.route("/:id")
.put(homeworkCategoriesController.put)
.delete(homeworkCategoriesController.delete)

export default router;