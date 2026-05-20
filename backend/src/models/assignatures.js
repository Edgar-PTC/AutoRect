/*
    subjectName
    teacher_id
    isAvailable
*/

import mongoose, { Schema, model } from "mongoose"

const assignaturesModel = new Schema({
    subjectName: {
        type: String
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: "Teachers"
    },
    isAvailable: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Assignatures", assignaturesModel)