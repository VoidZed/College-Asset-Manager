import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"

import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png'

import { batchYear } from "../../utils/forms"

import { useParams } from 'react-router-dom';
import {routes} from "../../utils/routes"

//tasks to be done 
//error handle 
//add chip in label

function GuestLectureForm() {



    const { activity_name, activity_item } = useParams();

    const activityData = routes[activity_name]; // Get activity data based on route
    // If activityData    or activityName adata is undefined, show 404
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item

    // If activityItemName is undefined, show 404



    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    //for submit logic
    const [formData, setFormData] = useState({
        year: '',
        sem: '',
        title: '',
        date: null,
        speakerName: '',
        speakerOrg: '',
        studentCount: '',
        batch: '',
        mode: '',
        departments: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleDeptChange = (event) => {
        setFormData({ ...formData, departments: event.target.value });
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        //after subit form will reset
        setFormData({
            year: '',
            sem: '',
            title: '',
            date: null,
            speakerName: '',
            speakerOrg: '',
            studentCount: '',
            batch: '',
            mode: '',
            departments: [],
        });
        console.log(formData);
        setSnackbarOpen(true);

    };






    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    {/* <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Guest Lecture</Typography> */}

                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%',height:'50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                        <Typography variant='h5' color='white'>Guest Lecture</Typography>
                        <Typography variant='heading2' sx={{fontWeight:'100'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                        </Stack>
                        
                        <FormHelperText sx={{color:'#3b3a3a'}} >
                            * Please fill all details carefully
                        </FormHelperText>

                    <Chip label={activityItemName.name} sx={{ color: 'white', width: '200px', bgcolor: sidebarBgcolor, marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }} />


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
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Sem</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Sem"
                                    name='sem'
                                    value={formData.sem}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Even</MenuItem>
                                    <MenuItem value={1}>Odd</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* title */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Title" variant="outlined" name='title' value={formData.title} onChange={handleChange} required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
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
                                <TextField id="name-input" label="Speaker Name" variant="outlined" name="speakerName" value={formData.speakerName} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        {/* speaker organisation */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Speaker Organisation" variant="outlined" name="speakerOrg" value={formData.speakerOrg} onChange={handleChange} required />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField
                                    id="name-input"
                                    type="number"
                                    label="No of Students"
                                    variant="outlined"
                                    name="studentCount"
                                    value={formData.studentCount}
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
                        {/* student year */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Batch</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Batch"
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='1st'>1st</MenuItem>
                                    <MenuItem value='2nd'>2nd</MenuItem>
                                    <MenuItem value='3rd'>3rd</MenuItem>
                                    <MenuItem value='4th'>4th</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* mode */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Mode</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Mode"
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Online</MenuItem>
                                    <MenuItem value={20}>Offline</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* student year */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Department"
                                    multiple
                                    name="departments"
                                    value={formData.departments}
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

                    <Divider sx={{ paddingTop: '20px', width: "99%" }}></Divider>

                    {/* upload image component */}

                    <UploadImage></UploadImage>

                    <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>


                </Box>


            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Form submitted successfully!
                </Alert>
            </Snackbar>

        </Paper>
    );
}

export default GuestLectureForm;