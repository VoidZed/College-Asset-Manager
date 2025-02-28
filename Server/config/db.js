require("dotenv").config(); // Load .env variables
const mongoose = require('mongoose');


const connectDb=async()=>{
    try {
        //connect to database
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected');
    } catch (error) {
        console.error("Database Connection Error:",error)
    }
}

module.exports=connectDb;

