import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Divider, Paper, FormHelperText, Snackbar, Alert, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension";
import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png';
import { batchYear } from "../../utils/forms";
import Action from '../Action';

function DayCelebration() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const [formData, setFormData] = useState({
        date: null,
        title: '',
        year: '',
        sem: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log(formData);
        setSnackbarOpen(true);
        setFormData({ date: null, title: '', year: '', sem: '' });
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action />
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack direction='row' spacing={2} sx={{ color: 'white', width: '93%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                        <Box>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>Day Celebration</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, a?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a' }}>* Please fill all details carefully</FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>

                        {/* year */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Year</InputLabel>
                                <Select name='year' value={formData.year} onChange={handleChange}>{batchYear.map((year, index) => (<MenuItem key={index} value={year}>{year}</MenuItem>))}</Select>
                            </FormControl>
                        </Grid>

                        {/* sem */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Semester</InputLabel>
                                <Select name='sem' value={formData.sem} onChange={handleChange}>
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* date */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date" value={formData.date} onChange={handleDateChange} />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* title */}
                        <Grid item xs={12} md={6} xl={6} lg={6}>
                            <TextField fullWidth label="Title" name='title' value={formData.title} onChange={handleChange} required />
                        </Grid>
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>
                    <UploadImage />
                    <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>
                </Box>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}><Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>Form submitted successfully!</Alert></Snackbar>
        </Paper>
    );
}

export default DayCelebration;
