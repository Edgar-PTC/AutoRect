import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

import teacherModel from "../models/teachers.js"

import { config } from "../config.js"

const loginTeachers = {}

loginTeachers.LogIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim();
        password = password?.trim();

        if( !email || !password ){
            return res.status(404).json({ message: "Enviar todos los campos" })
        }

        const teacherFound = await teacherModel.findOne({ email });
        if(!teacherFound){
            return res.status(400).json({ message: "email not found" });
        }

        if(teacherFound.timeOut && teacherFound.timeOut > Date.now()){
            return res.status(404).json({ message: "email in timeOut" })
        }

        const isMatch = await bcrypt.compare(password, teacherFound.password);
        if(!isMatch){
            teacherFound.loginAttempts = (teacherFound.loginAttempts || 0) + 1;

            if(teacherFound.loginAttempts >= 5){
                teacherFound.loginAttempts = 0;
                teacherFound.timeOut = Date.now() + 5 * 60 * 1000

                await teacherFound.save();
                return res.status(404).json({ message: "Many login Attemps" })
            }

            await teacherFound.save();
            return res.status(404).json({ message: "incorrect password" })
        }

        teacherFound.loginAttempts = 0;
        teacherFound.timeOut = null;
        await teacherFound.save();

        const token = jsonwebtoken.sign(
            {id: teacherFound._id, userType: "teacher"},
            config.jwt.secret,
            {expiresIn: "10d"}
        )
        
        res.cookie("authCookie", token);

        return res.status(200).json({ message: "Correct password" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default loginTeachers;