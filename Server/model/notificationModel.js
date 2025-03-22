const mongoose = require("mongoose")

const roles = ["student", "faculty", "dsw", "principal", "hod"]

const notificationSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: roles
    },
    msg: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,

    },
    time: {
        type: Date,
        default: Date.now,

    }

}, { timestamps: true, collection: 'notification' })



//export the schema

module.exports = mongoose.model("Notification", notificationSchema)