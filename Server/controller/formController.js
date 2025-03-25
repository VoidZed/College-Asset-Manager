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
const PATENT = require("../model/forms/patentModel")
const ZEST = require("../model/forms/zestModel")
const TECHVYOM = require("../model/forms/techvyomModel")
const AAMOD = require("../model/forms/aamodModel")
const OATH_CEREMONY = require("../model/forms/oathCeremonyModel")
const SCHOLARSHIP = require("../model/forms/scholarshipModel")
const CONVOCATION = require("../model/forms/convocationModel")
const WORKSHOP = require("../model/forms/workshopModel")
const ALUMINI = require("../model/forms/aluminiModel")
const INDUSTRIAL = require("../model/forms/industrialVsitModel")
const HACKATHON = require("../model/forms/hackathonModel")
const DAY_CELEBRATION = require("../model/forms/dayCelebrationModel")
const BOOTCAMP = require("../model/forms/bootcampModel")
const CONFERENCE = require("../model/forms/conferenceModel")
const SEMINAR = require("../model/forms/seminarModel")
const EXAM = require("../model/forms/importantExamModel")

const FORM = require("../model/admin/formModel");
const { default: mongoose } = require("mongoose");
const { camelCase, pascalCase } = require('change-case');

const { createModelFromForm } = require("../utils/admin")


// map activity name with their model
const formModel = {
    patent: PATENT,
    guest_lecture: GUEST_LECTURE,
    zest: ZEST,
    techvyom: TECHVYOM,
    aamod: AAMOD,
    oath_ceremony: OATH_CEREMONY,
    scholarship: SCHOLARSHIP,
    convocation: CONVOCATION,
    workshop: WORKSHOP,
    alumini_meet: ALUMINI,
    industrial_visit: INDUSTRIAL,
    hackathon: HACKATHON,
    day_celebration: DAY_CELEBRATION,
    bootcamp: BOOTCAMP,
    conference: CONFERENCE,
    seminar: SEMINAR,
    important_exam: EXAM
}



const mongodbErrorHandler = async (res, error) => {
    // Handle MongoDB validation errors
    if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Database Validation Error", errors: error.errors });
    }
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
        return res.status(409).json({ message: "Duplicate Key Error", error: error.keyValue });
    }
    // Handle MongoDB connection errors
    if (error.name === "MongoNetworkError") {
        return res.status(503).json({ message: "Database Connection Error" });
    }
    // Handle all other errors
    console.error("Server error:", error);
    return res.status(500).json({ message: error });
};







//save data of the dynamic form 

// Submit data to a form
const saveDynamicForm = async (req, res) => {
    try {


        ///get the data from the client 
        const data = req.body;
        console.log("Dynamic Form Client Data: ", data)
        const form = await FORM.findOne({
            slug: req.params.slug,
            status: 'published'
        });

        if (!form) {
            return res.status(404).json({ error: 'Form not found or not available for submission' });
        }

        // Get the dynamic model for this form
        const SubmissionModel = await createModelFromForm(form);
        console.log("SubmissionModel", mongoose.models)
        // Create a new submission
        const submission = new SubmissionModel({
            ...req.body,
            formId: form._id
        });

        // Validate required fields
        const validationErrors = [];

        form.fields.forEach(field => {
            const fieldName = camelCase(field.label);
            if (field.required &&
                (submission[fieldName] === undefined ||
                    submission[fieldName] === null ||
                    submission[fieldName] === '')) {
                validationErrors.push(`${field.label} is required`);
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                details: validationErrors
            });
        }

        await submission.save();

        res.status(201).json({ data: submission, message: "Dynamic Form Saved Successfully" });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Failed to submit form' });
    }
};







