
const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


//model
const USER = require("../model/user")




//get data from the client 
//chk in the mongodb if username not exists
//hash the password
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

        //hash the password 
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new USER({ name: fullname, username: username, password: hashedPassword, role: role });
        await newUser.save();

        res.status(201).json({ message: "Signup successful" });



    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error });
    }
}




//chk if username exists on the db
//chk if password is correct
//generate token 
//set token in http cookie

const login = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log(username, password, role)
        //check if username exists
        const existingUser = await USER.findOne({ username: username }).select("+password")
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        console.log(existingUser)
        //check if password is correct
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        console.log(isValidPassword)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }


        // Generate JWT token
        const token = await jwt.sign(
            { userId: existingUser._id, name: existingUser.name, username: existingUser.username, role: existingUser.role },

            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set the token in an HTTP-only cookie
        await res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
            sameSite: "Strict", // Prevents CSRF attacks
            maxAge: 1 * 60 * 60 * 1000, // Cookie expires in 1 hour
        });

        const returnData = {
            user: existingUser.name,
            role: existingUser.role
        }

        res.status(200).json({ message: "Login successful", data: returnData });



    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error });
    }
}



const logout = async (req, res) => {
    try {
        console.log("Logged Out")
        await res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}



//this validates the session of the user during any request
// chk the token 
//decode the token
//if the token is expired logout 
//if not return original data to refresh the state to avoid changes from the client side in the localstorage
const validateSession = async (req, res) => {
    try {
        // get the token
        const token = req.cookies.token
        console.log("token", token)
        if (!token) {
            return res.status(401).json({ message: "No token provided, User not authenticated", isValid: false });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token", isValid: false });
            }
            console.log(decoded)

            res.status(200).json({ message: "User authenticated", isValid: true, data: { user: decoded.name, role: decoded.role } });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}

module.exports = { signup, login, logout, validateSession}

