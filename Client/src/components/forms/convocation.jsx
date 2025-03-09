import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Snackbar, Alert, Stack, FormLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'
import { batchYear } from "../../utils/forms"
import Action from '../Action';

function Convocation() {
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);

    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        date: null,
        chiefGuest: '',
        chiefGuestDesignation: '',
        presidingOfficer: '',
        presidingOfficerDesignation: '',
        guestOfHonour: '',
        overallTopper: ''
    });

    //function for handling the selection of files 
    //and storing in the image and pdf folder
    const handleFileSelect = (selectedFiles) => {
        const newImages = [];
        const newPdfs = [];
        let imageCount = images.length;
        let pdfCount = pdfs.length;

        for (let file of selectedFiles) {
            if (file.type.startsWith('image')) {
                if (file.size > MAX_IMAGE_SIZE) {
                    setAlert({ open: true, message: 'Image size exceeds 5MB', severity: 'error' });
                    continue;
                }
                if (imageCount >= MAX_IMAGES) {
                    setAlert({ open: true, message: `Cannot select more than ${MAX_IMAGES} images`, severity: 'error' });
                    break;
                }
                newImages.push(file);
                imageCount++;
            } else {
                if (file.size > MAX_PDF_SIZE) {
                    setAlert({ open: true, message: 'PDF size exceeds 10MB', severity: 'error' });
                    continue;
                }
                if (pdfCount >= MAX_PDFS) {
                    setAlert({ open: true, message: `Cannot select more than ${MAX_PDFS} PDFs`, severity: 'error' });
                    break;
                }
                newPdfs.push(file);
                pdfCount++;
            }
        }
        setImages(prev => [...prev, ...newImages]);
        setPdfs(prev => [...prev, ...newPdfs]);
    };


    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleRemovePdf = (index) => {
        setPdfs(pdfs.filter((_, i) => i !== index));
    };


    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setSnackbarOpen(true);
        setFormData({
            year: '',
            sem: '',
            date: null,
            chiefGuest: '',
            chiefGuestDesignation: '',
            presidingOfficer: '',
            presidingOfficerDesignation: '',
            guestOfHonour: '',
            overallTopper: ''
        });
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action />
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Convocation</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a' }}>* Please fill all details carefully</FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>

                        {/* year */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Year</InputLabel>
                                <Select name='year' label='Year' value={formData.year} onChange={handleChange}>{batchYear.map((year, index) => (<MenuItem key={index} value={year}>{year}</MenuItem>))}</Select>
                            </FormControl>
                        </Grid>

                        {/* sem */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Semester</InputLabel>
                                <Select label='Semester' name='sem' value={formData.sem} onChange={handleChange}>
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select></FormControl>
                        </Grid>

                        {/* date */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth><LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Date" value={formData.date} onChange={handleDateChange} />
                            </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* guest of honour */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Guest of Honour" name='guestOfHonour' value={formData.guestOfHonour} onChange={handleChange} required />
                        </Grid>

                        {/* presiding officer */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Presiding Officer" name='presidingOfficer' value={formData.presidingOfficer} onChange={handleChange} required />
                        </Grid>

                        {/* offiver designation */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Presiding Officer Designation" name='presidingOfficerDesignation' value={formData.presidingOfficerDesignation} onChange={handleChange} required />
                        </Grid>

                        {/* chief guest */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>

                            <TextField fullWidth label="Chief Guest" name='chiefGuest' value={formData.chiefGuest} onChange={handleChange} required />
                        </Grid>

                        {/* chief designation */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Chief Guest Designation" name='chiefGuestDesignation' value={formData.chiefGuestDesignation} onChange={handleChange} required />
                        </Grid>


                        {/* over all topper */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Overall Topper" name='overallTopper' value={formData.overallTopper} onChange={handleChange} required />
                        </Grid>
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    >

                    </UploadImage>
                    <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>
                </Box>
            </Box>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default Convocation;
