// import React, { useState } from 'react';
// import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { navbarColor, sidebarBgcolor } from '../../utils/color';
// import { activityDisplayInternalPadding } from "../../utils/dimension"
// import UploadImage from './uploadImage';
// import SendIcon from '@mui/icons-material/Send';
// import CardLogo from '../../assets/job.png'
// import { batchYear } from "../../utils/forms"
// import Action from '../Action';

// function Zest() {
//     const [mediaLoading, setMediaLoading] = useState(false);
//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
//     const [images, setImages] = useState([]);
//     const [pdfs, setPdfs] = useState([]);

//     //for submit logic
//     const [formData, setFormData] = useState({
//         year: '',
//         sem: '',
//         title: '',
//         start_date: null,
//         end_date: null,
//         total_participants: '',
//         total_events: '',
//         special_event: ''

//     });
//     //function for handling the selection of files 
//     //and storing in the image and pdf folder
//     const handleFileSelect = (selectedFiles) => {
//         const newImages = [];
//         const newPdfs = [];
//         let imageCount = images.length;
//         let pdfCount = pdfs.length;

//         for (let file of selectedFiles) {
//             if (file.type.startsWith('image')) {
//                 if (file.size > MAX_IMAGE_SIZE) {
//                     setAlert({ open: true, message: 'Image size exceeds 5MB', severity: 'error' });
//                     continue;
//                 }
//                 if (imageCount >= MAX_IMAGES) {
//                     setAlert({ open: true, message: `Cannot select more than ${MAX_IMAGES} images`, severity: 'error' });
//                     break;
//                 }
//                 newImages.push(file);
//                 imageCount++;
//             } else {
//                 if (file.size > MAX_PDF_SIZE) {
//                     setAlert({ open: true, message: 'PDF size exceeds 10MB', severity: 'error' });
//                     continue;
//                 }
//                 if (pdfCount >= MAX_PDFS) {
//                     setAlert({ open: true, message: `Cannot select more than ${MAX_PDFS} PDFs`, severity: 'error' });
//                     break;
//                 }
//                 newPdfs.push(file);
//                 pdfCount++;
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
//     };

//     const handleDateChange = (name, date) => {
//         setFormData({ ...formData, [name]: date });
//     };


//     const handleFormSubmit = (event) => {
//         event.preventDefault();

//         //after subit form will reset
//         // setFormData({
//         //     year: '',
//         //     sem: '',
//         //     title: '',
//         //     startDate: null,
//         //     endDate: null,
//         //     totalParticipants:'',
//         //     totalEvents:'',
//         //     specialEvent:''


//         // });
//         console.log(formData);
//         setSnackbarOpen(true);

//     };






//     return (
//         <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
//             <Action></Action>

//             <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
//                 <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
//                     {/* <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Guest Lecture</Typography> */}
//                     <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
//                         <Box>
//                             <img src={CardLogo} alt="card logo" height='50px' />
//                         </Box>
//                         <Box>
//                             <Typography variant='h5' color='white'>Zest</Typography>
//                             <Typography variant='heading2' sx={{ fontWeight: '100' }}>Cultural Fest of Srms</Typography>
//                         </Box>
//                     </Stack>

//                     <FormHelperText sx={{ color: '#3b3a3a' }} >
//                         * Please fill all details carefully
//                     </FormHelperText>
//                     {/* year */}
//                     <Grid container spacing={2} sx={{ width: '100%' }}>
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth required >
//                                 <InputLabel id="year-select-label">Year</InputLabel>
//                                 <Select
//                                     labelId="year-select-label"
//                                     id="year-select"
//                                     label="Year"
//                                     name='year'
//                                     value={formData.year}
//                                     onChange={handleChange}
//                                 >

//                                     {batchYear.map((year, index) => (
//                                         <MenuItem key={index} value={year}>{year}</MenuItem>
//                                     ))}


//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* sem */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth required>
//                                 <InputLabel id="department-select-label">Sem</InputLabel>
//                                 <Select
//                                     labelId="department-select-label-id"
//                                     id="department-select"
//                                     label="Sem"
//                                     name='sem'
//                                     value={formData.sem}
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value='Even'>Even</MenuItem>
//                                     <MenuItem value='Odd'>Odd</MenuItem>

//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* title */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <TextField id="name-input" label="Title" variant="outlined" name='title' value={formData.title} onChange={handleChange} required />
//                             </FormControl>
//                         </Grid>


//                         {/* start date */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                     <DatePicker
//                                         label="Start Date"
//                                         value={formData.startDate}
//                                         onChange={(date) => handleDateChange('startDate', date)}

//                                     />
//                                 </LocalizationProvider>
//                             </FormControl>
//                         </Grid>

//                         {/* end date */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                     <DatePicker
//                                         label="End Date"
//                                         value={formData.endDate}
//                                         onChange={(date) => handleDateChange('endDate', date)}

//                                     />
//                                 </LocalizationProvider>
//                             </FormControl>
//                         </Grid>

//                         {/* end date */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <TextField
//                                     id="name-input"
//                                     type="number"
//                                     label="Total Participants"
//                                     variant="outlined"
//                                     name="totalParticipants"
//                                     value={formData.totalParticipants}
//                                     onChange={(e) => {
//                                         const value = e.target.value;

