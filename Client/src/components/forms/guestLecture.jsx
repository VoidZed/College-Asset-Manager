import React, { useState } from 'react';
import { CircularProgress, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"

import {useSelector } from 'react-redux';
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'
import ErrorPage from '../ErrorPage';
import { batchYear } from "../../utils/forms"
import Action from '../Action';

import { useParams } from 'react-router-dom';

import { routes } from "../../utils/routes"

import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import axios from "axios";
import { useIsMobile } from '../../theme/theme';
// uploadMedia Service
import { uploadFiles } from '../../services/uploadMediaService';



function GuestLectureForm() {

    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    //for submit logic
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        title: '',
        date: null,
        speaker: '',
        speaker_org: '',
        total_student: '',
        batch: '',
        mode: '',
        department: [],
    });

  const isMobile=useIsMobile();
    const { activity_name, activity_item } = useParams();
    const authData = useSelector((state) => state.auth)

    const activityData = routes[activity_name]; // Get activity data based on route
    // If activityData    or activityName adata is undefined, show 404
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item
    console.log("Activity Item Name: ", activityItemName);
    console.log("Activity Data: ", activityData);
    console.log("Activity Name: ", activity_name);
    console.log("Activity Item: ", activity_item);
    // If activityItemName is undefined, show 404
    if (!activityItemName) {
        return (

            <ErrorPage />
        );
    }






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

    const handleDeptChange = (event) => {
        setFormData({ ...formData, department: event.target.value });
    };




    /// Handle form submission
    const handleFormSubmit = async (event) => {

        //function for uploading form data to the server
        event.preventDefault();
        setLoading(true);

        try {
            // Upload files using the service
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                activity_item, // Make sure this is defined in your component
                setMediaLoading
            );


            console.log("Upload Files111: ",uploadedFiles.images,uploadedFiles.pdfs);

            // if (!uploadedFiles ||
            //     (!uploadedFiles.images.length && !uploadedFiles.pdfs.length)) {
            //     throw new Error("No files were uploaded successfully");
            // }

            // Prepare and submit the form
            const finalFormData = {
                ...formData,
                images: uploadedFiles.images,
                createdBy:authData.userId,
                pdfs: uploadedFiles.pdfs
            };

            const response = await axios.post(
                "/api/guest_lecture",
                { formData: finalFormData },
                { withCredentials: true }
            );

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
            console.error("Form Submission Error:", error);

            // Set a single alert with the specific error message
            setAlert({
                open: true,
                message: error.message||"Error submitting form",
                severity: 'error'
            });

        } finally {
            setLoading(false);
        }
    };




    // Reset form data
    const resetForm = () => {
        setFormData({
            year: '',
            sem: '',
            title: '',
            date: null,
            speaker: '',
            speaker_org: '',
            total_student: '',
            batch: '',
            mode: '',
            department: [],
        });
        setImages([]);
        setPdfs([]);
    }








    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{  display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width:isMobile?'100%':'70%', paddingTop: '10px', marginBottom: '30px' }}>
                    {/* <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Guest Lecture</Typography> */}
                    <Stack direction='row' spacing={2} sx={{ color: 'white',  height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px",alignItems:'center' }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>{activityItemName.name}</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a',mb:1}} >
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
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
                            <FormControl fullWidth required >
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

                        {/* title */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth  >
                                <TextField required id="name-input" label="Title" variant="outlined" name='title' value={formData.title} onChange={handleChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth  required >
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        required
                                        label="Select Date"
                                        value={formData.date}
                                        onChange={handleDateChange}

                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        {/* speaker name */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField required id="name-input" label="Speaker Name" variant="outlined" name="speaker" value={formData.speaker} onChange={handleChange} />
                            </FormControl>
                        </Grid>

                        {/* speaker organisation */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField required id="name-input" label="Speaker Organisation" variant="outlined" name="speaker_org" value={formData.speaker_org} onChange={handleChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth  >
                                <TextField
                                    required
                                    id="name-input"
                                    type="number"
                                    label="No of Students"
                                    variant="outlined"
                                    name="total_student"
                                    value={formData.total_student}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        // Ensure only positive integer values
                                        if (/^\d+$/.test(value) || value === "") {
                                            handleChange(e);
                                        }
                                    }}
                                    inputProps={{ min: "1" }} // Ensure only positive values are entered

                                />

                            </FormControl>
                        </Grid>
                        {/* student year */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required >
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
                        {/* mode */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required >
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

                        {/* departments */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required  >
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

export default GuestLectureForm;








// import React, { useState } from 'react';
// import {
//     CircularProgress, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select,
//     TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack,
//     Card, CardContent
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { department } from '../../utils/formData';
// import { navbarColor, sidebarBgcolor } from '../../utils/color';
// import { activityDisplayInternalPadding } from "../../utils/dimension";

// import UploadImage from './uploadImage';
// import SendIcon from '@mui/icons-material/Send';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CardLogo from '../../assets/job.png';
// import ErrorPage from '../ErrorPage';
// import { batchYear } from "../../utils/forms";
// import Action from '../Action';

// import { useParams } from 'react-router-dom';
// import { routes } from "../../utils/routes";
// import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
// import axios from "axios";

// // uploadMedia Service
// import { uploadFiles } from '../../services/uploadMediaService';

// function GuestLectureForm() {
//     const [loading, setLoading] = useState(false);
//     const [mediaLoading, setMediaLoading] = useState(false);
//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
//     const [images, setImages] = useState([]);
//     const [pdfs, setPdfs] = useState([]);
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         year: '',
//         sem: '',
//         title: '',
//         date: null,
//         speaker: '',
//         speaker_org: '',
//         total_student: '',
//         batch: '',
//         mode: '',
//         department: [],
//     });
//     const [success, setSuccess] = useState(false);

//     const { activity_name, activity_item } = useParams();
//     const activityData = routes[activity_name];
//     const activityItemName = activityData?.activity[activity_item];

//     if (!activityItemName) {
//         return <ErrorPage />;
//     }

//     const handleFileSelect = (selectedFiles) => {
//         const newImages = [];
//         const newPdfs = [];
//         let imageCount = images.length;
//         let pdfCount = pdfs.length;

//         for (let file of selectedFiles) {
//             if (file.type.startsWith('image')) {
//                 if (file.size > MAX_IMAGE_SIZE) {
//                     setAlert({ open: true, message: `Image size exceeds ${MAX_IMAGE_SIZE / 1000000}MB`, severity: 'error' });
//                     continue;
//                 }
//                 if (imageCount >= MAX_IMAGES) {
//                     setAlert({ open: true, message: `Cannot select more than ${MAX_IMAGES} images`, severity: 'error' });
//                     break;
//                 }
//                 newImages.push(file);
//                 imageCount++;
//             } else if (file.type === 'application/pdf') {
//                 if (file.size > MAX_PDF_SIZE) {
//                     setAlert({ open: true, message: `PDF size exceeds ${MAX_PDF_SIZE / 1000000}MB`, severity: 'error' });
//                     continue;
//                 }
//                 if (pdfCount >= MAX_PDFS) {
//                     setAlert({ open: true, message: `Cannot select more than ${MAX_PDFS} PDFs`, severity: 'error' });
//                     break;
//                 }
//                 newPdfs.push(file);
//                 pdfCount++;
//             } else {
//                 setAlert({ open: true, message: 'Only images and PDFs are accepted', severity: 'error' });
//             }
//         }
//         setImages(prev => [...prev, ...newImages]);
//         setPdfs(prev => [...prev, ...newPdfs]);
//     };

//     const handleRemoveImage = (index) => {
//         setImages(images.filter((_, i) => i !== index));
//     };

//     const handleRemovePdf = (index) => {
//         setPdfs(pdfs.filter((_, i) => i !== index));
//     };

//     const handleCloseAlert = (reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setAlert({ ...alert, open: false });
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });

//         // Clear error when field is filled
//         if (errors[name]) {
//             setErrors({ ...errors, [name]: null });
//         }
//     };

//     const handleDateChange = (date) => {
//         setFormData({ ...formData, date: date });
//         if (errors.date) {
//             setErrors({ ...errors, date: null });
//         }
//     };

//     const handleDeptChange = (event) => {
//         setFormData({ ...formData, department: event.target.value });
//         if (errors.department) {
//             setErrors({ ...errors, department: null });
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Required fields validation
//         const requiredFields = [
//             'year', 'sem', 'title', 'date', 'speaker',
//             'speaker_org', 'total_student', 'batch', 'mode'
//         ];

//         requiredFields.forEach(field => {
//             if (!formData[field]) {
//                 newErrors[field] = 'This field is required';
//                 isValid = false;
//             }
//         });

//         // Department validation
//         if (!formData.department.length) {
//             newErrors.department = 'Please select at least one department';
//             isValid = false;
//         }

//         // Number validation
//         if (formData.total_student && parseInt(formData.total_student) <= 0) {
//             newErrors.total_student = 'Number of students must be greater than 0';
//             isValid = false;
//         }

//         // Files validation
//         if (images.length === 0 && pdfs.length === 0) {
//             setAlert({
//                 open: true,
//                 message: "Please upload at least one image or document",
//                 severity: 'error'
//             });
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Upload files using the service
//             const uploadedFiles = await uploadFiles(
//                 images,
//                 pdfs,
//                 activity_item,
//                 setMediaLoading
//             );

//             if (!uploadedFiles || (!uploadedFiles.images.length && !uploadedFiles.pdfs.length)) {
//                 throw new Error("Please upload at least one image or PDF");
//             }

//             // Prepare and submit the form
//             const finalFormData = {
//                 ...formData,
//                 images: uploadedFiles.images,
//                 pdfs: uploadedFiles.pdfs
//             };

//             const response = await axios.post(
//                 "/api/guest_lecture",
//                 { formData: finalFormData },
//                 { withCredentials: true }
//             );

//             if (response.status === 201) {
//                 setSuccess(true);
//                 setAlert({
//                     open: true,
//                     message: response.data.message || "Guest lecture details submitted successfully!",
//                     severity: 'success'
//                 });

//                 // Reset form after a delay
//                 setTimeout(() => {
//                     resetForm();
//                     setSuccess(false);
//                 }, 3000);
//             } else {
//                 throw new Error("Form submission failed");
//             }

//         } catch (error) {
//             console.error("Form Submission Error:", error);
//             setAlert({
//                 open: true,
//                 message: error.message || "An error occurred while submitting the form",
//                 severity: 'error'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setFormData({
//             year: '',
//             sem: '',
//             title: '',
//             date: null,
//             speaker: '',
//             speaker_org: '',
//             total_student: '',
//             batch: '',
//             mode: '',
//             department: [],
//         });
//         setImages([]);
//         setPdfs([]);
//         setErrors({});
//     };

//     return (
//         <Paper sx={{
//             height: '100%',
//             overflowY: 'auto',
//             padding: activityDisplayInternalPadding,
//             bgcolor: navbarColor,
//             borderTopLeftRadius: "20px"
//         }}>
//             <Action />

//             {success ? (
//                 <Box sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '70vh',
//                     textAlign: 'center',
//                     padding: 3
//                 }}>
//                     <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
//                     <Typography variant="h4" gutterBottom>
//                         Successfully Submitted!
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 3 }}>
//                         Your guest lecture information has been recorded.
//                     </Typography>
//                 </Box>
//             ) : (
//                 <Box sx={{
//                     padding: 2,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     width: '100%'
//                 }}>
//                     <Box component="form" onSubmit={handleFormSubmit} sx={{
//                         width: '100%',
//                         maxWidth: '900px',
//                         paddingTop: '10px',
//                         marginBottom: '30px'
//                     }}>
//                         <Stack
//                             direction='row'
//                             spacing={2}
//                             sx={{
//                                 color: 'white',
//                                 width: '100%',
//                                 minHeight: '80px',
//                                 background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
//                                 marginTop: '20px',
//                                 marginBottom: "15px",
//                                 fontWeight: 'bold',
//                                 fontSize: '15px',
//                                 borderRadius: '5px',
//                                 padding: "20px",
//                                 alignItems: 'center'
//                             }}
//                         >
//                             <Box>
//                                 <img src={CardLogo} alt="card logo" height='50px' />
//                             </Box>
//                             <Box>
//                                 <Typography variant='h5' color='white'>{activityItemName.name}</Typography>
//                                 <Typography variant='body2' sx={{ fontWeight: '100' }}>
//                                     Complete all fields marked with * and submit supporting documents
//                                 </Typography>
//                             </Box>
//                         </Stack>

//                         <Card sx={{ p: 2, mb: 3, bgcolor: '#f7f7f7' }}>
//                             <CardContent sx={{ p: 1 }}>
//                                 <Typography variant="subtitle2" gutterBottom>
//                                     Required Information
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Please fill all details carefully. Fields marked with * are required.
//                                 </Typography>
//                             </CardContent>
//                         </Card>

//                         <Grid container spacing={3} sx={{ width: '100%' }}>
//                             {/* Year and Semester */}
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.year}>
//                                     <InputLabel id="year-select-label">Academic Year</InputLabel>
//                                     <Select
//                                         labelId="year-select-label"
//                                         id="year-select"
//                                         label="Academic Year"
//                                         name='year'
//                                         value={formData.year}
//                                         onChange={handleChange}
//                                     >
//                                         {batchYear.map((year, index) => (
//                                             <MenuItem key={index} value={year}>{year}</MenuItem>
//                                         ))}
//                                     </Select>
//                                     {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.sem}>
//                                     <InputLabel id="sem-select-label">Semester</InputLabel>
//                                     <Select
//                                         labelId="sem-select-label"
//                                         id="sem-select"
//                                         label="Semester"
//                                         name='sem'
//                                         value={formData.sem}
//                                         onChange={handleChange}
//                                     >
//                                         <MenuItem value={"Even"}>Even</MenuItem>
//                                         <MenuItem value={"Odd"}>Odd</MenuItem>
//                                     </Select>
//                                     {errors.sem && <FormHelperText>{errors.sem}</FormHelperText>}
//                                 </FormControl>
//                             </Grid>

//                             {/* Title and Date */}
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.title}>
//                                     <TextField
//                                         id="title-input"
//                                         label="Lecture Title"
//                                         variant="outlined"
//                                         name='title'
//                                         value={formData.title}
//                                         onChange={handleChange}
//                                         placeholder="Enter the title of the lecture"
//                                         helperText={errors.title}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.date}>
//                                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                         <DatePicker
//                                             label="Event Date"
//                                             value={formData.date}
//                                             onChange={handleDateChange}
//                                             slotProps={{
//                                                 textField: {
//                                                     helperText: errors.date,
//                                                     placeholder: "Select event date"
//                                                 }
//                                             }}
//                                         />
//                                     </LocalizationProvider>
//                                 </FormControl>
//                             </Grid>

//                             {/* Speaker Information */}
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.speaker}>
//                                     <TextField
//                                         id="speaker-input"
//                                         label="Speaker Name"
//                                         variant="outlined"
//                                         name="speaker"
//                                         value={formData.speaker}
//                                         onChange={handleChange}
//                                         placeholder="Full name of the guest speaker"
//                                         helperText={errors.speaker}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.speaker_org}>
//                                     <TextField
//                                         id="org-input"
//                                         label="Speaker Organisation"
//                                         variant="outlined"
//                                         name="speaker_org"
//                                         value={formData.speaker_org}
//                                         onChange={handleChange}
//                                         placeholder="Company, university or institution"
//                                         helperText={errors.speaker_org}
//                                     />
//                                 </FormControl>
//                             </Grid>

//                             {/* Student Information */}
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.total_student}>
//                                     <TextField
//                                         id="students-input"
//                                         type="number"
//                                         label="No of Students"
//                                         variant="outlined"
//                                         name="total_student"
//                                         value={formData.total_student}
//                                         onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (/^\d+$/.test(value) || value === "") {
//                                                 handleChange(e);
//                                             }
//                                         }}
//                                         inputProps={{ min: "1" }}
//                                         placeholder="Total number of attendees"
//                                         helperText={errors.total_student}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.batch}>
//                                     <InputLabel id="batch-select-label">Student Year</InputLabel>
//                                     <Select
//                                         labelId="batch-select-label"
//                                         id="batch-select"
//                                         label="Student Year"
//                                         name="batch"
//                                         value={formData.batch}
//                                         onChange={handleChange}
//                                     >
//                                         <MenuItem value='1'>1st Year</MenuItem>
//                                         <MenuItem value='2'>2nd Year</MenuItem>
//                                         <MenuItem value='3'>3rd Year</MenuItem>
//                                         <MenuItem value='4'>4th Year</MenuItem>
//                                         <MenuItem value='Multiple'>Multiple Years</MenuItem>
//                                     </Select>
//                                     {errors.batch && <FormHelperText>{errors.batch}</FormHelperText>}
//                                 </FormControl>
//                             </Grid>

