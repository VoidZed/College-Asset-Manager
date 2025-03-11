const express = require("express");


const { formModel } = require('./formController')

const get_activity_count = async (req, res) => {
    try {
        const activities = await req.body;

        const year = activities.selectedYear
        console.log(activities, year);
        let data = {};

        // Create an array of promises for the count of each activity
        const activityPromises = activities.activities.map(async (activity) => {
            const model = formModel[activity]; // Get the correct model from formModel

            if (model) {
                const count = await model.countDocuments({year:year}); // Use the correct model
                data[activity] = count;
            } else {
                console.log(`Model not found for activity: ${activity}`);
                data[activity] = 0; // Set count to 0 if model not found
            }
        });

        // Wait for all promises to resolve
        await Promise.all(activityPromises);

        console.log(data);
        res.status(200).json({ message:"Data Fetch Done",data: data });

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
};


module.exports = { get_activity_count }