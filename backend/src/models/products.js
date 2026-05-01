import {Model, Schema, model } from "mongoose"

const ProductsSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Productos", ProductsSchema)