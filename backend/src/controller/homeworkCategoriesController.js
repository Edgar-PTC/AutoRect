import express from "express"
import homeworkCategoriesModel from "../models/homeworkCategories.js"

const homeworkCategoriesController  = {}

homeworkCategoriesController.get = async (req, res) => {
    try {
        const get = await homeworkCategoriesModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworkCategoriesController.insert = async (req, res) => {
    try {
        let { categoryName, description, color } = req.body;

        categoryName = categoryName?.trim();
        description = description?.trim();
        color = color?.trim();

        if( !categoryName || !description || !color){
            return res.status(404).json({ message: "Completar todos los campos" });
        }

        const newCategory = homeworkCategoriesModel({ categoryName, description, color, isActive: true});
        await newCategory.save();
        
        return res.status(200).json({ message: "Category saved" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworkCategoriesController.put = async (req, res) => {
    try {
        let { categoryName, description, color, isActive } = req.body;

        categoryName = categoryName?.trim();
        description = description?.trim();
        color = color?.trim();

        if( !categoryName || !description || !color){
            return res.status(404).json({ message: "Completar todos los campos" });
        }

        const updateCategory = await homeworkCategoriesModel.findByIdAndUpdate(req.params.id, { categoryName, description, color, isActive }, { new: true })

        if(!updateCategory){
            return res.status(404).json({ message: "Category not found" })
        }
        
        return res.status(200).json({ message: "Category updated" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworkCategoriesController.delete = async (req, res) => {
    try {
        const deleteCategory = await homeworkCategoriesModel.findByIdAndDelete(req.params.id)
        if(!deleteCategory){
            return res.status(400).json({ message: "Category not founded" })
        }

        return res.status(200).json({ message: "Category deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default homeworkCategoriesController;