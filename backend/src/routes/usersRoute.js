import e from "express";
import usersController from "../controllers/usersController.js"

const router = e.Router();

router.route("/")
.get(usersController.getUser)

router.route("/:id")
.delete(usersController.deleteUser)
.put(usersController.updateUser)

export default router;