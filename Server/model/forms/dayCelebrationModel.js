const mongoose = require("mongoose");

// Guest Lecture Schema
const dayCelebrationSchema = new mongoose.Schema(
    {
        year: {
            type: String, // Changed from String to Number
            required: true,
        },
        sem: {
            type: String, // Changed from String to Boolean
            required: true,
        },
        event: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
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
    { timestamps: true, collection: "day_celebration" }
);

module.exports = mongoose.model("Day Celebration", dayCelebrationSchema);
