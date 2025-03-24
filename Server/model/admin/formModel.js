// const mongoose = require('mongoose');

// // Schema to store form definitions
// const formSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     category:{
//         type:String,
//         required:true,
//         lowercase:true

//     },
//     description:{
//         type:String,
//         required:true 
//     },
//     includeMedia:{
//         type:Boolean,
//         default:false
//     },
//     fields: [{
//         id: String,
//         type: {
//             type: String,
//             required: true,
//             enum: ['text', 'number', 'select', 'checkbox', 'date', 'file']
//         },
//         label: {
//             type: String,
//             required: true
//         },
//         required: {
//             type: Boolean,
//             default: false
//         },
//         column_span: {
//             type: Number,
//             required: false,
//             default:1
//         },
//         options: [String],
//         // validation: {
//         //     type: String,
//         //     params: mongoose.Schema.Types.Mixed
//         // }
//     }],
//     status: {
//         type: String,
//         enum: ['draft', 'published', 'archived'],
//         default: 'published'
//     },

// }, { timestamps: true, collection: 'forms' });


// ///slug is the unique identifier for the form 



// module.exports = mongoose.model("Form", formSchema)
const mongoose = require('mongoose');

// Schema to store form definitions
const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true 
    },
    includeMedia: {
        type: Boolean,
        default: false
    },
    logoPath: {
        type: String,
        default: ''
    },
    fields: [{
        id: String,
        type: {
            type: String,
            required: true,
            enum: ['text', 'number', 'select', 'checkbox', 'date', 'file']
        },
        label: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        column_span: {
            type: Number,
            required: false,
            default: 1
        },
        options: [String],
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
}, { timestamps: true, collection: 'forms' });

module.exports = mongoose.model("Form", formSchema);