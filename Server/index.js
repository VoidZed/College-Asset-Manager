require("dotenv").config(); // Load .env variables
const express = require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const formRoutes=require("./routes/formRoutes")
const dataRoutes=require("./routes/dataRoutes")
const adminRoutes=require("./routes/adminRoutes")
const cookieParser = require('cookie-parser');
const helmet=require("helmet")
app = express();


app.use(helmet())

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

// data routes
app.use("/api", dataRoutes);

// admin routes
app.use("/api/admin", adminRoutes);



///port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on PORT:${PORT}`);

})

