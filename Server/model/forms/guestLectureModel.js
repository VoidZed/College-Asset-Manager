const mongoose = require("mongoose");

// Guest Lecture Schema
const guestLectureSchema = new mongoose.Schema(
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
    speaker: {
      type: String,
      required: true,
      trim: true,
    },
    speaker_org: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    total_student: {
      type: Number,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    mode: {
      type: String, // Changed from String to Boolean
      required: true,
    },
    department: {
      type: [String],
      required: true,
    },
    // Media Section (URLs from Cloudinary)
    image: [
      {
        url: { type: String, required: true },
        type: { type: String }, // Optional: store file type
      },
    ],
    reports: [
      {
        url: { type: String, required: true },
        type: { type: String }, // Optional: store file type
      },
    ],
  },
  { timestamps: true, collection: "guest_lecture" }
);

module.exports = mongoose.model("GuestLecture", guestLectureSchema);
