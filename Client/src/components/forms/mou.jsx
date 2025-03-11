import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack, Autocomplete, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department, organizedBy } from '../../utils/formData';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"

import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'

import { batchYear } from "../../utils/forms"
import Action from '../Action';
import axios from "axios";
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage } from '../../services/uploadMediaService';
import { uploadFiles } from '../../services/uploadMediaService';
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router-dom';
import { routes } from '../../utils/routes';


const mou = () => {

    const { activity_name } = useParams();
    const activity_item = 'mou';
    const activityData = routes[activity_name];

    if (!activityData || !activityData.activity || !activityData.activity[activity_item]) {
        return <ErrorPage />;
    }


    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);

    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    //snackbar
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [organizedByValue, setOrganizedByValue] = useState(null);

    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    //for submit logic
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        party1: '',
        party2: '',
        department: [],
        start_date: null,
        end_date: null,
        objective: '',
        responsibilities_party1: '',
        responsibilities_party2: '',
        jurisdiction: '',
        signatory1: '',
        designation1: '',
        signatory2: '',
        designation2: '',
        organized_by: '',
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
                'mou',
                setMediaLoading
            );

            const finalFormData = {
                ...formData,
                images: uploadedFiles.images,
                pdfs: uploadedFiles.pdfs
            };

            const response = await axios.post('/api/mou', finalFormData, { withCredentials: true });

            if (response.status === 201) {
                setAlert({
                    open: true,
                    message: response.data.message || "Form submitted successfully",
                    severity: 'success'
                });
                //reset the form on submission
                resetForm();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting MOU form:", error);
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
            party1: '',
            party2: '',
            department: [],
            start_date: null,
            end_date: null,
            objective: '',
            responsibilities_party1: '',
            responsibilities_party2: '',
            jurisdiction: '',
            signatory1: '',
            designation1: '',
            signatory2: '',
            designation2: '',
            organized_by: '',
        });
        setImages([]);
        setPdfs([]);
    }

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Memorandum Of Understanding</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a', marginBottom: '10px' }} >
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
                                <InputLabel id="department-select-label">Sem</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Sem"
                                    name='sem'
                                    value={formData.sem}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Even"}>Even</MenuItem>
                                    <MenuItem value={"Odd"}>Odd</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* party1 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="party1-input" label="Party 1" variant="outlined" name='party1' value={formData.party1} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        {/* party2 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="party2-input" label="Party 2" variant="outlined" name='party2' value={formData.party2} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        {/* organized by */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="organized_by">Organizing Body</InputLabel>
                                <Select
                                    label='Organizing Body'
                                    name='organized_by'
                                    value={formData.organized_by}
                                    onChange={handleChange}
                                >
                                    {

                                        organizedBy.map((org, index) => {
                                            return (
                                                <MenuItem key={index} value={org}>{org}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* departments */}
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

    

                        {/* start date */}
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

                        {/* end date */}
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

                        {/* objective */}
                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="objective-input"
                                    label="Objective"
                                    variant="outlined"
                                    name="objective"
                                    value={formData.objective}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* responsibilities party1 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="responsibilities-party1-input"
                                    label="Responsibilities of Party 1"
                                    variant="outlined"
                                    name="responsibilities_party1"
                                    value={formData.responsibilities_party1}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* responsibilities party2 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="responsibilities-party2-input"
                                    label="Responsibilities of Party 2"
                                    variant="outlined"
                                    name="responsibilities_party2"
                                    value={formData.responsibilities_party2}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* jurisdiction */}
                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="jurisdiction-input"
                                    label="Jurisdiction"
                                    variant="outlined"
                                    name="jurisdiction"
                                    value={formData.jurisdiction}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* signatory1 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="signatory1-input"
                                    label="Signatory 1"
                                    variant="outlined"
                                    name="signatory1"
                                    value={formData.signatory1}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* designation1 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="designation1-input"
                                    label="Designation 1"
                                    variant="outlined"
                                    name="designation1"
                                    value={formData.designation1}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* signatory2 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="signatory2-input"
                                    label="Signatory 2"
                                    variant="outlined"
                                    name="signatory2"
                                    value={formData.signatory2}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* designation2 */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="designation2-input"
                                    label="Designation 2"
                                    variant="outlined"
                                    name="designation2"
                                    value={formData.designation2}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

                    {/* upload image component */}
                    <FormHelperText sx={{ marginTop: '15px' }}>Upload MOU documents and related files</FormHelperText>
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    >
                    </UploadImage>

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

export default mou;