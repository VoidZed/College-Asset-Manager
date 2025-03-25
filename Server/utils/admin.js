const mongoose = require('mongoose');
const { camelCase, pascalCase } = require('change-case');



const typeMap = {
    text: String,
    number: Number,
    date: Date,
    checkbox: Boolean,
    select: String,
    file: String
};
const modelCache = {};

// Function to create dynamic Mongoose models from form definitions
async function createModelFromForm(form) {



    try {
        // Generate a model name based on the form slug
        // const modelName = pascalCase(`${form.slug} structure`);
        const collectionName = `${form.slug}`;

        // Check if model already exists in our cache
        if (modelCache[collectionName]) {
            return modelCache[collectionName];
        }


        const schemaDefinition = {
            // Add a reference to the parent form
            formId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Form',
                required: true
            },


            //add a reference to the user createdBy
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                sparse: true
            }

        };

        // Add fields according to form definition
        form.fields.forEach(field => {
            const fieldName = camelCase(field.label);

            // Set up basic field configuration
            schemaDefinition[fieldName] = {
                type: typeMap[field.type] || String,
                required: field.required || false
            };

            // Add enum for select fields
            if (field.type === 'select' && Array.isArray(field.options) && field.options.length > 0) {
                schemaDefinition[fieldName].enum = field.options;
            }
        });


        //if the for contains the include media then add

        if (form.includeMedia === true) {
            schemaDefinition.images = [
                {
                    url: { type: String, required: false },
                    public_id: { type: String, required: false },
                },
            ]

            schemaDefinition.reports = [
                {
                    url: { type: String, required: false },
                    public_id: { type: String, required: false },
                },
            ]


        }


        // Add metadata fields
        schemaDefinition.createdAt = {
            type: Date,
            default: Date.now
        };

        schemaDefinition.updatedAt = {
            type: Date,
            default: Date.now
        };

        // Create schema
        const schema = new mongoose.Schema(schemaDefinition);

        // Add pre-save hook
        schema.pre('save', function (next) {
            this.updatedAt = Date.now();
            next();
        });


        // Register the model if it doesn't exist in Mongoose
        if (!mongoose.models[collectionName]) {
            modelCache[collectionName] = mongoose.model(collectionName, schema, collectionName);
        } else {
            modelCache[collectionName] = mongoose.models[collectionName];
        }

        return modelCache[collectionName];
    }
    catch (error) {
        console.log("Create Model Failed:", error)
    }
}




// Export the function for use in other files
module.exports = { createModelFromForm };