const mongoose = require("mongoose")

const roles = ["student", "faculty", "dsw", "principal", "hod","admin"]

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
         select: false
    },
    role: {
        type: String,
        enum: roles,
        required: true
    }

}, { timestamps: true, collection: 'users' })



//export the schema

module.exports = mongoose.model("User", userSchema)