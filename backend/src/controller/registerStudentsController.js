import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import StudentsModel from "../models/students.js"
import registerEmail from "../utils/registerEmail.js"

import { config } from "../config.js"
import { text } from "stream/consumers"
import { error } from "console"

const registerStudent = {}

registerStudent.insert = async(req, res) => {
    try {
        let { name, lastName, email, password, birthdate, phone, grade} = req.body;

        name = name?.trim()
        lastName = lastName?.trim()
        email= email?.trim()
        password= password?.trim()
        phone= phone?.trim()
        grade= grade?.trim()
        
        if(!name || !lastName || !email || !password || !phone || !grade){
            return res.status(400).json({ message: "Completar todos los campos" })
        }

        const studentExist = await StudentsModel.findOne({email})
        if(studentExist){
            return res.status(400).json({ message: "Email already in use" })
        }

        const passwordHash = await bcrypts.hash(password, 10);

        const newStudent = StudentsModel({name, lastName, email, password: passwordHash, birthdate, phone, grade, isVerified: false, loginAttempts: 0, timeOut: null})
        await newStudent.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.jwt.secret,
            {expiresIn: "15m"}
        )

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: `${verificationCode}. Ultimo Paso de registro`,
            html: registerEmail(verificationCode, name, lastName)
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error: " + error)
                return res.status(500).json({ message: "Internal Server error" })
            }

            return res.status(200).json({ message: "email sended" })
        })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

registerStudent.verifyCode = async(req, res) => {
    try {
        let { verificationCodeRequest } = req.body;

        const token = req.cookies.verificationTokenCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode: storedCode } = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({ message: "Code incorrect" })
        }

        const student = await StudentsModel.findOne({email})
        student.isVerified = true;
        await student.save();

        res.clearCookie("verificationTokenCookie")
        return res.status(200).json({ message: "email verified" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default registerStudent;