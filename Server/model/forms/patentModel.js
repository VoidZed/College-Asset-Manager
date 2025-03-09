const mongoose = require("mongoose");

// Guest Lecture Schema
const patentSchema = new mongoose.Schema(
  {
    year: {
      type: String, // Changed from String to Number
      required: true,
    },
    sem: {
      type: String, // Changed from String to Boolean
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
   
    date: {
      type: Date,
      required: true,
    },
    status:{
        type:String,
        required:true
    },
    student_members:{
        type:[String],
        required:true
    },
    faculty_cordinators:{
        type:[String],
        required:true   
    },
   
    
    // Media Section (URLs from Cloudinary)
    images: [
      {
        url: { type: String, required: false },
        public_id: { type: String, required: false },
      },
    ],
    reports: [
      {
        url: { type: String, required: false },
        public_id: { type: String, required: false },
      },
    ],
  },
  { timestamps: true, collection: "patent" }
);

module.exports = mongoose.model("Patent", patentSchema);
