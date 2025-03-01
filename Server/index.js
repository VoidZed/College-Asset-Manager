require("dotenv").config(); // Load .env variables
const express = require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")


app = express();

//parse json data
app.use(express.json())

//connect to database
connectDb();


// auth routes
// Routes
app.use("/api/auth", authRoutes);






///port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on PORT:${PORT}`);

})

