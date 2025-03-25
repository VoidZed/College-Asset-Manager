const mongoose = require("mongoose");

// Guest Lecture Schema
const examSchema = new mongoose.Schema(
    {
        year: {
            type: String, // Changed from String to Number
            required: true,
        },
        sem: {
            type: String, // Changed from String to Boolean
            required: true,
        },
        exam_type: {
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
        qualified_students: {
            type: [String],
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
    { timestamps: true, collection: "important_exam" }
);

module.exports = mongoose.model("Exam", examSchema);
