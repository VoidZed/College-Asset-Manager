import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, FormHelperText, Chip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"

import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';



//tasks to be done 
//error handle 
//add chip in label

function GuestLectureForm() {


    //multiple dept select
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDepts, setSelectedDepts] = useState([]);

    const handleDeptChange = (event) => {
        setSelectedDepts(event.target.value);
    };
    // handle form submit

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submit")
    }


    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ maxWidth: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    {/* <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Guest Lecture</Typography> */}
                    <Chip label="Guest Lecture" sx={{ width: '200px',bgcolor:'lightgray', marginTop: '20px',marginBottom:"15px" ,fontWeight: 'bold', fontSize: '15px', borderRadius: '5px',padding:"20px" }} />

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required >
                                <InputLabel id="year-select-label">Year</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    id="year-select"
                                    label="Year"
                                    
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                >
                                    <MenuItem value={0}>Even</MenuItem>
                                    <MenuItem value={1}>Odd</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* title */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Title" variant="outlined" required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                       
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        {/* speaker name */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Speaker Name" variant="outlined" required/>
                            </FormControl>
                        </Grid>

                        {/* speaker organisation */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" label="Speaker Organisation" variant="outlined" required/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth >
                                <TextField id="name-input" type='number' label="No of Students" variant="outlined" required />
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
                                >
                                    <MenuItem value={10}>1st</MenuItem>
                                    <MenuItem value={20}>2nd</MenuItem>
                                    <MenuItem value={30}>3rd</MenuItem>
                                    <MenuItem value={30}>4th</MenuItem>
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
                                    value={selectedDepts}
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

                    <Divider sx={{ paddingTop: '20px' }}></Divider>

                    {/* upload image component */}

                    <UploadImage></UploadImage>

                    <Button type="submit" variant='contained' endIcon={<SendIcon />}>Submit</Button>


                </Box>


            </Box>

        </Paper>
    );
}

export default GuestLectureForm;