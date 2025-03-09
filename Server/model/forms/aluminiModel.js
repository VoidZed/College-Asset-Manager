const mongoose = require('mongoose');

const aluminiSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    sem: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    total_alumini_attended: {
        type: Number,
        required: true,
    },

    organized_by: {
        type: String,
        required: true,
        trim: true
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

}, { timestamps: true, collection: "alumini_meet" });

module.exports = mongoose.model("Alumini", aluminiSchema);