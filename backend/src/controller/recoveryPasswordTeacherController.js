import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"
import Teachers from "../models/teachers.js"
import recoveryEmail from "../utils/recoveryEmail.js"

import { config } from "../config.js"

const recoveryPasswordTeacherController = {}

recoveryPasswordTeacherController.requestCode = async(req, res) => {
    try {
        let { email } = req.body;

        const teacherExist = await Teachers.findOne({email})
        if(!teacherExist){
            return res.status(400).json({ message: "Email not found" })
        }

        const recoveryCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {email, recoveryCode, verified: false},
            config.jwt.secret,
            {expiresIn: "15m"}
        )

        res.cookie("RecoveryTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000});

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
            subject: `${recoveryCode}. Proceso de recuperacion de contraseña`,
            html: recoveryEmail(recoveryCode)
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

recoveryPasswordTeacherController.verifyCode = async (req, res) => {
    try {
        let { CodeRequest } = req.body;
    
        const token = req.cookies.RecoveryTokenCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const email = decoded.email;
    
        if(CodeRequest !== decoded.recoveryCode){
            return res.status(400).json({ message: "Code incorrect" })
        }
    
        const newtoken = jsonwebtoken.sign(
            {email, recoveryCode, verified: true},
            config.jwt.secret,
            {expiresIn: "15m"}
        )
    
        res.cookie("RecoveryTokenCookie", newtoken, {maxAge: 15 * 60 * 1000});
    
        return res.status(200).json({ message: "Code correct. Next" })
        } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

recoveryPasswordTeacherController.newPassword = async (req, res) => {
    try {
        let { newpassword, confirmedpassword } = req.body;
    
        if(newpassword !== confirmedpassword){
            return res.status(400).json({ message: "Password different" })
        }
    
        const token = req.cookies.RecoveryTokenCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
    
        if(!decoded.verified){
            return res.status(400).json({ message: "Return to the verification" })
        }
    
        const passwordHash = await bcrypts.hash(newpassword, 10);
    
        await Teachers.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )
    
        res.clearCookie("RecoveryTokenCookie")
    
        return res.status(200).json({ message: "Password updated" });
        } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export default recoveryPasswordTeacherController;