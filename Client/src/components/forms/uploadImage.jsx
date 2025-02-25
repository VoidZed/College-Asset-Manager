import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { IconButton, Box, Typography, Stack, FormHelperText } from "@mui/material";

function uploadImage() {


    const [images, setImages] = useState([]);

    const thumbHeight = 80; // Thumbnail size

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
            const newImages = [...images];
            for (let file of files) {
                newImages.push(URL.createObjectURL(file));
            }
            setImages(newImages);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };




    return (
        <Box mb={4} sx={{ width: "100%", paddingTop: "20px" }}>
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
                <CloudUploadOutlinedIcon color='primary' sx={{ fontSize: "60px" }} />
                <Typography>Upload Images</Typography>
                <FormHelperText>Upload Event Media</FormHelperText>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                />
            </Box>

            {/* Media Preview */}
            <FormHelperText sx={{ paddingTop: "10px" }}>Media Preview</FormHelperText>
            <Box sx={{ paddingTop: "10px" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap">

                    {images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                height: thumbHeight,
                                width: thumbHeight,
                                border: "1px solid gray",
                                borderRadius: "10px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={image}
                                alt="Preview"
                                height={thumbHeight}
                                width={thumbHeight}
                                style={{ borderRadius: "10px", objectFit: "cover" }}
                            />
                            {/* Close Button to Remove Image */}
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                                }}
                                onClick={() => handleRemoveImage(index)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}


                </Stack>
            </Box>
        </Box>
    )
}

export default uploadImage