import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip, Snackbar, Alert, Stack } from "@mui/material";
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

function Patent() {


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
        issueDate: null,
        status:'',
        facultyCoordinator:'',
        studentMembers:''

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, issueDate: date });
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        //after subit form will reset
        // setFormData({
        //     year: '',
        //     sem: '',
        //     title: '',
        //     issueDate: null,
        //     status:'',
        //     facultyCoordinator:'',
        //     studentMembers:''


        // });
        console.log(formData);
        setSnackbarOpen(true);

    };






    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    {/* <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Guest Lecture</Typography> */}
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Patent</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a' }} >
                        * Please fill all details carefully
                    </FormHelperText>


                    {/* //year */}
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


                        {/* //sem */}
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


                        {/* issue date */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Issue Date"
                                        value={formData.issueDate}
                                        onChange={handleDateChange}

                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>


                        {/* status */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-select-label-id"
                                    id="status-select"
                                    label="Status"
                                    name='status'
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Granted">Granted</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>


                        {/* faculty Coordinator */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Faculty Coordinator" variant="outlined" name='facultyCoordinator' value={formData.facultyCoordinator} onChange={handleChange} required />
                            </FormControl>
                        </Grid>


                        {/*student members  */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Student Members" variant="outlined" name='studentMembers' value={formData.studentMembers} onChange={handleChange} required />
                            </FormControl>
                        </Grid>



                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>

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

export default Patent;