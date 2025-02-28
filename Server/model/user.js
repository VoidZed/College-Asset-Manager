const mongoose = require("mongoose")

const roles = ["student", "faculty", "dsw", "principal", "hod"]

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        required: true
    }

}, { timestamps: true ,collection:'users'})



//export the schema

module.exports=mongoose.model("User",userSchema)