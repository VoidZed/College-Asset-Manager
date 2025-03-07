import axios from 'axios';


const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "Network error: Please check your internet connection";
        }
        return error.response.data?.message || `Upload failed (${error.response.status})`;
    }
    return error.message;
};


const getCloudinarySignature = async (fileType, activity_item) => {
    try {
        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];
        const folderStructure = `${activity_item}/${fileType}/${formattedDate}`;
        const timestamp = Math.floor(Date.now() / 1000);

        const response = await axios.post("/api/auth/cloud-sign", {
            folder: folderStructure,
            timestamp
        });
        console.log("Cloudinary Signature:",response);

        if (response.status !== 200 || !response.data) {
            throw new Error("Failed to fetch Cloudinary signature");
        }

        return response.data;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error("Signature Error:", errorMessage);
        throw new Error(`Cloudinary Signature Error: ${errorMessage}`);
    }
};





const uploadFileToCloudinary = async (file, signatureData) => {
    if (!signatureData) {
        throw new Error("Missing Cloudinary signature data");
    }

    try {
        const { signature, timestamp, folder, cloud_name, api_key } = signatureData;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            formData
        );

        console.log("Upload Response:", uploadResponse);

        if (uploadResponse.status !== 200 || !uploadResponse.data.secure_url) {
            throw new Error("No secure URL returned from upload");
        }

        return uploadResponse.data.secure_url;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error("Upload Error:", errorMessage);
        throw new Error(`File Upload Error: ${errorMessage}`);
    }
};


const uploadFiles = async (images, pdfs, activity_item, setMediaLoading) => {
    setMediaLoading(true);

    try {
        console.log("Starting file upload process...");

        const imageSignature = await getCloudinarySignature("image", activity_item);
        const pdfSignature = await getCloudinarySignature("pdf", activity_item);

        // Upload images
        const uploadedImageUrls = await Promise.all(
            images.map(async (file) => {
                try {
                    return await uploadFileToCloudinary(file, imageSignature);
                } catch (error) {
                    console.error(`Error uploading image ${file.name}:`, error);
                    throw error;
                }
            })
        );

        // Upload PDFs
        const uploadedPdfUrls = await Promise.all(
            pdfs.map(async (file) => {
                try {
                    return await uploadFileToCloudinary(file, pdfSignature);
                } catch (error) {
                    console.error(`Error uploading PDF ${file.name}:`, error);
                    throw error;
                }
            })
        );

        return {
            images: uploadedImageUrls,
            pdfs: uploadedPdfUrls
        };
    } catch (error) {
        throw error;
    } finally {
        setMediaLoading(false);
    }
};

export { uploadFiles };