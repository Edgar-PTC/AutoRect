import products from "../models/products.js";

const productsController = [];

productsController.getProducto = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.insertProducto = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.deleteProducto = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.updateProducto = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default productsController;