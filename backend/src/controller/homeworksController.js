import express from "express"
import homeworksModel from "../models/homeworks.js"

const homeworksController  = {}

homeworksController.get = async (req, res) => {
    try {
        const get = await homeworksModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworksController.insert = async (req, res) => {
    try {
        let { title, description, dueDate, priority, status } = req.body;

        title = title?.trim();
        description = description?.trim();
        priority = priority?.trim();
        status = status?.trim();

        if(!title || !description || !priority || !status) {
            return res.status(404).json({ message: "Completar todos los campos" });
        }
        
        if(dueDate <= Date.now()){
            return res.status(404).json({ message: "Due Date invalid" });
        }
        
        const newHomework = homeworksModel({ title, description, dueDate, priority, status })
        await newHomework.save();

        return res.status(404).json({ message: "homework saved" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworksController.put = async (req, res) => {
    try {
        let { title, description, dueDate, priority, status } = req.body;

        title = title?.trim();
        description = description?.trim();
        priority = priority?.trim();
        status = status?.trim();

        if(!title || !description || !priority || !status) {
            return res.status(404).json({ message: "Completar todos los campos" });
        }
        
        if(dueDate <= Date.now()){
            return res.status(404).json({ message: "Due Date invalid" });
        }

        const updateHomework = await homeworksModel.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, status }, { new: true });
        
        if(!updateHomework){
            return res.status(404).json({ message: "Homework not found" })
        }
        
        return res.status(200).json({ message: "Homework updated" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

homeworksController.delete = async (req, res) => {
    try {
        const deleteHomework = await homeworksModel.findByIdAndDelete(req.params.id)
        if(!deleteHomework){
            return res.status(400).json({ message: "Homework not founded" })
        }

        return res.status(200).json({ message: "Homework deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default homeworksController;