



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

} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { department } from '../../utils/formData';
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension";
import {useSelector } from 'react-redux';
import axios from 'axios';
import { useIsMobile } from '../../theme/theme';

import UploadImage from './uploadImage';
import SendIcon from '@mui/icons-material/Send';
import CardLogo from '../../assets/job.png';

import { batchYear } from "../../utils/forms";
import Action from '../Action';

const ResearchPaper = () => {
    const [mediaLoading, setMediaLoading] = useState(false);

    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
  const isMobile=useIsMobile();
    // Snackbar
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    const authData = useSelector((state) => state.auth)

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
                padding: activityDisplayInternalPadding,
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
                        width:isMobile?'100%' :'70%',
                        paddingTop: '10px',
                        marginBottom: '30px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            color: 'white',
                            minHeight: '50px',
                            background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
                            marginTop: '20px',
                            marginBottom: "15px",
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            padding: "15px 10px",
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <img src={CardLogo} alt="card logo" height='50px' />
                        </Box>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>Research Paper</Typography>
                            <Typography variant='body2' sx={{ fontWeight: '300', opacity: '0.9' }}>
                                Submit your published or ongoing research paper details
                            </Typography>
                        </Box>
                    </Stack>

                    <FormHelperText
                       sx={{ color: '#3b3a3a',mb:1 }}
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
                    <UploadImage
                        images={images}
                        pdfs={pdfs}
                        handleFileSelect={handleFileSelect}
                        handleRemoveImage={handleRemoveImage}
                        handleRemovePdf={handleRemovePdf}
                        mediaLoading={mediaLoading}
                    >

                    </UploadImage>
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