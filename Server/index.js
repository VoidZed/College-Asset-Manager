require("dotenv").config(); // Load .env variables
const express = require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const formRoutes = require("./routes/formRoutes")
const dataRoutes = require("./routes/dataRoutes")
const adminRoutes = require("./routes/adminRoutes")
const cookieParser = require('cookie-parser');

const fs = require('fs');

const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const compression = require("compression");
const helmet = require("helmet")
const pdfRoutes = require("./routes/pdfRoutes")
const activityRoutes = require("./routes/activityRoutes")

const app = express(); 



app.use(helmet());

const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });


app.use(morgan('combined', { stream: accessLogStream }));

app.use(compression());


app.use(helmet())

//parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//connect to database


connectDb();

app.use(cors({
  origin: "*", // Specify the exact origin
  credentials: true // Allow cookies to be sent
}));






app.use(express.static('public'));
// auth routes
app.use("/api/auth", authRoutes);

// form routes
app.use("/api", formRoutes);

// data routes
app.use("/api", dataRoutes);

// admin routes
app.use("/api/admin", adminRoutes);

//pdf routes

app.use('/api', pdfRoutes);

app.use('/api', activityRoutes);

///port
const PORT = process.env.PORT || 3000;




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : {} });
});


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../Client/dist'), { maxAge: '1y' }));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Client', 'dist', 'index.html'));
  });
}


// IMPORTANT: Use server.listen instead of app.listen
app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
  
});


