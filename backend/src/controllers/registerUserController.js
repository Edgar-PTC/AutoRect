import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras

import users from "../models/users.js";
import HTMLRegister from "../utils/HTMLRegister.js"

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const RegisterUserController = [];

RegisterUserController.insertUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

RegisterUserController.verifyCode = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default RegisterUserController;