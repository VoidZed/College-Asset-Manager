import { Alert, Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography, CircularProgress } from "@mui/material";
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
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../utils/limits';
import { getErrorMessage, uploadFiles } from '../../services/uploadMediaService';
import axios from "axios";
import { routes } from "../../utils/routes";
import { useParams } from "react-router-dom";
import {useSelector } from 'react-redux';


const TyroOathCeremony = () => {

    const { activity_name } = useParams();
    const activity_item = "oath_ceremony";
    const activityData = routes[activity_name];
    const authData = useSelector((state) => state.auth)

    if (!activityData || !activityData.activity || !activityData.activity[activity_item]) {
        return <ErrorPage />;
    }

    const [loading, setLoading] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);

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
        joint_secretary: [],
        trust_secretary: '',
        vice_president: [],
        treasurer: "",
        zos: [],
        aos: [],
        tos: [],
        // Add chairpersons to initial state
        ...chairpersons.reduce((acc, chair) => {
            acc[`${chair.toLowerCase()}_chairperson`] = '';
            return acc;
        }, {}),
        // Add heads to initial state
        ...heads.reduce((acc, head) => {
            acc[`${head.toLowerCase()}_head`] = '';
            return acc;
        }, {})
    };


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


    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (event) => {

        const { name, value } = event.target;
        if (name === 'vice_president' || name === "joint_secretary" || name === "aos" || name === "tos" || name === "zos") {
            setFormData({ ...formData, [name]: value.split(',') });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleFormSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                'oath_ceremony',
                setMediaLoading
            );

            const finalFormData = {
                ...formData,
                images: uploadedFiles.images,
                createdBy:authData.userId,
                pdfs: uploadedFiles.pdfs,
            };

            const response = await axios.post('/api/oath_ceremony', finalFormData, { withCredentials: true });

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
            console.error("Error submitting Tyro Oath Ceremony form:", error);
            const err = getErrorMessage(error);
            setAlert({ open: true, message: err, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setImages([]);
        setPdfs([]);
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
                        <Grid item xs={12} md={6}></Grid>

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
                                name='trust_secretary'
                                value={formData.trust_secretary}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Joint Secretary"
                                    name='joint_secretary'
                                    value={formData.joint_secretary}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* vice President */}
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>

                                <TextField
                                    fullWidth
                                    label="Vice President"
                                    name='vice_president'
                                    value={formData.vice_president}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>

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
                            <FormControl fullWidth>

                                <TextField
                                    fullWidth
                                    label="TOS"
                                    name='tos'
                                    value={formData.tos}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* tos */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>

                                <TextField
                                    fullWidth
                                    label="ZOS"
                                    name='zos'
                                    value={formData.zos}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* aos */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>

                                <TextField
                                    fullWidth
                                    label="AOS"
                                    name='aos'
                                    value={formData.aos}
                                    onChange={handleChange}
                                    required
                                />
                                <FormHelperText>Enter comma separated values</FormHelperText>
                            </FormControl>
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
                                    name={`${chair.toLowerCase()}_chairperson`}
                                    value={formData[`${chair.toLowerCase()}_chairperson`]}
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
                                    name={`${head.toLowerCase()}_head`}
                                    value={formData[`${head.toLowerCase()}_head`]}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ paddingTop: '20px', width: "98%" }}></Divider>
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    />
                    <Button disabled={loading} type="submit" variant='contained' endIcon={!loading && <SendIcon />} sx={{ width: '120px' }}>{loading ? <CircularProgress size={25} sx={{ color: 'white' }} /> : 'Submit'}</Button>
                </Box>
            </Box>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default TyroOathCeremony;