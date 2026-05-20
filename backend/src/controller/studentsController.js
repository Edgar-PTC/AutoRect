import express from "express"
import studentsModel from "../models/students.js"

const studentsController  = {}

studentsController.get = async (req, res) => {
    try {
        const get = await studentsModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

studentsController.put = async (req, res) => {
    try {
        let { name, lastName, email, birthdate, phone, grade } = req.body;

        name = name?.trim()
        lastName = lastName?.trim()
        email= email?.trim()
        phone= phone?.trim()
        grade= grade?.trim()
        
        if(!name || !lastName || !email || !phone || !grade){
            return res.status(400).json({ message: "Completar todos los campos" })
        }

        const updatedStudent = await studentsModel.findByIdAndUpdate(req.params.id, { name, lastName, email, birthdate, phone, grade }, { new: true })

        if(!updatedStudent){
            return res.status(404).json({ message: "Student not found" })
        }
        
        return res.status(200).json({ message: "Student updated" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

studentsController.delete = async (req, res) => {
    try {
        const deleteStudent = await studentsModel.findByIdAndDelete(req.params.id)
        if(!deleteStudent){
            return res.status(400).json({ message: "Student not founded" })
        }
        
        return res.status(200).json({ message: "Student deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default studentsController;