//                             {/* Mode and Department */}
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.mode}>
//                                     <InputLabel id="mode-select-label">Mode</InputLabel>
//                                     <Select
//                                         labelId="mode-select-label"
//                                         id="mode-select"
//                                         label="Mode"
//                                         name="mode"
//                                         value={formData.mode}
//                                         onChange={handleChange}
//                                     >
//                                         <MenuItem value={"Online"}>Online</MenuItem>
//                                         <MenuItem value={"Offline"}>Offline</MenuItem>
//                                         <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
//                                     </Select>
//                                     {errors.mode && <FormHelperText>{errors.mode}</FormHelperText>}
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth required error={!!errors.department}>
//                                     <InputLabel id="department-select-label">Department</InputLabel>
//                                     <Select
//                                         labelId="department-select-label"
//                                         id="department-select"
//                                         label="Department"
//                                         multiple
//                                         name="department"
//                                         value={formData.department}
//                                         onChange={handleDeptChange}
//                                         renderValue={(selected) => (
//                                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                                 {selected.map((value) => (
//                                                     <Chip key={value} label={value} size="small" />
//                                                 ))}
//                                             </Box>
//                                         )}
//                                     >
//                                         {department.map((dept) => (
//                                             <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                                         ))}
//                                     </Select>
//                                     <FormHelperText>
//                                         {errors.department || "Select multiple departments if applicable"}
//                                     </FormHelperText>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>

//                         <Divider sx={{ my: 4 }} />

//                         {/* File Upload Section */}
//                         <Box sx={{ mb: 2 }}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Upload Documentation
//                             </Typography>
//                             <FormHelperText sx={{ mb: 2 }}>
//                                 Upload event photos and event report (at least one file required)
//                             </FormHelperText>

//                             <UploadImage
//                                 images={images}
//                                 pdfs={pdfs}
//                                 handleFileSelect={handleFileSelect}
//                                 handleRemoveImage={handleRemoveImage}
//                                 handleRemovePdf={handleRemovePdf}
//                                 mediaLoading={mediaLoading}
//                             />
//                         </Box>

//                         {/* Submit Button */}
//                         <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
//                             <Button
//                                 variant="outlined"
//                                 onClick={resetForm}
//                                 disabled={loading}
//                             >
//                                 Reset Form
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 disabled={loading}
//                                 endIcon={!loading && <SendIcon />}
//                                 sx={{ px: 4 }}
//                             >
//                                 {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             )}

//             <Snackbar
//                 open={alert.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseAlert}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={handleCloseAlert}
//                     severity={alert.severity}
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     {alert.message}
//                 </Alert>
//             </Snackbar>
//         </Paper>
//     );
// }

// export default GuestLectureForm;