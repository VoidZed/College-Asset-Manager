import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, Divider, Paper, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import SampleImage from "../../assets/images.png"
function GuestLectureForm() {

    const maxLimit = Array.from({ length: 3 }, (_, i) => i + 1);

    const thumbHeight = "100px";

    const [selectedDate, setSelectedDate] = useState(null);


    const [image, setImage] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set preview URL
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>

            <Box sx={{ padding: 2, border: '1px solid gray', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ maxWidth: '70%' }}>
                    <Typography variant='h5'>Guest Lecture Form</Typography>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
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
                            <FormControl fullWidth>
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
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Title" variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
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
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Speaker Name" variant="outlined" />
                            </FormControl>
                        </Grid>

                        {/* speaker organisation */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" label="Speaker Organisation" variant="outlined" />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
                                <TextField id="name-input" type='number' label="No of Students" variant="outlined" />
                            </FormControl>
                        </Grid>
                        {/* student year */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth>
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
                            <FormControl fullWidth>
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
                            <FormControl fullWidth>
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    label="Department"
                                >

                                    {department.map((dept) => (
                                        <MenuItem value={dept}>{dept}</MenuItem>
                                    ))}


                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>



                    <Divider sx={{ paddingTop: '20px' }}></Divider>
                    {/* photo section */}

                    <Box mb={12} sx={{width:'100%',paddingTop:'20px'}}>
                        <Box sx={{
                            border: '1px solid lightgray', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <CloudUploadOutlinedIcon sx={{ fontSize: '60px' }}></CloudUploadOutlinedIcon>
                            <Typography>Upload Images</Typography>
                        </Box>
                        {/* thumbnail output box */}
                        <Box sx={{paddingTop:'10px'}}>
                            <Stack direction="row" spacing={2} wrap="wrap">
                                {
                                    maxLimit.map((elem) => (
                                        <Box sx={{ height: thumbHeight, width: thumbHeight, border: '1px solid gray' ,borderRadius:'10px'}}>
                                           <img src={SampleImage} height={thumbHeight} style={{borderRadius:'10px'}}></img>
                                        </Box>
                                    ))
                                }



                            </Stack>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </Paper>
    );
}

export default GuestLectureForm;