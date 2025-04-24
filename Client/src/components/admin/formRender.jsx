

import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Button, TextField,
    FormControl, FormControlLabel, InputLabel,
    Select, MenuItem, Checkbox, FormHelperText,
    Alert, AlertTitle, CircularProgress, Snackbar,
    Stack, Divider, Grid
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { camelCase } from 'change-case';
import axios from "axios";
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { navbarColor, sidebarBgcolor } from '../../utils/color';
import { activityDisplayInternalPadding } from "../../utils/dimension";
import CardLogo from '../../assets/job.png'; // You may need to use an appropriate logo
import { MAX_IMAGES, MAX_PDFS, MAX_IMAGE_SIZE, MAX_PDF_SIZE } from "../../utils/limits";
import UploadImage from '../forms/uploadImage';
import { uploadFiles } from '../../services/uploadMediaService';
import { batchYear } from "../../utils/forms"
import Action from '../Action';

import { useDispatch, useSelector } from 'react-redux';

const DynamicForm = () => {



    const { activity_name, activity_item } = useParams();

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    // const formSlug = "spandan";


    const authData = useSelector((state) => state.auth)

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

    useEffect(() => {
        const fetchForm = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/admin/getForm/${activity_item}`, { withCredentials: true });

                if (!response) {
                    throw new Error('Form not found');
                }

                const data = response.data.form;
                setForm(data);

                // Initialize form values
                const initialValues = {};
                data.fields.forEach(field => {
                    const fieldName = camelCase(field.label);
                    initialValues[fieldName] = field.type === 'checkbox' ? false : '';
                });

                setFormValues(initialValues);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (activity_item) {
            fetchForm();
        }
    }, [activity_item]);

    const handleInputChange = (fieldName, value) => {
        setFormValues({
            ...formValues,
            [fieldName]: value
        });

        // Clear error when field is modified
        if (formErrors[fieldName]) {
            setFormErrors({
                ...formErrors,
                [fieldName]: null
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!form) return false;

        form.fields.forEach(field => {
            const fieldName = camelCase(field.label);
            const value = formValues[fieldName];

            if (field.required) {
                if (field.type === 'checkbox' && !value) {
                    errors[fieldName] = 'This field is required';
                    isValid = false;
                } else if (value === undefined || value === null || value === '') {
                    errors[fieldName] = 'This field is required';
                    isValid = false;
                }
            }

            // Basic type validation
            if (value !== undefined && value !== null && value !== '') {
                if (field.type === 'number' && isNaN(Number(value))) {
                    errors[fieldName] = 'Must be a valid number';
                    isValid = false;
                }
            }
        });

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        setSubmitting(true);
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            const uploadedFiles = await uploadFiles(
                images,
                pdfs,
                activity_item,
                setMediaLoading
            );
            const finalFormData = {
                ...formValues,
                createdBy: authData.userId,
                images: uploadedFiles.images,
                pdfs: uploadedFiles.pdfs,
            };
            console.log("dynamic form values", formValues)

            const response = await axios.post(`/api/save_dynamic_form/${activity_item}`, finalFormData, { withCredentials: true });

            setSubmitSuccess(true);
            setAlert({
                open: true,
                message: "Form submitted successfully!",
                severity: 'success'
            });



            console.log("Dynamic Form Save Response: ", response)

            // Reset form
            // const initialValues = {};
            // form.fields.forEach(field => {
            //     const fieldName = camelCase(field.label);
            //     initialValues[fieldName] = field.type === 'checkbox' ? false : '';
            // });

            // setFormValues(initialValues);

            // Call the success callback if provided

        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to submit form';
            setError(errorMessage);
            setAlert({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const renderField = (field) => {
        const fieldName = camelCase(field.label);
        const error = formErrors[fieldName];

        switch (field.type) {
            case 'text':
                return (
                    <FormControl fullWidth>
                        <TextField
                            id={fieldName}
                            label={field.label}
                            variant="outlined"
                            name={fieldName}
                            value={formValues[fieldName] || ''}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                            required={field.required}
                            error={!!error}
                            helperText={error}
                            disabled={submitting}
                        />
                    </FormControl>
                );

            case 'number':
                return (
                    <FormControl fullWidth>
                        <TextField
                            id={fieldName}
                            type="number"
                            label={field.label}
                            variant="outlined"
                            name={fieldName}
                            value={formValues[fieldName] || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) || value === "") {
                                    handleInputChange(fieldName, e.target.value);
                                }
                            }}
                            inputProps={{ min: "1" }}
                            required={field.required}
                            error={!!error}
                            helperText={error}
                            disabled={submitting}
                        />
                    </FormControl>
                );

            case 'select':
                return (
                    <FormControl
                        fullWidth
                        error={!!error}
                        required={field.required}
                        disabled={submitting}
                    >
                        <InputLabel id={`${fieldName}-select-label`}>{field.label}</InputLabel>
                        <Select
                            labelId={`${fieldName}-select-label`}
                            id={`${fieldName}-select`}
                            value={formValues[fieldName] || ''}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                            label={field.label}
                            name={fieldName}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {field.options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!formValues[fieldName]}
                                onChange={(e) => handleInputChange(fieldName, e.target.checked)}
                                disabled={submitting}
                            />
                        }
                        label={
                            <>
                                {field.label}
                                {field.required && ' *'}
                            </>
                        }
                        componentsProps={{
                            typography: {
                                color: error ? 'error' : 'inherit',
                            }
                        }}
                    />
                );

            case 'date':
                return (
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label={field.label}
                                value={formValues[fieldName] || null}
                                onChange={(date) => handleInputChange(fieldName, date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: field.required,
                                        error: !!error,
                                        helperText: error,
                                        disabled: submitting
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </FormControl>
                );



            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    // if (error && !alert.open) {
    //     return (
    //         <Alert severity="error" sx={{ mb: 2 }}>
    //             <AlertTitle>Error</AlertTitle>
    //             {error}
    //         </Alert>
    //     );
    // }

    if (!form) {
        return <Typography>Form not found</Typography>;
    }

    return (
        <Paper sx={{
            height: '100%',
            overflowY: 'auto',
            padding: activityDisplayInternalPadding || 3,
            bgcolor: navbarColor || 'white',
            borderTopLeftRadius: "20px"
        }}>
            {/* This is where you would put the Action component if needed */}
            {/* <Action /> */}
            <Action></Action>

            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '70%', paddingTop: '10px', marginBottom: '30px' }}>
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            color: 'white',
                            width: '93%',
                            height: '50px',
                            background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
                            marginTop: '20px',
                            marginBottom: "15px",
                            fontWeight: 'bold',
                            fontSize: '15px',
                            borderRadius: '5px',
                            padding: "20px"
                        }}
                    >
                        <Box>
                            <img src={CardLogo} alt="form logo" height='50px' />
                        </Box>
                        <Box>
                            <Typography variant='h5' color='white'>{form.title}</Typography>
                            <Typography variant='heading2' sx={{ fontWeight: '100' }}>
                                {form.description || "Please fill in the form details below"}
                            </Typography>
                        </Box>
                    </Stack>

                    <FormHelperText sx={{ color: '#3b3a3a', mb: 1 }} >
                        * Please fill all details carefully
                    </FormHelperText>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {/* yaer and sem input */}


                        {/* name={fieldName}
                            value={formValues[fieldName] || ''}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)} */}


                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required >
                                <InputLabel id="year-select-label">Year</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    id="year-select"
                                    label="Year"
                                    name='year'
                                    value={formValues['year'] || ''}
                                    onChange={(e) => handleInputChange("year", e.target.value)}
                                >
                                    {batchYear && batchYear.map((year, index) => (
                                        <MenuItem key={index} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="department-select-label">Sem</InputLabel>
                                <Select
                                    labelId="department-select-label-id"
                                    id="department-select"
                                    label="Sem"
                                    name='sem'
                                    value={formValues['sem'] || ''}
                                    onChange={(e) => handleInputChange("sem", e.target.value)}
                                >
                                    <MenuItem value='Even'>Even</MenuItem>
                                    <MenuItem value='Odd'>Odd</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        {form.fields.map((field) => {
                            // Skip rendering fields that are manually implemented
                            if (field.label.toLowerCase() === 'year' || field.label.toLowerCase() === 'sem') {
                                return null;
                            }
                            return (
                                <Grid item xs={12} md={6} lg={6} xl={6} key={field.id}>
                                    {renderField(field)}
                                </Grid>
                            );
                        })}
                    </Grid>



                    {/* display upload media component if it is set uploadMedia to true */}

                    {form && form.includeMedia && (
                        <>
                            <Divider sx={{ paddingTop: '20px', width: "98%" }} />
                            <UploadImage
                                images={images}
                                pdfs={pdfs}
                                handleFileSelect={handleFileSelect}
                                handleRemoveImage={handleRemoveImage}
                                handleRemovePdf={handleRemovePdf}
                                mediaLoading={mediaLoading}
                            />
                        </>
                    )}


                    <Button
                        type="submit"
                        variant='contained'
                        endIcon={!submitting && <SendIcon />}
                        sx={{ width: '120px', mt: 2 }}
                        disabled={submitting}
                    >
                        {submitting ?
                            <CircularProgress size={25} sx={{ color: 'white' }} /> :
                            'Submit'
                        }
                    </Button>



                    {/* <Button disabled={loading} type="submit" variant='contained' endIcon={!loading && <SendIcon />} sx={{ width: '120px' }}>{loading ? <CircularProgress size={25} sx={{ color: 'white' }} /> : 'Submit'}</Button> */}


                </Box>
            </Box>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default DynamicForm;