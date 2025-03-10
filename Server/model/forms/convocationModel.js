const mongoose = require("mongoose");

// Guest Lecture Schema
const convocationSchema = new mongoose.Schema(
    {
        year: {
            type: String, // Changed from String to Number
            required: true,
        },
        sem: {
            type: String, // Changed from String to Boolean
            required: true,
        },
        chief_guest: {
            type: String,
            required: true,
            trim: true,
        },
        chief_guest_designation: {
            type: String,
            required: true,
            trim: true,
        },
        presiding_officer: {
            type: String,
            required: true,
            trim: true,
        },
        presiding_officer_designation: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },

        guest_of_honour: {
            type: [String],
            required: true,
        },
        overall_topper: {
            type: String, // Changed from String to Boolean
            required: true,
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
    { timestamps: true, collection: "convocation" }
);

module.exports = mongoose.model("Convocation", convocationSchema);
