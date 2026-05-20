import mongoose from "mongoose";
import { config } from "./src/config.js";

mongoose.connect(config.db.URL);

const connection = mongoose.connection;

connection.once("open", () => { console.log("Conecction with the server") })

connection.on("disconnected", () => { console.log("server disconnected. Bye!") })

connection.on("errot", () => { console.log("Failed connection with the awesome server") })

export default connection;