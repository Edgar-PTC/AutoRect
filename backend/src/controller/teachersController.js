import express from "express"
import teachersModel from "../models/teachers.js"

const teachersController  = {}

teachersController.get = async (req, res) => {
    try {
        const get = await teachersModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

teachersController.put = async (req, res) => {
    try {
        let { name, lastName, email, phone, speciality, isActive} = req.body;

        name = name?.trim()
        lastName = lastName?.trim()
        email= email?.trim()
        phone= phone?.trim()
        speciality= speciality?.trim()
        
        if(!name || !lastName || !email || !phone || !speciality){
            return res.status(400).json({ message: "Completar todos los campos" })
        }

        const updateTeacher = await teachersModel.findByIdAndUpdate(req.params.id, { name, lastName, email, phone, speciality, isActive}, { new: true })

        if(!updateTeacher){
            return res.status(404).json({ message: "Teacher not found" })
        }
        
        return res.status(200).json({ message: "Teacher updated" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

teachersController.delete = async (req, res) => {
    try {
        const deleteTeacher = await teachersModel.findByIdAndDelete(req.params.id)
        if(!deleteTeacher){
            return res.status(400).json({ message: "Teacher not founded" })
        }
        
        return res.status(200).json({ message: "Teacher deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default teachersController;