//handle aamod data
const oath_ceremony = async (req, res) => {
    try {
        let formData = req.body;

        // Convert required fields to the correct types
        let processedData = {
            year: formData.year,
            sem: formData.sem,
            date: formData.date,
            president: formData.president,
            secretary: formData.secretary,
            joint_secretary: formData.joint_secretary || [],
            trust_secretary: formData.trust_secretary,
            vice_president: formData.vice_president || [],
            treasurer: formData.treasurer,
            zos: formData.zos || [],
            aos: formData.aos || [],
            tos: formData.tos || [],

            images: formData.images,
            reports: formData.pdfs
        };

        // Handle chairpersons dynamically
        const chairpersons = ['JC', 'MRC', 'Literary', 'Equinox', 'Illuminati', 'Robotrax', 'Synergy', 'Aeronautic', 'Fine Arts', 'Deco', 'Music', 'Dance'];
        chairpersons.forEach(chair => {
            processedData[`${chair.toLowerCase()}_chairperson`] = formData[`${chair.toLowerCase()}_chairperson`];
        });

        // Handle heads dynamically
        const heads = ['Technical', 'Cultural', 'Sports'];
        heads.forEach(head => {
            processedData[`${head.toLowerCase()}_head`] = formData[`${head.toLowerCase()}_head`];
        });




        console.log("Form Data:", processedData)
        // Create a new patent instance
        const oath = new OATH_CEREMONY(processedData)
        await oath.save()

        res.status(201).json({ message: "Oath Ceremony Added Successfully" })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}



//handle hackathon data
const hackathon = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            organized_by: formData.organized_by,



            total_participants: Number(formData.total_participants),
            total_teams: Number(formData.total_teams),
            guest: formData.guest || [],
            judges: formData.judges || [],
            faculty_incharge: formData.faculty_incharge || [],

            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const hackathon = new HACKATHON(formData1)
        await hackathon.save()


        res.status(201).json({ message: "Hackathon Added Successfully" })


    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)

    }
}




//handle bootcamp data
const bootcamp = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            organized_by: formData.organized_by,
            speaker: formData.speaker,
            speaker_org: formData.speaker_org,
            collaboration_org: formData.collaboration_org,
            batch: formData.batch,
            mode: formData.mode,
            total_students: Number(formData.total_students),
            department: formData.department || [],

            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const bootcamp = new BOOTCAMP(formData1)
        await bootcamp.save()


        res.status(201).json({ message: "Bootcamp Added Successfully" })


    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)

    }
}





//handle day celebration data
const day_celebration = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,

            date: formData.date,
            event: formData.event,



            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const day_celebration = new DAY_CELEBRATION(formData1)
        await day_celebration.save()


        res.status(201).json({ message: `${formData1.event} Added Successfully` })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}



//handle scholarship data
const scholarship = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,

            date: formData.date,


            total_scholarship: Number(formData.total_scholarship),
            students_awarded: Number(formData.students_awarded),
            highest_scholarship: Number(formData.highest_scholarship),
            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const scholarship = new SCHOLARSHIP(formData1)
        await scholarship.save()


        res.status(201).json({ message: "Scholarship Added Successfully" })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}



//handle industrial data
const industrial_visit = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,

            start_date: formData.start_date,
            end_date: formData.end_date,
            organization: formData.organization,
            faculty_incharge: formData.faculty_incharge,

            total_students: Number(formData.total_students),
            organized_by: formData.organized_by,
            department: formData.department || [],
            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const industrial = new INDUSTRIAL(formData1)
        await industrial.save()


        res.status(201).json({ message: "Industrial Data Added Successfully" })


    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)

    }
}




//handle alumini meet data
const alumini_meet = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,

            date: formData.date,

            venue: formData.venue,
            total_alumini_attended: Number(formData.total_alumini_attended),
            organized_by: formData.organized_by,
            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const alumini = new ALUMINI(formData1)
        await alumini.save()


        res.status(201).json({ message: "Alumini Meet Added Successfully" })


    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)

    }
}

//handle convocation data
const convocation = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,

            date: formData.date,
            chief_guest: formData.chief_guest,
            chief_guest_designation: formData.chief_guest_designation,
            presiding_officer: formData.presiding_officer,
            presiding_officer_designation: formData.presiding_officer_designation,
            overall_topper: formData.overall_topper,
            guest_of_honour: formData.guest_of_honour || [],



            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const convocation = new CONVOCATION(formData1)
        await convocation.save()


        res.status(201).json({ message: "Convocation Added Successfully" })


    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)

    }
}




//handle aamod data
const aamod = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,

            total_participants: Number(formData.total_participants),
            total_events: Number(formData.total_events),
            aamod_cup: formData.aamod_cup,
            images: formData.images,
            reports: formData.pdfs,
            createdBy: formData.createdBy

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const aamod = new AAMOD(formData1)
        await aamod.save()

        res.status(201).json({ message: "Aamod Added Successfully", data: aamod })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}







