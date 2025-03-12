const express = require("express");
const ExcelJS = require('exceljs');

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
                const count = await model.countDocuments({ year: year }); // Use the correct model
                data[activity] = count;
            } else {
                console.log(`Model not found for activity: ${activity}`);
                data[activity] = 0; // Set count to 0 if model not found
            }
        });

        // Wait for all promises to resolve
        await Promise.all(activityPromises);

        console.log(data);
        res.status(200).json({ message: "Data Fetch Done", data: data });

    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
};



const exportData = async (req, res) => {
    try {
        const { format, db, year, sem } = req.params;
        console.log(format, db, year, sem);

        // Create meaningful filename
        const fileName = `${db}_${sem}_${year}_export.xlsx`;

        if (format === "excel") {
            // Fetch data from MongoDB efficiently with lean()
            const formData = await formModel[db].find(
                {},
                { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, images: 0, reports: 0 }
            ).lean();

            if (!formData.length) {
                return res.status(404).json({ error: "No data found" });
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
            const formData = await formModel[db].find(
                {},
                { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, images: 0, reports: 0 }
            ).lean();

            if (!formData.length) {
                return res.status(404).json({ error: "No data found" });
            }

            res.setHeader("Content-Type", "application/json");
            res.setHeader("Content-Disposition", `attachment; filename="${db}_${sem}_${year}_export.json"`);
            return res.json(formData);
        } else {
            return res.status(400).json({ error: "Unsupported format. Please use 'excel' or 'json'." });
        }
    } catch (error) {
        console.error("Error exporting data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = { get_activity_count, exportData }