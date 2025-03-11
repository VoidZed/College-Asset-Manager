const mongoose = require('mongoose');


const hackathonSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    organized_by: {
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    total_participants: {
        type: Number,
        required: true
    },
    total_teams: {
        type: Number,
        required: true
    },
    faculty_incharge: {
        type: [String],
        required: true
    },
    guest: {
        type: [String],
        required: true
    },
    judges: {
        type: [String],
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
    ]
}, {
    timestamps: true,
    collection: 'hackathon'
});

module.exports = mongoose.model('Hackathon', hackathonSchema);