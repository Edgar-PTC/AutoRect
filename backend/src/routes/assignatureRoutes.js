import e from "express";
import AssignaturesController from "../controller/assignaturesController.js";

const router = e.Router();

router.route("/")
.get(AssignaturesController.get)
.post(AssignaturesController.insert)

router.route("/:id")
.put(AssignaturesController.put)
.delete(AssignaturesController.delete)

export default router;