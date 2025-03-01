const express = require("express");



//get data from the client 
//chk in the mongodb if username not exists
//save in the db
const signup = async (req, res) => {

    try {
        const { fullname, username, password, role } = req.body;
        console.log(fullname, username, password, role)
        
        //chk whether the username exists on db
        const existingUser = await USER.findOne({ username: username })

        //if the user already exists on the db

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // Create new user
        const newUser = new USER({ name: fullname, username: username, password: password, role: role });
        await newUser.save();

        res.status(201).json({ message: "Signup successful" });



    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = { signup }
