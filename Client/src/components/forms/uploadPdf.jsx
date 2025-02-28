import React, { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { IconButton, Box, Typography, Stack, FormHelperText } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // For PDF Icon

function UploadPdf() {
    const [pdfFiles, setPdfFiles] = useState([]);

    const thumbHeight = 80; // Thumbnail size

    const handlePdfUpload = (event) => {
        const files = event.target.files;
        if (files) {
            const newPdfFiles = [...pdfFiles];
            for (let file of files) {
                newPdfFiles.push(file); // Store the file objects
            }
            setPdfFiles(newPdfFiles);
        }
    };

    const handleRemovePdf = (index) => {
        setPdfFiles(pdfFiles.filter((_, i) => i !== index));
    };

    return (
        <Box mb={4} sx={{ width: "99%", paddingTop: "20px" }}>
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
                <Typography>Upload PDF</Typography>
                <input
                    type="file"
                    multiple
                    accept="application/pdf" // Only allow PDF files
                    hidden
                    onChange={handlePdfUpload}
                />
            </Box>

            {/* PDF Preview */}
            <FormHelperText sx={{ paddingTop: "10px" }}>PDF Preview</FormHelperText>
            <Box sx={{ paddingTop: "10px" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    {pdfFiles.map((pdfFile, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                height: thumbHeight,
                                width: thumbHeight,
                                border: "1px solid gray",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            {/* Display PDF Icon */}
                            <PictureAsPdfIcon color="error" sx={{ fontSize: "50px" }} />
                            {/* Close Button to Remove PDF */}
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                                }}
                                onClick={() => handleRemovePdf(index)}
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

export default UploadPdf;
