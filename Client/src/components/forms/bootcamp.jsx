import React, { useState } from 'react';
import { Autocomplete, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Snackbar, Alert, Stack, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department, organizedBy } from '../../utils/formData';
import { navbarColor} from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"
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
import { useIsMobile } from '../../theme/theme';



const Bootcamp = () => {

    const { activity_name } = useParams();
    const activity_item = 'bootcamp';
    const activityData = routes[activity_name];
    const authData = useSelector((state) => state.auth)

    if (!activityData || !activityData.activity || !activityData.activity[activity_item]) {
        return <ErrorPage />;
    }

    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [organizedByValue, setOrganizedByValue] = useState('');

    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        title: '',
        start_date: null,
        end_date: null,
        organized_by: '',
        speaker: '',
        speaker_org: '',
        collaboration_org: '',
        total_students: '',
        batch: '',
        mode: '',
        department: [],
    });
  const isMobile=useIsMobile();
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleDeptChange = (event) => {
        setFormData({ ...formData, department: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                'bootcamp',
                setMediaLoading
            );

            const finalFormData = {
                ...formData,
                organized_by: organizedByValue,
                createdBy:authData.userId,
                images: uploadedFiles.images,
                pdfs: uploadedFiles.pdfs
            };

            const response = await axios.post('/api/bootcamp', finalFormData, { withCredentials: true });

            if (response.status === 201) {
                setAlert({
                    open: true,
                    message: response.data.message || "Form submitted successfully",
                    severity: 'success'
                });
               // resetForm();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting Bootcamp form:", error);
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
            organized_by: '',
            speaker: '',
            speaker_org: '',
            collaboration_org: '',
            total_students: '',
            batch: '',
            mode: '',
            department: [],
        });
        setImages([]);
        setPdfs([]);
        setOrganizedByValue('');
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width:isMobile?'100%':'70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px",alignItems:'center' }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>BootCamp</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a',mb:1}}>
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="year-select-label">Year</InputLabel>
                                <Select labelId="year-select-label" id="year-select" label="Year" name='year' value={formData.year} onChange={handleChange}>
                                    {batchYear.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Sem</InputLabel>
                                <Select labelId="department-select-label-id" id="department-select" label="Sem" name='sem' value={formData.sem} onChange={handleChange}>
                                    <MenuItem value={"Even"}>Even</MenuItem>
                                    <MenuItem value={"Odd"}>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <Autocomplete
                                freeSolo
                                options={organizedBy}
                                value={organizedByValue}
                                onChange={(event, newValue) => setOrganizedByValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Organized By" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Title" variant="outlined" name='title' value={formData.title} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select Date"
                                        value={formData.start_date}
                                        onChange={(date) => handleDateChange('start_date', date)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select Date"
                                        value={formData.end_date}
                                        onChange={(date) => handleDateChange('end_date', date)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="In Collabration with" variant="outlined" name="collaboration_org" value={formData.collaboration_org} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Speaker Name" variant="outlined" name="speaker" value={formData.speaker} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Speaker Organisation" variant="outlined" name="speaker_org" value={formData.speaker_org} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    id="name-input"
                                    type="number"
                                    label="No of Students"
                                    variant="outlined"
                                    name="total_students"
                                    value={formData.total_students}
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

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Batch</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Batch"
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='1'>1st</MenuItem>
                                    <MenuItem value='2'>2nd</MenuItem>
                                    <MenuItem value='3'>3rd</MenuItem>
                                    <MenuItem value='4'>4th</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Mode</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Mode"
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Online"}>Online</MenuItem>
                                    <MenuItem value={"Offline"}>Offline</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Department"
                                    multiple
                                    name="department"
                                    value={formData.department}
                                    onChange={handleDeptChange}
                                >
                                    {department.map((dept) => (
                                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Select Multiple Departments</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

                    <FormHelperText sx={{ marginTop: '15px' }}>Upload event photos and event report</FormHelperText>
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

export default Bootcamp;