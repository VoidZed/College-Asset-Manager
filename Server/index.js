require("dotenv").config(); // Load .env variables
const express = require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const formRoutes=require("./routes/formRoutes")
const cookieParser = require('cookie-parser');

app = express();

//parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//connect to database
connectDb();


// auth routes
app.use("/api/auth", authRoutes);

// form routes

app.use("/api", formRoutes);






///port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on PORT:${PORT}`);

})

