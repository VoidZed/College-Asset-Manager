import React, { useState } from 'react';
import {CircularProgress, Autocomplete, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department, organizedBy } from '../../utils/formData';
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'
import Action from '../Action';
import { batchYear } from '../../utils/forms';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { routes } from '../../utils/routes';
import ErrorPage from '../ErrorPage';
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage } from '../../services/uploadMediaService';
import { uploadFiles } from '../../services/uploadMediaService';
import {useSelector } from 'react-redux';
import { useIsMobile } from '../../theme/theme';
const IndustrialVisit = () => {
    const { activity_name } = useParams();
    const activity_item = 'industrial_visit';
    const activityData = routes[activity_name]; // Get activity data based on route
    
    // If activityData is undefined, show 404
    if (!activityData) {
        return <ErrorPage />;
    }
    
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item

    // If activityItemName is undefined, show 404
    if (!activityItemName) {
        return <ErrorPage />;
    }
  const isMobile=useIsMobile();
    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [organizedByValue, setOrganizedByValue] = useState(null);
    const authData = useSelector((state) => state.auth)
    
    //snackbar
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    
    //for submit logic
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        organized_by: '',
        start_date: null,
        end_date: null,
        organization: '',
        faculty_incharge: '',
        total_students: '',
        department: [],
    });

    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

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

    const resetForm = () => {
        // Reset form after successful submission
        setFormData({
            year: '',
            sem: '',
            organized_by: '',
            start_date: null,
            end_date: null,
            organization: '',
            faculty_incharge: '',
            total_students: '',
            department: [],
        });
        setOrganizedByValue(null);
        setImages([]);
        setPdfs([]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            // Update organized_by from Autocomplete
            formData.organized_by = organizedByValue || '';
            
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                activity_item,
                setMediaLoading
            );
            
            console.log("Upload Files: ", uploadedFiles.images, uploadedFiles.pdfs);
            
            // Prepare and submit the form
            const finalFormData = {
                ...formData,
                organized_by:organizedByValue,
                createdBy:authData.userId,
                images: uploadedFiles.images,
                pdfs: uploadedFiles.pdfs
            };
            console.log(finalFormData);
            
            const response = await axios.post('/api/industrial_visit', finalFormData, { withCredentials: true });
            console.log(response.data);
            
            if (response.status === 201) {
                setAlert({
                    open: true,
                    message: response.data.message || "Industrial visit data submitted successfully",
                    severity: 'success'
                });
                //resetForm();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting Industrial Visit form:", error);
            const err = getErrorMessage(error);
            setAlert({ open: true, message: err, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{  display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width:isMobile?'1005': '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white',  height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px",alignItems:'center' }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Industrial Visit</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '100' }}>{activityData.activity[activity_item] && activityData.activity[activity_item].description}</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a',mb:1 }} >
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {/* year */}
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
                                    {batchYear.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* sem */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="sem-select-label">Sem</InputLabel>
                                <Select
                                    labelId="sem-select-label"
                                    id="sem-select"
                                    label="Sem"
                                    name='sem'
                                    value={formData.sem}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Even">Even</MenuItem>
                                    <MenuItem value="Odd">Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* organized by */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <Autocomplete
                                freeSolo
                                options={organizedBy}
                                value={organizedByValue}
                                onChange={(event, newValue) => setOrganizedByValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Organized By" variant="outlined" required />}
                            />
                        </Grid>

                        {/* start Date */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formData.start_date}
                                        onChange={(date) => handleDateChange('start_date', date)}
                                        required
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* end Date */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="End Date"
                                        value={formData.end_date}
                                        onChange={(date) => handleDateChange('end_date', date)}
                                        required
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* faculty Incharge */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="faculty-input" label="Faculty Incharge" variant="outlined" name="faculty_incharge" value={formData.faculty_incharge} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        {/* organisation */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="org-input" label="Organisation/Industry" variant="outlined" name="organization" value={formData.organization} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        {/* total students */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="students-input"
                                    type="number"
                                    label="No of Students"
                                    variant="outlined"
                                    name="total_students"
                                    value={formData.total_students}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Ensure only positive integer values
                                        if (/^\d+$/.test(value) || value === "") {
                                            handleChange(e);
                                        }
                                    }}
                                    inputProps={{ min: "1" }}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* departments */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Select
                                    labelId="department-select-label"
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

                    {/* upload image component */}
                    <FormHelperText sx={{ marginTop: '15px' }}>Upload event photos and event report</FormHelperText>
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    >
                    </UploadImage>

                    <Button 
                        disabled={loading} 
                        type="submit" 
                        variant='contained' 
                        endIcon={!loading && <SendIcon />} 
                        sx={{ width: '120px' }}
                    >
                        {loading ? <CircularProgress size={25} sx={{ color: 'white' }} /> : 'Submit'}
                    </Button>
                </Box>
            </Box>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default IndustrialVisit;