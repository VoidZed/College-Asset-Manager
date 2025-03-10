const mongoose = require("mongoose");

// Guest Lecture Schema
const techvyomSchema = new mongoose.Schema(
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
       

        total_participants: {
            type: Number,
            required: true
        }
        ,
        total_events: {
            type: Number,
            required: true
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
    { timestamps: true, collection: "techvyom" }
);

module.exports = mongoose.model("Techvyom", techvyomSchema);
