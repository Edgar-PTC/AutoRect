import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import users from "../models/users.js";

import { config } from "../config.js";

const logInController = [];

logInController.login = async(req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default logInController;