//handle aamod data
const exam = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            exam_type: formData.exam_type,
            date: formData.date,


            total_participants: Number(formData.total_participants),

            qualified_students: formData.qualified_students || [],

            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const exam = new EXAM(formData1)
        await exam.save()

        res.status(201).json({ message: "EXAM Added Successfully", data: exam })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}


//handle techvyom

const techvyom = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            date: formData.date,


            total_participants: Number(formData.total_participants),
            total_events: Number(formData.total_events),

            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const techvyom = new TECHVYOM(formData1)
        await techvyom.save()

        res.status(201).json({ message: "Techvyom Added Successfully" })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}






//handle zest data
const zest = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,

            total_participants: Number(formData.total_participants),
            total_events: Number(formData.total_events),
            special_event: formData.special_event,
            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const zest = new ZEST(formData1)
        await zest.save()

        res.status(201).json({ message: "Zest Added Successfully" })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}





//handle patent data
const patent = async (req, res) => {
    try {
        let formData = await req.body;

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            date: formData.date,
            status: formData.status,
            faculty_cordinators: formData.faculty_cordinators || [], // Ensure it's an array
            student_members: formData.student_members || [], // Ensure it's an array
            images: formData.images,
            reports: formData.pdfs,

        }

        console.log("Form Data:", formData1)
        // Create a new patent instance
        const patent = new PATENT(formData1)
        await patent.save()

        res.status(201).json({ message: "Patent Added Successfully" })


    } catch (error) {
        await mongodbErrorHandler(res, error)

    }
}



const conference = async (req, res) => {
    try {

        let formData = await req.body;
        // console.log(formData.formData)

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            speaker: formData.speaker,
            speaker_org: formData.speaker_org,
            organized_by: formData.organized_by,
            total_students: Number(formData.total_students),
            batch: formData.batch,
            mode: formData.mode,
            department: formData.department || [], // Ensure it's an array
            images: formData.images,
            reports: formData.pdfs,
        };

        console.log("Form Data:", formData1)
        const conference = new CONFERENCE(formData1)
        await conference.save()

        res.status(201).json({ message: "Conference Added Successfully" })



    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)
    }
}





const seminar = async (req, res) => {
    try {

        let formData = await req.body;
        // console.log(formData.formData)

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            speaker: formData.speaker,
            venue: formData.venue,
            speaker_org: formData.speaker_org,
            organized_by: formData.organized_by,
            total_students: Number(formData.total_students),
            batch: formData.batch,
            mode: formData.mode,
            department: formData.department || [], // Ensure it's an array
            images: formData.images,
            reports: formData.pdfs,
        };

        console.log("Form Data:", formData1)
        const seminar = new SEMINAR(formData1)
        await seminar.save()

        res.status(201).json({ message: "Seminar Added Successfully" })



    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)
    }
}




// backend route for handling workshop data
const workshop = async (req, res) => {
    try {

        let formData = await req.body;
        // console.log(formData.formData)

        // Convert required fields to the correct types
        let formData1 = {
            year: formData.year,
            sem: formData.sem,
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            speaker: formData.speaker,
            speaker_org: formData.speaker_org,
            organized_by: formData.organized_by,
            total_students: Number(formData.total_students),
            batch: formData.batch,
            mode: formData.mode,
            department: formData.department || [], // Ensure it's an array
            images: formData.images,
            reports: formData.pdfs,
        };

        console.log("Form Data:", formData1)
        const workshop = new WORKSHOP(formData1)
        await workshop.save()

        res.status(201).json({ message: "Workshop Added Successfully" })



    } catch (error) {
        console.log(error)
        await mongodbErrorHandler(res, error)
    }
}





//guest lecture form 
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
        await mongodbErrorHandler(res, error)
    }
}







