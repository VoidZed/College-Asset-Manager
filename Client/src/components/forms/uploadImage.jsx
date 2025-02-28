// import React, { useState } from 'react'
// import CloseIcon from "@mui/icons-material/Close";
// import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// import { IconButton, Box, Typography, Stack, FormHelperText } from "@mui/material";

// function uploadImage() {


//     const [images, setImages] = useState([]);

//     const thumbHeight = 80; // Thumbnail size

//     const handleImageUpload = (event) => {
//         const files = event.target.files;
//         if (files) {
//             const newImages = [...images];
//             for (let file of files) {
//                 newImages.push(URL.createObjectURL(file));
//             }
//             setImages(newImages);
//         }
//     };

//     const handleRemoveImage = (index) => {
//         setImages(images.filter((_, i) => i !== index));
//     };




//     return (
//         <Box mb={4} sx={{ width: "99%", paddingTop: "20px" }}>
//             {/* Upload Box */}
//             <Box
//                 component="label"
//                 sx={{
//                     border: "1px solid lightgray",
//                     height: "200px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     cursor: "pointer",
//                 }}
//             >
//                 <CloudUploadOutlinedIcon color='primary' sx={{ fontSize: "60px" }} />
//                 <Typography>Upload Images</Typography>
//                 <FormHelperText>Upload Event Media</FormHelperText>
//                 <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     hidden
//                     onChange={handleImageUpload}
//                 />
//             </Box>

//             {/* Media Preview */}
//             <FormHelperText sx={{ paddingTop: "10px" }}>Media Preview</FormHelperText>
//             <Box sx={{ paddingTop: "10px" }}>
//                 <Stack direction="row" spacing={2} flexWrap="wrap">

//                     {images.map((image, index) => (
//                         <Box
//                             key={index}
//                             sx={{
//                                 position: "relative",
//                                 height: thumbHeight,
//                                 width: thumbHeight,
//                                 border: "1px solid gray",
//                                 borderRadius: "10px",
//                                 overflow: "hidden",
//                             }}
//                         >
//                             <img
//                                 src={image}
//                                 alt="Preview"
//                                 height={thumbHeight}
//                                 width={thumbHeight}
//                                 style={{ borderRadius: "10px", objectFit: "cover" }}
//                             />
//                             {/* Close Button to Remove Image */}
//                             <IconButton
//                                 size="small"
//                                 sx={{
//                                     position: "absolute",
//                                     top: 0,
//                                     right: 0,
//                                     backgroundColor: "rgba(255,255,255,0.7)",
//                                     "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
//                                 }}
//                                 onClick={() => handleRemoveImage(index)}
//                             >
//                                 <CloseIcon fontSize="small" />
//                             </IconButton>
//                         </Box>
//                     ))}


//                 </Stack>
//             </Box>
//         </Box>
//     )
// }

// export default uploadImage

import React, { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton, Box, Typography, Stack, FormHelperText } from "@mui/material";

function UploadImage() {
    const [files, setFiles] = useState([]); // State to store files (both images and PDFs)

    const thumbHeight = 80; // Thumbnail size

    // Handle file uploads (both images and PDFs)
    const handleFileUpload = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = [...files];
            for (let file of selectedFiles) {
                newFiles.push(file);
            }
            setFiles(newFiles);
        }
    };

    // Handle removing a file (either image or PDF)
    const handleRemoveFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Function to check if the file is an image
    const isImage = (file) => {
        return file && file.type.startsWith('image');
    };

    // Function to check if the file is a PDF
    const isPdf = (file) => {
        return file && file.type === 'application/pdf';
    };

    return (
        <Box mb={4} sx={{ width: "98%", paddingTop: "20px" }}>
            {/* Upload Box */}
            <Box
                component="label"
                sx={{
                    border: "1px solid lightgray",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <CloudUploadOutlinedIcon color="primary" sx={{ fontSize: "60px" }} />
                <Typography>Upload Images or PDFs</Typography>
                <FormHelperText>Upload Event Media</FormHelperText>
                <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    hidden
                    onChange={handleFileUpload}
                />
            </Box>

            {/* Media Preview */}
            <FormHelperText sx={{ paddingTop: "10px" }}>Media Preview</FormHelperText>
            <Box sx={{ paddingTop: "10px" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    {files.map((file, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                height: thumbHeight,
                                width: thumbHeight,
                                border: "1px solid gray",
                                borderRadius: "10px",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: isImage(file) ? 'transparent' : '#f5f5f5',
                            }}
                        >
                            {isImage(file) ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    height={thumbHeight}
                                    width={thumbHeight}
                                    style={{ borderRadius: "10px", objectFit: "cover" }}
                                />
                            ) : isPdf(file) ? (
                                <PictureAsPdfIcon sx={{ fontSize: "40px", color: "red" }} />
                            ) : null}

                            {/* Close Button to Remove File */}
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                                }}
                                onClick={() => handleRemoveFile(index)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}

export default UploadImage;
