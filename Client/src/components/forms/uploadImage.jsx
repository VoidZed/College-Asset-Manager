import React from 'react';
import CloseIcon from "@mui/icons-material/Close";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton, Box, Typography, Stack, FormHelperText, LinearProgress } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';


function UploadImage({images,pdfs,handleFileSelect,handleRemoveImage,handleRemovePdf,mediaLoading}) {
   

   
    return (
        <Box mb={4} sx={{ width: "98%", paddingTop: "10px" }}>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ width:'100%' }}>
            <Box flex={1} component="label" sx={{ border: "1px solid lightgray", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                <ImageIcon color="primary" sx={{ fontSize: "60px" }} />
                <Typography>Upload Images</Typography>
                <FormHelperText>Upload Event Media </FormHelperText>
                <input type="file" multiple accept="image/*" hidden onChange={(e) => handleFileSelect(e.target.files)} />
            </Box>

            <Box  flex={1} component="label" sx={{ border: "1px solid lightgray", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                <ArticleIcon color="primary" sx={{ fontSize: "60px" }} />
                <Typography>Upload Report</Typography>
                <FormHelperText>Upload Event PDF Report</FormHelperText>
                <input type="file" multiple accept="application/pdf" hidden onChange={(e) => handleFileSelect(e.target.files)} />
            </Box>
            </Stack>
          

            {/* display upload progress when the progress is gt 0 */}
            {mediaLoading && ( <LinearProgress  />)}
           
            <FormHelperText sx={{ paddingTop: "10px" }}>Media Preview</FormHelperText>
            <Box sx={{ paddingTop: "10px" }}>
                <Stack direction="row" spacing={2} flexWrap="wrap" rowGap={2}>
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
