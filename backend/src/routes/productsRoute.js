import e from "express"
import productsController from "../controllers/productsController.js"

const router = e.Router();

router.route("/")
.get(productsController.get)
.post(productsController.insertProducto)

router.route("/:id")
.delete(productsController.deleteProducto)
.put(productsController.updateProducto)

export default router;