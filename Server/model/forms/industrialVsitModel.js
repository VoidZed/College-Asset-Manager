const mongoose = require('mongoose');

const industrialSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    sem: {
        type: String,
        required: true,
    },
    faculty_incharge: {
        type: String,
        required: true,
        trim: true
    },

    total_students: {
        type: Number,
        required: true,
    },
    organization: {
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
        required: true,
    },

    end_date: {
        type: Date,
        required: true,
    },
    department: {
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

}, { timestamps: true, collection: "industrial_visit" });

module.exports = mongoose.model("Industrial Visit", industrialSchema);