// fn to get the table data for the  forms 
const get_table_data = async (req, res) => {
    try {
        const { year, activity_name } = req.query;
        console.log(year, activity_name);
        const form = formModel[activity_name];

        // Check if it's a hardcoded form
        if (form) {
            const query = year === "All" ? {} : { year: year };
            const data = await form.find(query, { createdAt: 0, updatedAt: 0, __v: 0, images: 0, reports: 0 });
            console.log("table data", data)
            return res.status(200).json({ data: data, isDynamic: false });
        }

        // If not hardcoded, check if it's a dynamic form
        const model = await FORM.findOne({ slug: activity_name });
        if (!model) {
            return res.status(400).json({ message: "Activity not found" });
        }

        // Get or create the dynamic model
        const dynamicModel = await createModelFromForm(model);

        // Fetch field definitions from the form
        const fields = model.fields.map(field => ({
            key: camelCase(field.label),
            label: field.label
        }));

        // Query the dynamic model
        const query = year === "All" ? {} : { year: year };
        const data = await dynamicModel.find(query, { createdAt: 0, updatedAt: 0, __v: 0, images: 0, reports: 0 });

        return res.status(200).json({
            data: data,
            isDynamic: true,
            fields: fields,
            name: { title: model.title, description: model.description }
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
};
// const get_table_data = async (req, res) => {
//     try {
//         const { year, activity_name } = req.query;
//         console.log(year, activity_name)
//         const form = formModel[activity_name];
//         console.log(form)

//         // check activity exists
//         //either in the hardcoded mapping or 
//         //find model in the FORM model

//         console.log("spandan:", mongoose.models['spandan'])

//         const model = await FORM.findOne({ slug: { $eq: activity_name } })
//         if (!form && !model) {

//             return res.status(400).json({ message: "Activity not found" })
//         }
//         const query = year === "All" ? {} : { year: year };

//         // get data from the db based on the hardcoded model or dynamic model
//         let fields;
//         let data
//         if (!model) {
//             data = await form.find(query, { createdAt: 0, updatedAt: 0, __v: 0, images: 0, reports: 0 });
//         }
//         else {

//             const fields = model.fields.map(field => ({
//                 key: camelCase(field.label),
//                 label: field.label
//             }));


//             //without query
//             const modelName =await createModelFromForm(model)
//             data = await modelName.find( {},{ createdAt: 0, updatedAt: 0, __v: 0, images: 0, reports: 0 });
//         }

//         console.log(data)

//         res.status(200).json({
//             data: data
//         })



//     } catch (error) {
//         console.error("Server error:", error);
//         res.status(500).json({ message: error });

//     }
// }




// function to get the post data of the activity using params

// Function to get the post data of the activity using params
const get_post_data = async (req, res) => {
    try {
        const activity_name = req.params.activity_name;
        const postId = req.params.id;

        console.log("Get Post Data:", activity_name, postId);

        // First check if it's a hardcoded model
        const hardcodedModel = formModel[activity_name];
        let modelToUse = null;
        let isHardcoded = false;

        if (hardcodedModel) {
            modelToUse = hardcodedModel;
            isHardcoded = true;
            console.log("Using hardcoded model:", activity_name);
        } else {
            // If not hardcoded, check for dynamic model
            const dynamicModelInfo = await FORM.findOne({ slug: activity_name });

            if (dynamicModelInfo) {
                // This is a dynamic model
                // Assuming you have a way to get the model from the dynamic model info
                modelToUse = await createModelFromForm(dynamicModelInfo);
                console.log("Using dynamic model:", modelToUse);
            }
        }

        // Check if any valid model was found
        if (!modelToUse) {
            return res.status(400).json({ message: "Activity not found" });
        }

        // Get data from the db
        const data = await modelToUse.findById(postId).populate("createdBy");

        // If no data found
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        console.log("Post Data", data);

        // Return data with model type information
        res.status(200).json({
            data: data,
            modelType: isHardcoded ? "hardcoded" : "dynamic"
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error.message || "An unknown error occurred" });
    }
};
// const get_post_data = async (req, res) => {
//     try {
//         const activity_name = req.params.activity_name;
//         const postId = req.params.id;

//         console.log("Get Post Data:", activity_name, postId)
//         const form = formModel[activity_name];
//         console.log(form)
//         // check activity exists
//         if (!form) {

//             return res.status(400).json({ message: "Activity not found" })
//         }
//         // get data from the db
//         const data = await form.findById(postId);

//         // if no data found 
//         if (!data) {
//             return res.status(404).json({ message: "Data not found" })
//         }

//         console.log(data)

//         //return data
//         res.status(200).json({
//             data: data
//         })



//     } catch (error) {
//         console.error("Server error:", error);
//         res.status(500).json({ message: error });
//     }
// }



// function to delete the post and the cloudinary resources

// make it atomic transaction

const delete_post = async (req, res) => {
    try {
        // Get the post id and activity name
        const { activity_name, id } = req.body;
        console.log("Post id to delete:", id);

        // First check if it's a hardcoded model
        const hardcodedModel = formModel[activity_name];


        let modelToUse = null;
        let isHardcoded = false;

        if (hardcodedModel) {
            modelToUse = hardcodedModel;
            isHardcoded = true;
            console.log("Using hardcoded model:", activity_name);
        } else {
            // If not hardcoded, check for dynamic model
            const dynamicModelInfo = await FORM.findOne({ slug: activity_name });

            if (dynamicModelInfo) {
                // This is a dynamic model
                // Assuming you have a way to get the model from the dynamic model info
                modelToUse = await createModelFromForm(dynamicModelInfo)
                console.log("Using dynamic model:", modelToUse);
            }
        }

        // Check if any valid model was found
        if (!modelToUse) {
            return res.status(400).json({ message: "Activity not found" });
        }

        // Get data from the db to get the cloudinary resources (pdf, image)
        const data = await modelToUse.findById(id);
        console.log(data);

        // Check if data exists
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Delete the cloudinary resources
        // Store the public_id of the images and pdfs
        const images = data.images ? data.images.map((itm) => itm.public_id) : [];
        const reports1 = data.reports ? data.reports.map((itm) => itm.public_id) : [];

        // Delete images from Cloudinary
        let deleteImages, deletePdfs;
        if (images.length > 0) {
            deleteImages = await cloudinary.api.delete_resources(images);
        }

        if (reports1.length > 0) {
            deletePdfs = await cloudinary.api.delete_resources(reports1);
        }

        // Check the deleted response
        console.log(deleteImages, deletePdfs);

        // Delete the post
        const deletePost = await modelToUse.deleteOne({ _id: id });
        console.log(deletePost);

        // If post deleted successfully
        if (deletePost.deletedCount === 1) {
            return res.status(200).json({
                message: "Post Deleted Successfully",
                modelType: isHardcoded ? "hardcoded" : "dynamic"
            });
        } else {
            return res.status(500).json({ message: "Failed to delete post from database" });
        }

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: error.message || "An unknown error occurred" });
    }
};



// const delete_post = async (req, res) => {

//     try {
//         //get the post id and activity name

//         const { activity_name, id } = req.body
//         console.log("Post id to delete:", id)

//         //get the model ,dynamic model
//         const form = formModel[activity_name];

//         const model=await FORM.findOne({slug:activity_name})

//         console.log(form)
//         // check activity exists
//         if (!form && !model) {

//             return res.status(400).json({ message: "Activity not found" })
//         }


//         // get data from the db to get the cloudinary resources (pdf,image)
//         const data = await form.findById(id)
//         console.log(data)


//         //check if data exists
//         if (!data) {
//             return res.status(404).json({ message: "Data not found" })
//         }
//         //delete the cloudinary resources

//         //store the public_id of the images and pdfs
//         const images = await data.images.map((itm) => itm.public_id)
//         const reports1 = await data.reports.map((itm) => itm.public_id)

//         // Delete images from Cloudinary
//         let deleteImages, deletePdfs;
//         if (images.length > 0) {

//             deleteImages = await cloudinary.api.delete_resources(images);

//         }
//         if (reports1.length > 0) {
//             deletePdfs = await cloudinary.api.delete_resources(reports1);
//         }
//         // check the deletd response
//         console.log(deleteImages, deletePdfs)

//         ///chk if the cloudinary resources are deleted
//         //if cloudinary reurn error


//         //delete the post
//         const deletePost = await form.deleteOne({ _id: id });
//         console.log(deletePost)
//         //if post deleted successfully
//         if (deletePost.deletedCount === 1) {
//             return res.status(200).json({ message: "Post Deleted Successfully" })
//         }




//     } catch (error) {
//         console.error("Server error:", error);
//         res.status(500).json({ message: error });
//     }
// }



module.exports = {
    formModel,
    guest_lecture, get_table_data, get_post_data, delete_post, patent, zest, techvyom, aamod, oath_ceremony, scholarship,
    convocation, workshop, alumini_meet, industrial_visit, hackathon, day_celebration, bootcamp, conference, seminar,
    exam, saveDynamicForm
}