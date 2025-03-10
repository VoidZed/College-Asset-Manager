const mongoose = require("mongoose");

// Guest Lecture Schema
const zestSchema = new mongoose.Schema(
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

        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,
            required: true,
        },

        total_participants: {
            type: Number,
            required: true
        }
        ,
        total_events: {
            type: Number,
            required: true
        },
        special_event: {
            type: String,
            required: true,
            trim: true
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
    { timestamps: true, collection: "zest" }
);

module.exports = mongoose.model("zest", zestSchema);
