const express = require("express");
const mongoose = require('mongoose');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { camelCase, pascalCase } = require('change-case');

const USERS = require("../model/user")
const ADMIN = require("../model/adminSettingsModel")

const FORM = require("../model/admin/formModel")

const { formModel } = require('./formController')

const { createModelFromForm } = require("../utils/admin")





// Map form field types to Mongoose schema types
const typeMap = {
    text: String,
    number: Number,
    date: Date,
    checkbox: Boolean,
    select: String,
    file: String
};


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/assets/form-logos');
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename using slug and timestamp
        const fileExt = path.extname(file.originalname);
        const fileName = `${req.body.slug}-${Date.now()}${fileExt}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('logo');

//function to save the dynamic structure of the form 

// const saveForm = async (req, res) => {
//     try {
//         const { title, fields, slug, category, description, includeMedia } = await req.body;

//         if (!title || !fields || !Array.isArray(fields) || fields.length === 0) {
//             return res.status(400).json({
//                 error: 'Invalid form data. Title and at least one field are required.'
//             });
//         }

//         const form = new FORM({
//             title,
//             fields,
//             slug,
//             category,
//             description,
//             includeMedia
//         });

//         await form.save();

//         // Create dynamic model for this form
//         await createModelFromForm(form);

//         res.status(201).json({ data: form, message: "Form Added Successfully" });

//     } catch (error) {
//         console.error(error); // Use console.error for errors
//         res.status(500).json({ message: "Internal Server Error" }); // Send error response
//     }
// }


const saveForm = async (req, res) => {
    try {
        // Handle file upload
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred
                return res.status(400).json({ error: `File upload error: ${err.message}` });
            } else if (err) {
                // An unknown error occurred
                return res.status(500).json({ error: `Unknown error: ${err.message}` });
            }

            // Process the form fields
            const { title, slug, category, description, includeMedia } = req.body;
            const fields = JSON.parse(req.body.fields);

            if (!title || !fields || !Array.isArray(fields) || fields.length === 0) {
                return res.status(400).json({
                    error: 'Invalid form data. Title and at least one field are required.'
                });
            }

            // Determine logo path if file was uploaded
            let logoPath = '';
            if (req.file) {
                logoPath = `/assets/form-logos/${req.file.filename}`;
            }

            // Create and save the form
            const form = new FORM({
                title,
                fields,
                slug,
                category,
                description,
                includeMedia,
                logoPath
            });

            await form.save();

            // Create dynamic model for this form
            await createModelFromForm(form);

            res.status(201).json({
                data: form,
                message: "Form Added Successfully"
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// Get all forms
const getAllForms = async (req, res) => {
    try {
        const forms = await FORM.find({
            status: { $ne: 'archived' }
        }).sort('-createdAt');

        res.json({ forms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
};



//get all dynamic for display in activities section to users
// Get all forms
const getAllDynamicForms = async (req, res) => {
    try {
        const activity_name = req.params.activity_name
        console.log(activity_name)
        const forms = await FORM.find({
            status: { $eq: 'published' },
            category: { $eq: activity_name }
        }, { fields: false, status: false, createdAt: false, updatedAt: false }).sort('-createdAt');
        console.log("ddd", forms)
        res.json({ forms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dynamic forms' });
    }
};



// Get a specific form by slug
const getFormBySlug = async (req, res) => {
    try {
        console.log("Get Form By Slug Called")
        const form = await FORM.findOne({
            slug: req.params.slug,
            status: { $ne: 'archived' }
        });

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.json({ form });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch form' });
    }
};





//delet a specific form by slug 

const deleteFormById = async (req, res) => {
    try {
        const { id } = await req.body
        console.log(id)

        //get the form from the forms 
        const form = await FORM.findById(id)
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }


        console.log(form.logoPath)
        // Check if the form has a logo and delete it from the public folder
        if (form.logoPath) {
            // Extract the filename from the logo path
            const logoPath = form.logoPath;
            // If logo is a full URL or path, extract just the filename
            const logoFilename = logoPath.includes('/')
                ? logoPath.substring(logoPath.lastIndexOf('/') + 1)
                : logoPath;

            const fullLogoPath = path.join(process.cwd(), 'public', 'assets', 'form-logos', logoFilename);


            try {
                // Use the promise-based version
                await fsPromises.unlink(fullLogoPath);
                console.log(`Deleted logo file: ${fullLogoPath}`);
            } catch (fileError) {
                console.log(`Error deleting logo file: ${fileError.message}`);
                // Continue with form deletion even if file deletion fails
            }

        }


        //get the form by the slug 
        const form1 = await createModelFromForm(form)

        //delete both forms
        console.log(form1)
        const result = await FORM.findByIdAndDelete(id)
        await form1.collection.drop()

        res.json({ message: 'Form deleted successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch form' });
    }
}




//update the status of the dynamic form

const updateStatus = async (req, res) => {
    try {

        const { id, status } = await req.body
        console.log(id, status)
        //get the form from the forms
        const form = await FORM.findById(id)
        //chk form exists
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        //update the status of the form

        form.status = status
        //save the form
        const result = await form.save()
        res.json({ message: 'Form status updated successfully' });


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to update status' });
    }
}










const getEmail = async (req, res) => {
    try {
        const form = await ADMIN.findOne({});

        //return email 

        res.json({data:form.emailSettings.email});
    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}





const getUsers = async (req, res) => {
    try {
        // verify the role as admin
        console.log("get users ")

        const users = await USERS.find({}, { password: false, createdAt: false, updatedAt: false })
        // return the data
        res.json({ data: users })

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}


const email = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        // chk if both contain data
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // chk if the email is already registered with the system 
        //then update the email and password
        const updatedEmail = await ADMIN.findOneAndUpdate({}, { $set: { 'emailSettings.email': email, 'emailSettings.appPassword': password } }, { upsert: true, new: true });


        console.log("Updated Settings: ", updatedEmail)
        //return the response with status
        res.status(201).json({ message: "Email settings updated successfully", data: updatedEmail.emailSettings });


    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}


module.exports = { getEmail,updateStatus, getUsers, email, saveForm, getFormBySlug, getAllForms, getAllDynamicForms, deleteFormById }