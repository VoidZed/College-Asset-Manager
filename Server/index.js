require("dotenv").config(); // Load .env variables
const express = require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const formRoutes = require("./routes/formRoutes")
const dataRoutes = require("./routes/dataRoutes")
const adminRoutes = require("./routes/adminRoutes")
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express(); // Fixed variable declaration with 'const'

// Create an HTTP server
const server = http.createServer(app);

//parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//connect to database
connectDb();

app.use(cors({
  origin: "http://localhost:5173", // Specify the exact origin
  credentials: true // Allow cookies to be sent
}));

// Create Socket.IO server with CORS settings
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected with ID:', socket.id);


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      
    });
});


// Attach 'io' instance to each request
app.use((req, res, next) => {
    req.io = io; // Attach the io object to the request
    next();
});



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

// IMPORTANT: Use server.listen instead of app.listen
server.listen(PORT, () => {
    console.log(`Server Running on PORT:${PORT}`);
    console.log(`Socket.io server is running on the same port`);
});




// Export the io object
module.exports = io;