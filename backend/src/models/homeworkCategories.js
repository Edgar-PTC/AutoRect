/*
    categoryName
    description
    color
    isActive
*/

import { Schema, model } from "mongoose"

const homeworkCategoriesModel = new Schema({
    "categoryName": {
        type: String
    },
    "description": {
        type: String
    },
    "color": {
        type: String
    },
    "isActive": {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model("HomeworkCategories", homeworkCategoriesModel)