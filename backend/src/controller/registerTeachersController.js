import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import TeachersModel from "../models/teachers.js"
import registerEmail from "../utils/registerEmail.js"

import { config } from "../config.js"
import { text } from "stream/consumers"
import { error } from "console"

const registerTeachers = {}

registerTeachers.insert = async(req, res) => {
    try {
        let { name, lastName, email, password, phone, speciality} = req.body;

        name = name?.trim()
        lastName = lastName?.trim()
        email= email?.trim()
        password= password?.trim()
        phone= phone?.trim()
        speciality= speciality?.trim()
        
        if(!name || !lastName || !email || !password || !phone || !speciality){
            return res.status(400).json({ message: "Completar todos los campos" })
        }

        const teacherExist = await TeachersModel.findOne({email})
        if(teacherExist){
            return res.status(400).json({ message: "Email already in use" })
        }

        const passwordHash = await bcrypts.hash(password, 10);

        const newTeacher = TeachersModel({name, lastName, email, password: passwordHash, phone, speciality, isActive: true, isVerified: false, loginAttempts: 0, timeOut: null})
        await newTeacher.save();

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
        
    }
}

registerTeachers.verifyCode = async(req, res) => {
    try {
        let { verificationCodeRequest } = req.body;
        
        const token = req.cookies.verificationTokenCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode: storedCode } = decoded;
        
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({ message: "Code incorrect" })
        }
        
        const teacher = await TeachersModel.findOne({email})
        teacher.isVerified = true;
        await teacher.save();
        
        res.clearCookie("verificationTokenCookie")
        return res.status(200).json({ message: "email verified" })
    } catch (error) {
        
    }
}

export default registerTeachers;