//                                         // Ensure only positive integer values
//                                         if (/^\d+$/.test(value) || value === "") {
//                                             handleChange(e);
//                                         }
//                                     }}
//                                     inputProps={{ min: "1" }} // Ensure only positive values are entered
//                                     required
//                                 />

//                             </FormControl>
//                         </Grid>

//                         {/* total Events */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <TextField
//                                     id="name-input"
//                                     type="number"
//                                     label="Total Events"
//                                     variant="outlined"
//                                     name="totalEvents"
//                                     value={formData.totalEvents}
//                                     onChange={(e) => {
//                                         const value = e.target.value;

//                                         // Ensure only positive integer values
//                                         if (/^\d+$/.test(value) || value === "") {
//                                             handleChange(e);
//                                         }
//                                     }}
//                                     inputProps={{ min: "1" }} // Ensure only positive values are entered
//                                     required
//                                 />

//                             </FormControl>
//                         </Grid>

//                         {/* special event */}

//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <TextField id="name-input" label="Special Event" variant="outlined" name='specialEvent' value={formData.specialEvent} onChange={handleChange} required />
//                             </FormControl>
//                         </Grid>



//                     </Grid>

//                     <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

//                     {/* upload image component */}

//                     <UploadImage
//                         images={images}
//                         pdfs={pdfs}
//                         handleFileSelect={handleFileSelect}
//                         handleRemoveImage={handleRemoveImage}
//                         handleRemovePdf={handleRemovePdf}
//                         mediaLoading={mediaLoading}
//                     >

//                     </UploadImage>


//                     <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>


//                 </Box>


//             </Box>
//             <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
//                 <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
//                 </Alert>
//             </Snackbar>

//         </Paper>
//     );
// }

// export default Zest;



import React, { useState } from 'react';
import { CircularProgress, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
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
import axios from "axios";
import { useParams } from 'react-router-dom';
import { routes } from '../../utils/routes';
import ErrorPage from '../ErrorPage';
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage } from '../../services/uploadMediaService';
import { useSelector } from 'react-redux';
import { useIsMobile } from '../../theme/theme';

// uploadMedia Service
import { uploadFiles } from '../../services/uploadMediaService';

function Zest() {
    const { activity_name } = useParams();

    const activity_item = 'zest';
    const activityData = routes[activity_name]; // Get activity data based on route

    // If activityData or activityName data is undefined, show 404
    const activityItemName = activityData?.activity?.[activity_item]; // Get activity item data based on route item

    console.log("zest:----", activity_name, activity_item, activityItemName);

    // If activityItemName is undefined, show 404
    if (!activityItemName) {
        return <ErrorPage />;
    }

    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const authData = useSelector((state) => state.auth)
    const isMobile = useIsMobile();
    //for submit logic
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        title: '',
        start_date: null,
        end_date: null,
        total_participants: '',
        total_events: '',
        special_event: ''
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
                activity_item,
                setMediaLoading
            );

            console.log("Upload Files: ", uploadedFiles.images, uploadedFiles.pdfs);

            // Prepare and submit the form
            const finalFormData = {
                ...formData,
                images: uploadedFiles.images,
                createdBy: authData.userId,
                pdfs: uploadedFiles.pdfs
            };
            console.log(finalFormData);

            const response = await axios.post('/api/zest', finalFormData, { withCredentials: true });
            console.log(response.data);

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
            console.error("Error submitting Zest form:", error);
            const err = getErrorMessage(error);
            setAlert({ open: true, message: err, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        // After submit form will reset
        setFormData({
            year: '',
            sem: '',
            title: '',
            start_date: null,
            end_date: null,
            total_participants: '',
            total_events: '',
            special_event: ''
        });
        setImages([]);
        setPdfs([]);
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ width: isMobile ? '100%' : '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px", alignItems: 'center' }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Zest</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '100' }}>{activityData.activity[activity_item] && activityData.activity[activity_item].description}</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a', mb: 1 }} >
                        * Please fill all details carefully
                    </FormHelperText>
                    {/* year */}
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
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* title */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Title" variant="outlined" name='title' value={formData.title} onChange={handleChange} required />
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
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* total participants */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="total-participants-input"
                                    type="number"
                                    label="Total Participants"
                                    variant="outlined"
                                    name="total_participants"
                                    value={formData.total_participants}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Ensure only positive integer values
                                        if (/^\d+$/.test(value) || value === "") {
                                            handleChange(e);
                                        }
                                    }}
                                    inputProps={{ min: "1" }} // Ensure only positive values are entered
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* total Events */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="total-events-input"
                                    type="number"
                                    label="Total Events"
                                    variant="outlined"
                                    name="total_events"
                                    value={formData.total_events}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Ensure only positive integer values
                                        if (/^\d+$/.test(value) || value === "") {
                                            handleChange(e);
                                        }
                                    }}
                                    inputProps={{ min: "1" }} // Ensure only positive values are entered
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {/* special event */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="special-event-input" label="Special Event" variant="outlined" name='special_event' value={formData.special_event} onChange={handleChange} required />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

                    {/* upload image component */}
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    />

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

export default Zest;