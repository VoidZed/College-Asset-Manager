
const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const nodemailer = require('nodemailer');

//model
const USER = require("../model/user")
const ADMIN = require("../model/adminSettingsModel")



// cloudinary config file 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});









const cloud_sign = async (req, res) => {
    try {

        const { folder, timestamp } = await req.body;
        console.log(folder, timestamp)

        const signature = cloudinary.utils.api_sign_request(
            { folder, timestamp, type: "upload" },
            process.env.CLOUDINARY_API_SECRET
        );

        res.json({ signature, timestamp, folder, cloud_name: cloudinary.config().cloud_name, api_key: cloudinary.config().api_key });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error });
    }
}




// Cloudflare Turnstile Verification
const verifyTurnstile = async (token) => {
    try {
        const response = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: token
            })
        );
        console.log("Turnstile:", response)
        return response.data.success;
    } catch (error) {
        return false;
    }
};




//function for sending the account confirmation mail


async function sendAccountCreationEmail(userDetails) {
    try {


        //get college mail data

        const college = await ADMIN.findOne({})

        // Extract user details
        const { email, fullName } = await userDetails;

        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Can be another service like 'outlook', 'yahoo', etc.
            auth: {
                user: college.emailSettings.email,
                pass: college.emailSettings.appPassword // Use app password if 2FA is enabled
            }
        });

        // HTML email template with better formatting
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eeeeee;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            padding: 10px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #eeeeee;
          }
          .content {
            padding: 20px;
          }
        
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Account Successfully Created</h2>
          </div>
          <div class="content">
            <p>Hello ${fullName},</p>
            
            <p>Your account has been successfully created. Welcome to our platform!</p>
            
            <p>You can now access all of our services by logging in with your email and password.</p>
            
            <div style="text-align: center;">
              <a style="text-decoration:none;" href="https://your-website.com/login" class="button">Login to Your Account</a>
            </div>
            
          <p>Thank you for joining us!</p>
            
            <p>Best regards,<br>The Team</p>
          </div>
        
        </div>
      </body>
      </html>
      `;

        // Plain text alternative for email clients that don't support HTML
        const textContent = `
      Hello ${fullName},
      
      Your account has been successfully created. Welcome to our platform!
      
        
      Best regards,
      The Team
      `;

        // Define email options
        const mailOptions = {
            from: `"SRMS CET" <${college.emailSettings.email}>`,
            to: email,
            subject: 'Welcome - Your Account Has Been Created',
            text: textContent,
            html: htmlContent
        };

        // Send the email and await the result
        const info = await transporter.sendMail(mailOptions);

        console.log('Account creation email sent successfully!');
        console.log('Message ID:', info.messageId);

        return info;
    } catch (error) {
        console.error('Error sending account creation email:', error);
        throw error;
    }
}





//get data from the client 
//chk in the mongodb if email not exists
//hash the password
//save in the db
const signup = async (req, res) => {

    try {
        const { fullname, email, password, role, turn_token } = req.body;
        console.log(fullname, email, password, role)

        if (!await verifyTurnstile(turn_token)) {
            return res.status(400).json({ message: "Turnstile verification failed" });
        }

        //chk whether the email exists on db
        const existingUser = await USER.findOne({ email: email })

        //if the user already exists on the db

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //hash the password 
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new USER({ name: fullname, email: email, password: hashedPassword, role: role });
        await newUser.save();

        // send account creation email 
       // await sendAccountCreationEmail({ email: email, fullName: fullname })

        res.status(201).json({ message: "Signup successful" });



    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error });
    }
}








//chk if email exists on the db
//chk if password is correct
//generate token 
//set token in http cookie

const login = async (req, res) => {
    try {
        const { email, password, role, turn_token } = req.body;
        console.log(email, password, role)


        if (!await verifyTurnstile(turn_token)) {
            return res.status(400).json({ message: "Turnstile verification failed" });
        }

        //check if email exists
        const existingUser = await USER.findOne({ email: email }).select("+password")
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        console.log(existingUser)
        //check if password is correct
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        console.log(isValidPassword)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check if the role is correct
        if (existingUser.role !== role) {
            return res.status(400).json({ message: "Invalid role" });
        }


        // Generate JWT token
        const token = await jwt.sign(
            { userId: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role },

            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set the token in an HTTP-only cookie
        await res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV !== "production", // Ensures secure cookies in production
            sameSite: "Strict", // Prevents CSRF attacks
            maxAge: 1 * 60 * 60 * 1000, // Cookie expires in 1 hour
        });

        const returnData = {
            userId: existingUser._id,
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
        console.log("validate session token", token)
        if (!token) {
            return res.status(401).json({ message: "No token provided, User not authenticated", isValid: false });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token", isValid: false });
            }
            console.log(decoded)

            res.status(200).json({ message: "User authenticated", isValid: true, data: {userId:decoded.userId, user: decoded.name, role: decoded.role } });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}

module.exports = { signup, login, logout, validateSession, cloud_sign }

