const express = require("express");
const USERS = require("../model/user")

const { formModel } = require('./formController')



const getUsers = async (req, res) => {
    try {
        // verify the role as admin
        console.log("get users ")

        const users = await USERS.find({}, { password: false,createdAt:false,updatedAt:false })
        // return the data
        res.json({data:users})

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}


module.exports = { getUsers }