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
    // CreatedBy Field
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      sparse: true
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
  { timestamps: true, collection: "guest_lecture" }
);

module.exports = mongoose.model("GuestLecture", guestLectureSchema);
