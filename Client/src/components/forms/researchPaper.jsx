// import React, { useState } from 'react';
// import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { department } from '../../utils/formData';
// import { navbarColor, sidebarBgcolor } from '../../utils/color';
// import { activityDisplayInternalPadding } from "../../utils/dimension"

// import UploadImage from './uploadImage';
// import SendIcon from '@mui/icons-material/Send';
// import CardLogo from '../../assets/job.png'

// import { batchYear } from "../../utils/forms"
// import Action from '../Action';


// const ResearchPaper = () => {


//     //snackbar
//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
//     const handleCloseAlert = (reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setAlert({ ...alert, open: false });
//     };

//     //for submit logic
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

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleDateChange = (date) => {
//         setFormData({ ...formData, date: date });
//     };
//     const handleDeptChange = (event) => {
//         setFormData({ ...formData, department: event.target.value });
//     };




//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         console.log(formData);

//         try {
//             const response = await axios.post("/api/guest_lecture", { formData }, { withCredentials: true })
//             console.log(response);

//             if (response.status === 201) {
//                 setAlert({ open: true, message: response.data.message, severity: 'success' })
//             }


//         } catch (error) {
//             console.error("Err", error)
//             setAlert({ open: true, message: error.response?.data?.message || "An error occurred", severity: 'error' });
//         }







//         //after subit form will reset
//         // setFormData({
//         //     year: '',
//         //     sem: '',
//         //     title: '',
//         //     date: null,
//         //     speaker: '',
//         //     speaker_org: '',
//         //     total_student: '',
//         //     batch: '',
//         //     mode: '',
//         //     department: [],
//         // });





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
//                             <Typography variant='h5' color='white'>Research Paper</Typography>
//                             <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
//                         </Box>
//                     </Stack>

//                     <FormHelperText sx={{ color: '#3b3a3a', marginBottom: '10px' }} >
//                         * Please fill all details carefully
//                     </FormHelperText>



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
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth required >
//                                 <InputLabel id="year-select-label">Sem</InputLabel>
//                                 <Select
//                                     labelId="year-select-label"
//                                     id="year-select"
//                                     label="Year"
//                                     name='year'
//                                     value={formData.year}
//                                     onChange={handleChange}
//                                 >

//                                     <MenuItem value={'Odd'}>Odd</MenuItem>
//                                     <MenuItem value={'Even'}>Even</MenuItem>


//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* title */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}><TextField fullWidth label="Paper Title" name='title' value={formData.chiefGuest} onChange={handleChange} required /></Grid>
//                         {/* type */}
//                         <Grid item md={6} xs={12} lg={6} xl={6} >
//                             <FormControl>
//                                 <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
//                                 <RadioGroup
//                                     row
//                                     aria-labelledby="demo-row-radio-buttons-group-label"
//                                     name="row-radio-buttons-group"
//                                     sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}


//                                 >
//                                     <FormControlLabel value="review" control={<Radio size='small' />} label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Review</Typography>} />
//                                     <FormControlLabel value="researchPaper" control={<Radio size='small' />} label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Research Paper</Typography>} />

//                                 </RadioGroup>

//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} md={6} lg={6} xl={6}><TextField fullWidth label="Author" name='author' value={formData.chiefGuest} onChange={handleChange} required /></Grid>

//                         {/* journal */}

//                         <Grid item xs={12} md={6} lg={6} xl={6}><TextField fullWidth label="Journal/Conference Name" name='journal' value={formData.chiefGuest} onChange={handleChange} required /></Grid>

//                         {/* designation */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}><TextField fullWidth label="Degignation" name='degignation' value={formData.chiefGuest} onChange={handleChange} required /></Grid>

//                         {/* departments */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth required>
//                                 <InputLabel id="department-select-label">Department</InputLabel>
//                                 <Select
//                                     labelId="department-select-label-id"
//                                     id="department-select"
//                                     label="Department"
//                                     multiple
//                                     name="department"
//                                     value={formData.department}
//                                     onChange={handleDeptChange}
//                                 >

//                                     {department.map((dept) => (
//                                         <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                                     ))}


//                                 </Select>
//                             </FormControl>

//                         </Grid>
//                         {/*  Date */}
//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth >
//                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                     <DatePicker
//                                         label="Publication Date"
//                                         value={formData.date}
//                                         onChange={handleDateChange}

//                                     />
//                                 </LocalizationProvider>
//                             </FormControl>
//                         </Grid>




//                         {/* Sattus */}

//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <FormControl fullWidth required>
//                                 <InputLabel id="status-select-label">Status</InputLabel>
//                                 <Select
//                                     labelId="status-select-label-id"
//                                     id="status-select"
//                                     label="Status"
//                                     multiple
//                                     name="status"
//                                     value={formData.department}
//                                     onChange={handleDeptChange}
//                                 >
//                                     <MenuItem value={'Pending'}>Submitted</MenuItem>
//                                     <MenuItem value={'Granted'}>Published</MenuItem>
//                                     <MenuItem value={'Granted'}>Under Review</MenuItem>


//                                 </Select>
//                             </FormControl>

//                         </Grid>


//                         <Grid item md={6} xs={12} lg={6} xl={6}>
//                             <FormControl>
//                                 <FormLabel id="demo-row-radio-buttons-group-label">Classification</FormLabel>
//                                 <RadioGroup
//                                     row
//                                     aria-labelledby="demo-row-radio-buttons-group-label"
//                                     name="row-radio-buttons-group"
//                                     sx={{ display: 'flex', justifyContent: 'flex-start', gap: 5, width: '100%' }}

//                                 >
//                                     <FormControlLabel
//                                         value="scopus"
//                                         control={<Radio size='small' />}
//                                         label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Scopus</Typography>} />
//                                     <FormControlLabel
//                                         value="esci"
//                                         control={<Radio size='small' />}
//                                         label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>ESCI</Typography>} />
//                                     <FormControlLabel
//                                         value="sci"
//                                         control={<Radio size='small' />}
//                                         label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>SCI</Typography>}
//                                     />

//                                     <FormControlLabel
//                                         value="other"
//                                         control={<Radio size='small' />}
//                                         label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Other</Typography>}
//                                     />

//                                 </RadioGroup>

//                             </FormControl>
//                         </Grid>

//                         <Grid item md={6} xs={12} lg={6} xl={6}>
//                             <TextField label='IISN/IIBN No.' name='isbn' required fullWidth></TextField>
//                         </Grid>


//                         <Grid item md={6} xs={12} lg={6} xl={6}>
//                             <TextField label='DOI' name='doi' required fullWidth></TextField>
//                         </Grid>



//                     </Grid>

//                     <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

//                     {/* upload image component */}
//                     <FormHelperText sx={{ marginTop: '15px' }}>Upload event photos and event report</FormHelperText>
//                     <UploadImage></UploadImage>


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

// export default ResearchPaper;



import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Divider,
    Paper,
    FormHelperText,
    Snackbar,
    Alert,
    Stack,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension";
import axios from 'axios';

import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png';

import { batchYear } from "../../utils/forms";
import Action from '../Action';

const ResearchPaper = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Snackbar
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    // Form state
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        title: '',
        date: null,
        type: '',
        author: '',
        journal: '',
        designation: '',
        department: [],
        status: '',
        classification: '',
        isbn: '',
        doi: '',
    });

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setAlert({ open: true, message: 'Form Submitted Successfully', severity: 'success' });

    };

    return (
        <Paper
            sx={{
                height: '100%',
                overflowY: 'auto',
                padding: isTablet ? 2 : activityDisplayInternalPadding,
                bgcolor: navbarColor,
                borderTopLeftRadius: "20px",
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
        >
            <Action />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    sx={{
                        width: isMobile ? '95%' : isTablet ? '85%' : '70%',
                        paddingTop: '10px',
                        marginBottom: '30px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={2}
                        sx={{
                            color: 'white',
                            width: '100%',
                            minHeight: '50px',
                            background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
                            marginTop: '20px',
                            marginBottom: "15px",
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            padding: isMobile ? "15px 10px" : "20px",
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                            <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>Research Paper</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '300', opacity: '0.9' }}>
                                Submit your published or ongoing research paper details
                            </Typography>
                        </Box>
                    </Stack>

                    <FormHelperText
                        sx={{
                            color: '#3b3a3a',
                            marginBottom: '15px',
                            fontSize: '0.9rem',
                            textAlign: 'left',
                            width: '100%',
                        }}
                    >
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
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

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <InputLabel id="sem-select-label">Semester</InputLabel>
                                <Select
                                    labelId="sem-select-label"
                                    id="sem-select"
                                    label="Semester"
                                    name='sem'
                                    value={formData.sem}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Odd'}>Odd</MenuItem>
                                    <MenuItem value={'Even'}>Even</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Paper Title */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Paper Title"
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>

                        {/* Paper Type */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <FormLabel id="paper-type-label" sx={{ mb: 1 }}>Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="paper-type-label"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                                >
                                    <FormControlLabel
                                        value="review"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Review</Typography>}
                                    />
                                    <FormControlLabel
                                        value="researchPaper"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Research Paper</Typography>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Author */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Author"
                                name='author'
                                value={formData.author}
                                onChange={handleChange}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>

                        {/* Journal */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Journal/Conference Name"
                                name='journal'
                                value={formData.journal}
                                onChange={handleChange}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>

                        {/* Designation */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Designation"
                                name='designation'
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>

                        {/* Departments */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Department"
                                    multiple
                                    name="department"
                                    value={formData.department}
                                    onChange={handleDeptChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} variant="body2" sx={{
                                                    bgcolor: 'primary.light',
                                                    color: 'white',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {value}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {department.map((dept) => (
                                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Publication Date */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Publication Date"
                                        value={formData.date}
                                        onChange={handleDateChange}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    id="status-select"
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Submitted'}>Submitted</MenuItem>
                                    <MenuItem value={'Published'}>Published</MenuItem>
                                    <MenuItem value={'UnderReview'}>Under Review</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Classification */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
                                <FormLabel id="classification-label" sx={{ mb: 1 }}>Classification</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="classification-label"
                                    name="classification"
                                    value={formData.classification}
                                    onChange={handleChange}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: 1
                                    }}
                                >
                                    <FormControlLabel
                                        value="scopus"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Scopus</Typography>}
                                    />
                                    <FormControlLabel
                                        value="esci"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>ESCI</Typography>}
                                    />
                                    <FormControlLabel
                                        value="sci"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>SCI</Typography>}
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio size='small' color="primary" />}
                                        label={<Typography sx={{ fontSize: '15px', color: '#00000099' }}>Other</Typography>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* ISBN */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label='ISBN/ISSN No.'
                                name='isbn'
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>

                        {/* DOI */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label='DOI'
                                name='doi'
                                value={formData.doi}
                                onChange={handleChange}
                                required
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{
                        margin: '30px 0 20px 0',
                        width: "100%",
                        opacity: 0.7
                    }} />

                    {/* Upload image component */}
                    <FormHelperText sx={{
                        marginTop: '15px',
                        marginBottom: '10px',
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        width: '100%'
                    }}>
                        Upload paper publication proof and any related documents
                    </FormHelperText>
                    <UploadImage />
                    <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>

                </Box>
            </Box>

            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default ResearchPaper;