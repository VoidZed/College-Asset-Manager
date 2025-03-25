const mongoose = require("mongoose");

// Guest Lecture Schema
const scholarshipSchema = new mongoose.Schema(
    {
        year: {
            type: String, // Changed from String to Number
            required: true,
        },
        sem: {
            type: String, // Changed from String to Boolean
            required: true,
        },


        date: {
            type: Date,
            required: true,
        },


        total_scholarship: {
            type: Number,
            required: true
        }
        ,
        students_awarded: {
            type: Number,
            required: true
        },

        highest_scholarship: {
            type: Number,
            required: true
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
    { timestamps: true, collection: "scholarship" }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);
