import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

import studentsModel from "../models/students.js"

import { config } from "../config.js"

const loginStudents = {}

loginStudents.LogIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim();
        password = password?.trim();

        if( !email || !password ){
            return res.status(404).json({ message: "Enviar todos los campos" })
        }

        const studentFound = await studentsModel.findOne({ email });
        if(!studentFound){
            return res.status(400).json({ message: "email not found" });
        }

        if(studentFound.timeOut && studentFound.timeOut > Date.now()){
            return res.status(404).json({ message: "email in timeOut" })
        }

        const isMatch = await bcrypt.compare(password, studentFound.password);
        if(!isMatch){
            studentFound.loginAttempts = (studentFound.loginAttempts || 0) + 1;

            if(studentFound.loginAttempts >= 5){
                studentFound.loginAttempts = 0;
                studentFound.timeOut = Date.now() + 5 * 60 * 1000

                await studentFound.saver();
                return res.status(404).json({ message: "Many login Attemps" })
            }

            await studentFound.save();
            return res.status(404).json({ message: "incorrect password" })
        }

        studentFound.loginAttempts = 0;
        studentFound.timeOut = null;
        await studentFound.save();

        const token = jsonwebtoken.sign(
            {id: studentFound._id, userType: "Student"},
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

export default loginStudents;