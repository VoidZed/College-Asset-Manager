const mongoose =require("mongoose");

const AdminSettingsSchema = new mongoose.Schema({
    emailSettings: {
        email: { type: String, required: false },
        appPassword: { type: String, required: false }
    }
},{collection:'admin'})


module.exports = mongoose.model("Admin", AdminSettingsSchema)