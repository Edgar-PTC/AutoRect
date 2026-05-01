import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    birtDate: {
        type: Date
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        enum: ["admin", "supervisor", "vendedor", "usuario"],
        default: "usuario",
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut: {
        type: Date
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Users", UserSchema);