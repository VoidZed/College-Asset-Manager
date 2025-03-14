const express = require("express");
const USERS = require("../model/user")
const ADMIN = require("../model/adminSettingsModel")

const { formModel } = require('./formController')



const getUsers = async (req, res) => {
    try {
        // verify the role as admin
        console.log("get users ")

        const users = await USERS.find({}, { password: false, createdAt: false, updatedAt: false })
        // return the data
        res.json({ data: users })

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}


const email = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        // chk if both contain data
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // chk if the email is already registered with the system 
        //then update the email and password
        const updatedEmail = await ADMIN.findOneAndUpdate({}, { $set: { 'emailSettings.email': email, 'emailSettings.appPassword': password } }, { upsert: true, new: true });


        console.log("Updated Settings: ",updatedEmail)
        //return the response with status
        res.status(201).json({ message: "Email settings updated successfully",data:updatedEmail.emailSettings });


    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}


module.exports = { getUsers, email }