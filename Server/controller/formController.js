const express = require("express");


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
            date: new Date(formData.formData.date),
            speaker: formData.formData.speaker,
            speaker_org: formData.formData.speaker_org,
            total_student: Number(formData.formData.total_student),
            batch: formData.formData.batch,
            mode: formData.formData.mode,
            department: formData.formData.department || [], // Ensure it's an array
            image: formData.formData.images,
            reports:formData.formData.pdfs,
        };

        console.log("Form Data:",formData1)
        const guestLecture = new GUEST_LECTURE(formData1)
        await guestLecture.save()

        res.status(201).json({ message: "Guest Lecture Added Successfully" })



    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error });
    }
}


module.exports = { guest_lecture }