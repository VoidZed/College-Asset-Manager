const express = require("express");
const cloudinary = require("cloudinary").v2;
// cloudinary config file 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//guest lecture model
const GUEST_LECTURE = require("../model/forms/guestLectureModel")

const guest_lecture = async (req, res) => {
    try {

        let formData = await req.body;
        // console.log(formData.formData)

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.formData.year,
            sem: formData.formData.sem,
            title: formData.formData.title,
            date: formData.formData.date,
            speaker: formData.formData.speaker,
            speaker_org: formData.formData.speaker_org,
            total_student: Number(formData.formData.total_student),
            batch: formData.formData.batch,
            mode: formData.formData.mode,
            department: formData.formData.department || [], // Ensure it's an array
            images: formData.formData.images,
            reports: formData.formData.pdfs,
        };

        console.log("Form Data:", formData1)
        const guestLecture = new GUEST_LECTURE(formData1)
        await guestLecture.save()

        res.status(201).json({ message: "Guest Lecture Added Successfully" })



    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}



// map activity name with their model
const formModel = {
    guest_lecture: GUEST_LECTURE
}



// fn to get the table data for the  forms 
const get_table_data = async (req, res) => {
    try {
        const { year, activity_name } = req.query;
        console.log(year, activity_name)
        const form = formModel[activity_name];
        console.log(form)
        // check activity exists
        if (!form) {

            return res.status(400).json({ message: "Activity not found" })
        }
        // get data from the db
        const data = await form.find({ year: year }, { createdAt: 0, updatedAt: 0, __v: 0, images: 0, reports: 0 });
        console.log(data[0])

        res.status(200).json({
            data: data
        })



    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });

    }
}




// function to get the post data of the activity using params
const get_post_data = async (req, res) => {
    try {
        const activity_name = req.params.activity_name;
        const postId = req.params.id;

        console.log("Get Post Data:", activity_name, postId)
        const form = formModel[activity_name];
        console.log(form)
        // check activity exists
        if (!form) {

            return res.status(400).json({ message: "Activity not found" })
        }
        // get data from the db
        const data = await form.findById(postId);

        // if no data found 
        if (!data) {
            return res.status(404).json({ message: "Data not found" })
        }

        console.log(data)

        //return data
        res.status(200).json({
            data: data
        })



    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}



// function to delete the post and the cloudinary resources

// make it atomic transaction
const delete_post = async (req, res) => {

    try {
        //get the post id and activity name

        const { activity_name, id } = req.body
        console.log("Post id to delete:", id)

        //get the model
        const form = formModel[activity_name];
        console.log(form)
        // check activity exists
        if (!form) {

            return res.status(400).json({ message: "Activity not found" })
        }
        // get data from the db to get the cloudinary resources (pdf,image)
        const data = await form.findById(id)
        console.log(data)
        //check if data exists
        if (!data) {
            return res.status(404).json({ message: "Data not found" })
        }
        //delete the cloudinary resources

        //store the public_id of the images and pdfs
        const images = await data.images.map((itm) => itm.public_id)
        const reports1 = await data.reports.map((itm) => itm.public_id)

        // Delete images from Cloudinary
        let deleteImages ,deletePdfs;
        if (images.length > 0) {

             deleteImages = await cloudinary.api.delete_resources(images);

        }
        if (reports1.length > 0) {
            deletePdfs = await cloudinary.api.delete_resources(reports1);
        }
        // check the deletd response
        console.log(deleteImages, deletePdfs)

        ///chk if the cloudinary resources are deleted
        //if cloudinary reurn error


        //delete the post
        const deletePost = await form.deleteOne({ _id: id });
        console.log(deletePost)
        //if post deleted successfully
        if (deletePost.deletedCount === 1) {
            return res.status(200).json({ message: "Post Deleted Successfully" })
        }




    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}



module.exports = { guest_lecture, get_table_data, get_post_data, delete_post }