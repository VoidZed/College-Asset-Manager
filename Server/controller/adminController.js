const express = require("express");
const mongoose = require('mongoose');
const { camelCase, pascalCase } = require('change-case');

const USERS = require("../model/user")
const ADMIN = require("../model/adminSettingsModel")

const FORM = require("../model/admin/formModel")

const { formModel } = require('./formController')

const {createModelFromForm}=require("../utils/admin")





// Map form field types to Mongoose schema types
const typeMap = {
    text: String,
    number: Number,
    date: Date,
    checkbox: Boolean,
    select: String,
    file: String
};




//function to save the dynamic structure of the form 

const saveForm = async (req, res) => {
    try {
        const { title, fields, slug, category, description } = await req.body;

        if (!title || !fields || !Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({
                error: 'Invalid form data. Title and at least one field are required.'
            });
        }

        const form = new FORM({
            title,
            fields,
            slug,
            category,
            description
        });

        await form.save();

        // Create dynamic model for this form
        await createModelFromForm(form);

        res.status(201).json({ data: form, message: "Form Added Successfully" });

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
}



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


module.exports = { getUsers, email, saveForm, getFormBySlug, getAllForms, getAllDynamicForms }