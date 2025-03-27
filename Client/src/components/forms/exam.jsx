import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Snackbar, Alert, Stack, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'
import { batchYear } from "../../utils/forms"
import Action from '../Action';
import { exam_types } from '../../utils/formData';
import { routes } from '../../utils/routes';
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage } from '../../services/uploadMediaService';
import { uploadFiles } from '../../services/uploadMediaService';
import axios from "axios";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { addNotification, createNotification } from '../../store/notificationSlice';

function Exam() {


    const { activity_name } = useParams();
    const activity_item = 'important_exam';
    const activityData = routes[activity_name];

    if (!activityData || !activityData.activity || !activityData.activity[activity_item]) {
        return <ErrorPage />;
    }
    const notifications = useSelector((state) => state.notification)

    const authData = useSelector((state) => state.auth)





    const dispatch = useDispatch();



    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [exam, setExam] = useState(null);

    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        exam_type: '',
        date: null,

        total_participants: '',
        qualified_students: [],

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
        if (name === "qualified_students") {
            setFormData({ ...formData, [name]: value.split(',') });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleFormSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                'important_exam',
                setMediaLoading
            );

            const finalFormData = {
                ...formData,
                exam_type: exam,
                images: uploadedFiles.images,
                createdBy:authData.userId,
                pdfs: uploadedFiles.pdfs,
            };

            const response = await axios.post('/api/important_exam', finalFormData, { withCredentials: true });

            if (response.status === 201) {
                setAlert({
                    open: true,
                    message: response.data.message || "Form submitted successfully",
                    severity: 'success'
                });

                // set the notification state up
                const role = authData.role
                const user = authData.user
                console.log(response.data.data)
                const link = `/${activity_name}/${activity_item}/${response.data.data._id}`
                const msg = `Post added in ${activity_item.toUpperCase()} by ${user}`

                dispatch(createNotification({ role, link, msg }))
                // resetForm();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting Exam form:", error);
            const err = getErrorMessage(error);
            setAlert({ open: true, message: err, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            year: '',
            sem: '',
            title: '',
            start_date: null,
            end_date: null,
            total_participants: '',
            total_events: '',
            aamod_cup: ''
        });
        setImages([]);
        setPdfs([]);
    };






    console.log("Notifications: ", notifications)
    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Exam of National Importance</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a',mb:1 }} >
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required >
                                <InputLabel id="year-select-label">Year</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    id="year-select"
                                    label="Year"
                                    name='year'
                                    value={formData.year}
                                    onChange={handleChange}
                                >
                                    {batchYear && batchYear.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Sem</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Sem"
                                    name='sem'
                                    value={formData.sem}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* exam type */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <Autocomplete
                                freeSolo
                                label="aaa"
                                options={exam_types}

                                onChange={(event, newValue) => setExam(newValue)}
                                renderInput={(params) => <TextField {...params} label="Exam Type" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={formData.date}
                                        onChange={(date) => handleDateChange('date', date)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Qualified Students"
                                    name='qualified_students'
                                    value={formData.qualified_students}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>
                        </Grid>



                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="total_participants"
                                    type="number"
                                    label="Total Participants"
                                    variant="outlined"
                                    name="total_participants"
                                    value={formData.total_participants}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d+$/.test(value) || value === "") {
                                            handleChange(e);
                                        }
                                    }}
                                    inputProps={{ min: "1" }}
                                    required
                                />
                            </FormControl>
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
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}</Alert>
            </Snackbar>
        </Paper>
    );
}

export default Exam;