const mongoose = require("mongoose");

const chairpersons = ['JC', 'MRC', 'Literary', 'Equinox', 'Illuminati', 'Robotrax', 'Synergy', 'Aeronautic', 'Fine Arts', 'Deco', 'Music', 'Dance'];
const heads = ['Technical', 'Cultural', 'Sports'];

const TyroOathCeremonySchema = new mongoose.Schema({
    year:
    {
        type: String,
        required: true
    },
    sem: { type: String, required: true, enum: ['Even', 'Odd'] },
    date: { type: Date, required: true },
    president: { type: String, required: true },
    secretary: { type: String, required: true },
    joint_secretary: { type: [String], required: true },
    trust_secretary: { type: String, required: false, trim: true },
    vice_president: { type: [String], required: true },
    treasurer: { type: String, required: true, trim: true },
    zos: { type: [String], required: true },
    aos: { type: [String], required: true },
    tos: { type: [String], required: true },

    ...chairpersons.reduce((acc, chair) => {
        acc[`${chair.toLowerCase()}_chairperson`] = { type: String, required: true };
        return acc;
    }, {}),
    // Dynamic fields for heads
    ...heads.reduce((acc, head) => {
        acc[`${head.toLowerCase()}_head`] = { type: String, required: true };
        return acc;
    }, {}),



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

}, { timestamps: true, collection: 'oath_ceremony' });




module.exports = mongoose.model('Tyro Oath Ceremony', TyroOathCeremonySchema);