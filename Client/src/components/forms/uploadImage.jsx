import React, { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton, Box, Typography, Stack, FormHelperText, LinearProgress } from "@mui/material";
import axios from "axios";

function UploadImage({images,pdfs,handleFileSelect,handleRemoveImage,handleRemovePdf,mediaLoading}) {
   

   
    return (
        <Box mb={4} sx={{ width: "98%", paddingTop: "10px" }}>
            <Box component="label" sx={{ border: "1px solid lightgray", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                <CloudUploadOutlinedIcon color="primary" sx={{ fontSize: "60px" }} />
                <Typography>Upload Images or PDFs</Typography>
                <FormHelperText>Upload Event Media & Report</FormHelperText>
                <input type="file" multiple accept="image/*,application/pdf" hidden onChange={(e) => handleFileSelect(e.target.files)} />
            </Box>

            {/* display upload progress when the progress is gt 0 */}
            {mediaLoading && ( <LinearProgress  />)}
           
            <FormHelperText sx={{ paddingTop: "10px" }}>Media Preview</FormHelperText>
            <Box sx={{ paddingTop: "10px" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    {images.map((file, index) => (
                        <Box key={index} sx={{ position: "relative", height: 80, width: 80, border: "1px solid gray", borderRadius: "10px", overflow: "hidden" }}>
                            <img src={URL.createObjectURL(file)} alt="Preview" height={80} width={80} style={{ borderRadius: "10px", objectFit: "cover" }} />
                            <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255,255,255,0.7)", "&:hover": { backgroundColor: "rgba(255,255,255,1)" } }} onClick={() => handleRemoveImage(index)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                    {pdfs.map((file, index) => (
                        <Box key={index} sx={{ position: "relative", height: 80, width: 80, border: "1px solid gray", borderRadius: "10px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
                            <PictureAsPdfIcon sx={{ fontSize: "40px", color: "red" }} />
                            <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255,255,255,0.7)", "&:hover": { backgroundColor: "rgba(255,255,255,1)" } }} onClick={() => handleRemovePdf(index)}>
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
