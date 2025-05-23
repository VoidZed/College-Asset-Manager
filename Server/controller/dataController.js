const express = require("express");
const ExcelJS = require('exceljs');

const { formModel } = require('./formController')

const FORM = require("../model/admin/formModel")
const USER = require("../model/user")
const { createModelFromForm } = require("../utils/admin")



const get_activity_count = async (req, res) => {
    try {
        const { activities, activity_name, selectedYear } = await req.body;

        const year = selectedYear
        console.log(year, activities);
        let data = {};
        const query = year === "all" ? {} : { year: year }

        //get count for hardcoded events 
        // Create an array of promises for the count of each activity
        const activityPromises = activities.map(async (activity) => {
            const model = formModel[activity]; // Get the correct model from formModel

            if (model) {
                const count = await model.countDocuments(query); // Use the correct model
                data[activity] = count;
            } else {
                console.log(`Model not found for activity: ${activity}`);
                data[activity] = 0; // Set count to 0 if model not found
            }
        });

        // Wait for all promises to resolve
        await Promise.all(activityPromises);

        //get count for dynamic events

        const model = await FORM.find({ category: activity_name })

        // traverse the model and get the count of each activity
        if (model) {


            await Promise.all(model.map(async (item) => {
                const actualModel = await createModelFromForm(item);
                // Await the count operation
                const count = await actualModel.countDocuments(query);
                data[item.slug] = count;
            }));
        }






        console.log(data);
        res.status(200).json({ message: "Data Fetch Done", data: data });

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: "Internal Server Error" }); // Send error response
    }
};



const exportData = async (req, res) => {
    try {
        const { format, db, year, sem } = req.params;
        console.log(format, db, year, sem);

        if (!format || !db || !year || !sem) {
            return res.status(400).json({ error: "Missing required parameters." });
        }


        // Create meaningful filename
        const fileName = `${db}_${sem}_${year}_export.xlsx`;


        const query = {};

        // Add year condition if it's not "all"
        if (year !== "All") {
            query.year = year;
        }

        // Add semester condition if it's not "all"
        if (sem !== "All") {
            query.sem = sem;
        }

        console.log("Query", query)

        let model = await formModel[db]
        //check whether hardcoded model exists
        if (!model) {
            const form = await FORM.findOne({ slug: db })
            model = await createModelFromForm(form)
        }



        if (format === "excel") {
            // Fetch data from MongoDB efficiently with lean()
            const formData = await model.find(
                query,
                { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, images: 0, reports: 0 }
            ).lean();

            if (!formData.length) {
                return res.status(404).json({ message: "No data found" });
            }

            // Extract column names once
            const keysArray = Object.keys(formData[0]);

            // Create workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(`${db.toUpperCase()}-${year}`);

            // Define column configuration with width calculation
            worksheet.columns = keysArray.map(key => {
                // Pre-calculate max width for this column
                const maxContentLength = formData.reduce((max, row) => {
                    const value = row[key];
                    const strValue = Array.isArray(value) ? value.join(", ") : String(value || "");
                    return Math.max(max, strValue.length);
                }, key.length);

                return {
                    header: key.toUpperCase(),
                    key,
                    width: Math.min(50, maxContentLength + 2) // Cap width at 50 characters
                };
            });

            // Style header row
            worksheet.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ADD8E6" } // Light blue background
                };
                cell.font = { bold: true, color: { argb: "000000" } };
                cell.alignment = { horizontal: "center", vertical: "middle" };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

            // Process data in batches for better memory usage
            const batchSize = 100;
            for (let i = 0; i < formData.length; i += batchSize) {
                const batch = formData.slice(i, i + batchSize);

                batch.forEach(row => {
                    const rowData = {};
                    keysArray.forEach(key => {
                        const value = row[key];
                        rowData[key] = Array.isArray(value) ? value.join(", ") : value || "";
                    });
                    worksheet.addRow(rowData);
                });
            }

            // Apply light styling to all data cells
            for (let i = 2; i <= formData.length + 1; i++) {
                worksheet.getRow(i).eachCell((cell) => {
                    cell.alignment = { horizontal: "center", vertical: "middle" };
                    // Add light border
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'E0E0E0' } },
                        left: { style: 'thin', color: { argb: 'E0E0E0' } },
                        bottom: { style: 'thin', color: { argb: 'E0E0E0' } },
                        right: { style: 'thin', color: { argb: 'E0E0E0' } }
                    };
                });

                // Add alternating row colors for better readability
                if (i % 2 === 0) {
                    worksheet.getRow(i).eachCell((cell) => {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'F9F9F9' }
                        };
                    });
                }
            }

            // Set response headers
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

            // Send the file asynchronously
            await workbook.xlsx.write(res);

            return res.end();

        } else if (format === "json") {
            // Handle JSON export
            const formData = await model.find(
                query,
                { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, images: 0, reports: 0 }
            ).lean();

            if (!formData.length) {
                return res.status(404).json({ message: "No data found" });
            }

            res.setHeader("Content-Type", "application/json");
            res.setHeader("Content-Disposition", `attachment; filename="${db}_${sem}_${year}_export.json"`);
            return res.json(formData);
        } else {
            return res.status(400).json({ message: "Unsupported format. Please use 'excel' or 'json'." });
        }
    } catch (error) {
        console.error("Error exporting data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




const getPhotoTimeline = async (req, res) => {
    try {
        const activity_item = req.params.activity_item

        console.log(activity_item)

        //check whether its mode l is harcoded or dynamic
        let model = await formModel[activity_item]



        if (!model) {

            const form = await FORM.findOne({ slug: activity_item })
            model = await createModelFromForm(form)

        }

        const result = await model.aggregate([
            {
                $unwind: "$images" // Unwind the photos array to process each image separately
            },
            {
                $group: {
                    _id: "$year", // Group by year
                    urls: { $push: "$images.url" } // Collect all image URLs for the respective year
                }
            },
            {
                $sort: { _id: -1 } // Sort by year in descending order (most recent first)
            }
        ]);

        console.log(result)
        res.json({ data: result })


    } catch (error) {
        console.error("Error exporting data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}





//fn to get the profile data
//this fn is very big so cache it 
const getProfileData = async (req, res) => {
    try {
        const { userId, year } = req.body;
        console.log(userId, year);

        // Get user data
        const user = await USER.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User: ", user);


        const data = {};


        const promises = Object.entries(formModel).map(async ([key, value]) => {
            console.log(key, value);


            try {
                const modelData = await value.countDocuments({ createdBy: userId, year: year });
                data[value.modelName] = modelData;  // Store the count with the model name as the key
            } catch (error) {
                console.error('Error fetching model data:', error);
                data[value.modelName] = 0;  // If there's an error, set the count to 0
            }
        });

        // Wait for all promises to resolve and then continue
        await Promise.all(promises);

        // Second part: Fetching data from the FORM collection
        const model = await FORM.find({});
        console.log(model);

        if (model) {
            await Promise.all(model.map(async (item) => {
                const actualModel = await createModelFromForm(item);

                const count = await actualModel.countDocuments({ createdBy: userId, year: year });
                data[actualModel.modelName] = count;
            }));
        }

        console.log(data)

        // Return the `data` object containing the model name as key and the count as value
        return res.status(200).json({user:user,data:data}); // Send the final result back to the client

    } catch (error) {
        console.error("Error exporting data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





module.exports = { getProfileData, get_activity_count, exportData, getPhotoTimeline }