import { Alert, Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Action from "../Action";
import UploadImage from "./uploadImage";
import { activityDisplayInternalPadding } from "../../utils/dimension";
import { navbarColor } from "../../utils/color";
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { batchYear } from "../../utils/forms";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TyroOathCeremony = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // Define chairpersons and heads arrays for consistent use
    const chairpersons = ['JC', 'MRC', 'Literary', 'Equinox', 'Illuminati', 'Robotrax', 'Synergy', 'Aeronautic', 'Fine Arts', 'Deco', 'Music', 'Dance'];
    const heads = ['Technical', 'Cultural', 'Sports'];

    // Create initial state with all form fields
    const initialFormState = {
        year: '',
        sem: '',
        date: null,
        president: '',
        secretary: "",
        trustSecretary: '',
        vicePresident: '',
        treasurer: "",
        zos: '',
        aos: '',
        tos: '',
        // Add chairpersons to initial state
        ...chairpersons.reduce((acc, chair) => {
            acc[`${chair.toLowerCase()}Chairperson`] = '';
            return acc;
        }, {}),
        // Add heads to initial state
        ...heads.reduce((acc, head) => {
            acc[`${head.toLowerCase()}Head`] = '';
            return acc;
        }, {})
    };

    const [formData, setFormData] = useState(initialFormState);

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
        
        // Reset form data after submission
        setFormData(initialFormState);
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
                            <Typography variant='h5' color='white'>Tyro Oath Ceremony</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '100' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, a?</Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a' }}>* Please fill all details carefully</FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>

                        {/* year */}
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Year</InputLabel>
                                <Select 
                                    name='year'
                                    value={formData.year}
                                    onChange={handleChange}
                                    label="Year"
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
                                    <MenuItem value={"Even"}>Even</MenuItem>
                                    <MenuItem value={"Odd"}>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* date */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        label="Date" 
                                        value={formData.date}
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        {/* president */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="President" 
                                name='president' 
                                value={formData.president}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* Secretary*/}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="Secretary" 
                                name='secretary' 
                                value={formData.secretary}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* trust secretary */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="Trust Secretary" 
                                name='trustSecretary' 
                                value={formData.trustSecretary}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* vice President */}
                        <Grid item xs={12} md={12}>
                            <TextField 
                                fullWidth 
                                label="Vice President" 
                                name='vicePresident' 
                                value={formData.vicePresident}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* treasurer */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="Treasurer" 
                                name='treasurer' 
                                value={formData.treasurer}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* zos */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="ZOS" 
                                name='zos' 
                                value={formData.zos}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* tos */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="TOS" 
                                name='tos' 
                                value={formData.tos}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>

                        {/* aos */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth 
                                label="AOS" 
                                name='aos' 
                                value={formData.aos}
                                onChange={handleChange}
                                required 
                            />
                        </Grid>
                    </Grid>

                    {/* chairpersons */}
                    <Typography variant='h6' sx={{ marginTop: 3, color: "#3f3f40" }}>Chairpersons</Typography>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {chairpersons.map((chair, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <TextField 
                                    fullWidth 
                                    label={`${chair} Chairperson`} 
                                    name={`${chair.toLowerCase()}Chairperson`} 
                                    value={formData[`${chair.toLowerCase()}Chairperson`]}
                                    onChange={handleChange}
                                    required 
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* heads */}
                    <Typography variant='h6' sx={{ marginTop: 3, color: "#3f3f40" }}>Heads</Typography>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {heads.map((head, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <TextField 
                                    fullWidth 
                                    label={`${head} Head`} 
                                    name={`${head.toLowerCase()}Head`} 
                                    value={formData[`${head.toLowerCase()}Head`]}
                                    onChange={handleChange}
                                    required 
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>
                    <UploadImage />
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
};

export default TyroOathCeremony;

