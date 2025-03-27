import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Divider, Paper, FormHelperText, Snackbar, Alert, Stack, CircularProgress, Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png';
import { batchYear } from "../../utils/forms";
import Action from '../Action';
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage } from '../../services/uploadMediaService';
import { uploadFiles } from '../../services/uploadMediaService';
import axios from 'axios';
import { routes } from '../../utils/routes';
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router-dom';
import {useSelector } from 'react-redux';

const dayCelebrationEvents = ["Republic Day", "Independence Day", "Gandhi Jayanti", "Vishwakarma Puja", "Engineers Day", "Pharmacy Day"]

function DayCelebration() {
    const { activity_name } = useParams();
    const activity_item = 'day_celebration';
    const activityData = routes[activity_name];

    if (!activityData || !activityData.activity || !activityData.activity[activity_item]) {
        return <ErrorPage />;
    }
    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [eventValue, setEventValue] = useState("")
    const authData = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        date: null,
        event: '',
        year: '',
        sem: '',
    });

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

    const handleFormSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                'day_celebration',
                setMediaLoading
            );

            const finalFormData = {
                ...formData,
                event: eventValue,
                images: uploadedFiles.images,
                createdBy:authData.userId,
                pdfs: uploadedFiles.pdfs
            };

            const response = await axios.post('/api/day_celebration', finalFormData, { withCredentials: true });

            if (response.status === 201) {
                setAlert({
                    open: true,
                    message: response.data.message || "Form submitted successfully",
                    severity: 'success'
                });
                resetForm();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting Day Celebration form:", error);
            const err = getErrorMessage(error);
            setAlert({ open: true, message: err, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ date: null, event: '', year: '', sem: '' });
        setImages([]);
        setPdfs([]);
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action />
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Day Celebration</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, a?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a',mb:1 }}>* Please fill all details carefully</FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Year</InputLabel>
                                <Select name='year' value={formData.year} onChange={handleChange}>{batchYear.map((year, index) => (<MenuItem key={index} value={year}>{year}</MenuItem>))}</Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Semester</InputLabel>
                                <Select name='sem' value={formData.sem} onChange={handleChange}>
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date" value={formData.date} onChange={handleDateChange} />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={6} lg={6}>

                            <Autocomplete
                                freeSolo
                                options={dayCelebrationEvents}
                                value={eventValue}
                                onChange={(event, newValue) => setEventValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Event" variant="outlined" required />}
                            />
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
                    />
                    <Button disabled={loading} type="submit" variant='contained' endIcon={!loading && <SendIcon />} sx={{ width: '120px' }}>{loading ? <CircularProgress size={25} sx={{ color: 'white' }} /> : 'Submit'}</Button>
                </Box>
            </Box>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default DayCelebration;