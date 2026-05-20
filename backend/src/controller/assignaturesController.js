import express from "express"
import AssignaturesModel from "../models/assignatures.js"

const AssignaturesController  = {}

AssignaturesController.get = async (req, res) => {
    try {
        const get = await AssignaturesModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

AssignaturesController.insert = async (req, res) => {
    try {
        let { subjectName, teacher_id, isAvailable } = req.body;

        //Validaciones
        subjectName = subjectName?.trim();
        teacher_id = teacher_id?.trim();

        if( !subjectName || !teacher_id ){
            return res.status(404).json({ message: "Completar todos los campos" });
        }

        const newAssignature = AssignaturesModel({ subjectName, teacher_id, isAvailable: isAvailable || true })
        await newAssignature.save();

        return res.status(200).json({ message: "Assignature saved" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

AssignaturesController.put = async (req, res) => {
    try {
        let { subjectName, teacher_id, isAvailable } = req.body;

        //Validaciones
        subjectName = subjectName?.trim();
        teacher_id = teacher_id?.trim();

        if( !subjectName || !teacher_id ){
            return res.status(404).json({ message: "Completar todos los campos" });
        }

        const updateAssignature = await AssignaturesModel.findByIdAndUpdate(req.params.id, { subjectName, teacher_id, isAvailable }, { new: true })

        if(!updateAssignature){
            return res.status(404).json({ message: "Assignature not found" })
        }
        
        return res.status(200).json({ message: "Assignature updated" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

AssignaturesController.delete = async (req, res) => {
    try {
        const deleteAssignature = await AssignaturesModel.findByIdAndDelete(req.params.id)
        if(!deleteAssignature){
            return res.status(400).json({ message: "Assignature not founded" })
        }

        return res.status(200).json({ message: "Assignature deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default AssignaturesController;