
import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Grid, TextField, MenuItem,
    FormControlLabel, List, ListItem, ListItemText, IconButton,
    FormHelperText, Checkbox, Divider, Card, CardContent,
    Avatar, Snackbar, Alert, Tooltip, Tabs, Tab,
    Switch,
    Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import Action from '../Action';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import { navbarColor } from '../../utils/color';
import ConstructionIcon from '@mui/icons-material/Construction';

const fieldTypes = [
    { value: 'text', label: 'Text Field' },
    { value: 'number', label: 'Number Field' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date Picker' },
    { value: 'file', label: 'File Upload' }
];

const FormBuilder = () => {
    // State for form details
    const [formTitle, setFormTitle] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formFields, setFormFields] = useState([]);
    const [includeMedia, setIncludeMedia] = useState(false);
    const [formLogo, setFormLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [descWordCount, setDescWordCount] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    // Current field being edited
    const [currentField, setCurrentField] = useState({
        type: 'text',
        label: '',
        required: false,
        column_span: '1',
        options: [],
    });

    const logoInputRef = useRef(null);

    // Calculate word count whenever description changes
    useEffect(() => {
        const wordCount = formDesc.trim() ? formDesc.trim().split(/\s+/).length : 0;
        setDescWordCount(wordCount);
    }, [formDesc]);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 1048576) {
                setAlert({
                    open: true,
                    message: "Logo file size exceeds 1MB limit",
                    severity: 'error'
                });
                return;
            }

            setFormLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (e) => {
        const newDesc = e.target.value;
        setFormDesc(newDesc);

        const wordCount = newDesc.trim() ? newDesc.trim().split(/\s+/).length : 0;
        if (wordCount > 10) {
            setAlert({
                open: true,
                message: "Description exceeds 10 words limit",
                severity: 'warning'
            });
        }
    };

    const removeLogo = () => {
        setFormLogo(null);
        setLogoPreview('');
        if (logoInputRef.current) {
            logoInputRef.current.value = '';
        }
    };

    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
    };

    const addField = () => {
        if (!currentField.label) return;

        setFormFields([...formFields, {
            ...currentField,
            id: `field-${Date.now()}`
        }]);

        // Reset current field
        setCurrentField({
            type: 'text',
            label: '',
            required: false,
            column_span: '1',
            options: [],
        });

        // Switch to fields tab after adding
        setActiveTab(1);
    };

    const removeField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const moveField = (index, direction) => {
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === formFields.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const updatedFields = [...formFields];
        const field = updatedFields[index];

        updatedFields.splice(index, 1);
        updatedFields.splice(newIndex, 0, field);
        setFormFields(updatedFields);
    };

    const handleOptionsChange = (e) => {
        setCurrentField({
            ...currentField,
            options: e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt !== '')
        });
    };

    const saveForm = async () => {
        if (!formTitle || formFields.length === 0) {
            setAlert({
                open: true,
                message: "Form title and at least one field are required",
                severity: 'error'
            });
            return;
        }

        if (descWordCount > 10) {
            setAlert({
                open: true,
                message: "Description exceeds 10 words limit. Please shorten it before saving.",
                severity: 'error'
            });
            return;
        }

        try {
            // Add required Year and Sem fields
            const fieldsToSubmit = [
                ...formFields,
                {
                    type: 'text',
                    label: 'Year',
                    required: true,
                    options: [],
                    id: `field-${Date.now()}`
                },
                {
                    type: 'text',
                    label: 'Sem',
                    required: true,
                    options: [],
                    id: `field-${Date.now() + 1}`
                }
            ];

            const formData = new FormData();
            formData.append('title', formTitle);
            formData.append('slug', formTitle.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, ''));
            formData.append('description', formDesc);
            formData.append('category', formCategory);
            formData.append('includeMedia', includeMedia);
            formData.append('fields', JSON.stringify(fieldsToSubmit));

            if (formLogo) {
                formData.append('logo', formLogo);
            }

            const response = await axios.post('/api/admin/addForm', formData,{withCredentials:true});

            if (response.status === 201) {
                // Reset form
                setFormTitle('');
                setFormDesc('');
                setFormCategory('');
                setFormFields([]);
                setIncludeMedia(false);
                setFormLogo(null);
                setLogoPreview('');
                setDescWordCount(0);
                setActiveTab(0);

                setAlert({
                    open: true,
                    message: "Form created successfully!",
                    severity: 'success'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || "An error occurred during form save.";
            setAlert({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
                <Stack direction="row" display="flex" alignItems="center" spacing={2} mt={1} mb={1}>
                    <ConstructionIcon sx={{color:'#40403f'}}/>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                        Form Builder
                    </Typography>
                </Stack>

                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ mb: 2 }}
                    indicatorColor="primary"
                >
                    <Tab label="Form Details" />
                    <Tab label={`Fields (${formFields.length})`} />
                </Tabs>

                {/* Form Details Tab */}
                {activeTab === 0 && (
                    <Card elevation={1} sx={{ backgroundColor: '#fffbf6', paddingTop: '10px', paddingBottom: '10px' }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        label="Form Title *"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        size="small"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Category *"
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                    >
                                        <MenuItem value="r&d_cell">R&D Cell</MenuItem>
                                        <MenuItem value="tyro">Tyro Club</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={formDesc}
                                        onChange={handleDescriptionChange}
                                        multiline
                                        rows={2}
                                        error={descWordCount > 10}
                                        size="small"
                                        helperText={`Description must be max 10 words (${descWordCount}/10 words used)`}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={includeMedia}
                                                onChange={(e) => setIncludeMedia(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Include Media Upload Field"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {logoPreview ? (
                                            <Box sx={{ position: 'relative' }}>
                                                <Avatar
                                                    src={logoPreview}
                                                    sx={{ width: 60, height: 60, objectFit: 'contain' }}
                                                    variant="rounded"
                                                />
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        backgroundColor: 'white',
                                                        boxShadow: 1
                                                    }}
                                                    onClick={removeLogo}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    border: '1px dashed #ccc',
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => logoInputRef.current.click()}
                                            >
                                                <ImageIcon sx={{ color: '#aaa' }} />
                                            </Box>
                                        )}
                                        <Box>
                                            <Typography variant="body2">Form Logo</Typography>
                                            <Button
                                                variant="text"
                                                startIcon={<CloudUploadIcon />}
                                                size="small"
                                                onClick={() => logoInputRef.current.click()}
                                            >
                                                {logoPreview ? 'Change' : 'Upload'}
                                            </Button>
                                            <input
                                                ref={logoInputRef}
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleLogoUpload}
                                            />
                                            <FormHelperText>Max: 1MB</FormHelperText>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => setActiveTab(1)}
                                        disabled={!formTitle || !formCategory}
                                    >
                                        Next: Add Fields
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {/* Fields Tab */}
                {activeTab === 1 && (
                    <Box>
                        {/* Add Field Section */}
                        <Card elevation={1} sx={{ mb: 2, backgroundColor: '#fffbf6', paddingTop: '10px', paddingBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>Add New Field</Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Type"
                                            value={currentField.type}
                                            onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
                                            size="small"
                                        >
                                            {fieldTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            fullWidth
                                            label="Label *"
                                            value={currentField.label}
                                            onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={6} sm={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            label="Columns"
                                            value={currentField.column_span}
                                            onChange={(e) => setCurrentField({ ...currentField, column_span: e.target.value })}
                                            inputProps={{ min: 1, max: 12 }}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={6} sm={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentField.required}
                                                    onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
                                                    size="small"
                                                />
                                            }
                                            label="Required"
                                        />
                                    </Grid>

                                    {currentField.type === 'select' && (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Options (comma-separated)"
                                                onChange={handleOptionsChange}
                                                helperText="e.g. Option 1, Option 2, Option 3"
                                                size="small"
                                            />
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={addField}
                                            startIcon={<AddIcon />}
                                            disabled={!currentField.label}
                                            size="small"
                                        >
                                            Add Field
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Field List */}
                        <Card elevation={1} sx={{ backgroundColor: '#fffbf6', paddingTop: '10px', paddingBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>Field List</Typography>
                                {formFields.length > 0 ? (
                                    <Paper variant="outlined">
                                        <List dense disablePadding>
                                            {formFields.map((field, index) => (
                                                <React.Fragment key={field.id}>
                                                    {index > 0 && <Divider />}
                                                    <ListItem
                                                        sx={{
                                                            backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                                                        }}
                                                        secondaryAction={
                                                            <Box>
                                                                <Tooltip title="Move Up">
                                                                    <span>
                                                                        <IconButton
                                                                            edge="end"
                                                                            aria-label="move up"
                                                                            onClick={() => moveField(index, 'up')}
                                                                            disabled={index === 0}
                                                                            size="small"
                                                                        >
                                                                            <ArrowUpwardIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </span>
                                                                </Tooltip>
                                                                <Tooltip title="Move Down">
                                                                    <span>
                                                                        <IconButton
                                                                            edge="end"
                                                                            aria-label="move down"
                                                                            onClick={() => moveField(index, 'down')}
                                                                            disabled={index === formFields.length - 1}
                                                                            size="small"
                                                                        >
                                                                            <ArrowDownwardIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </span>
                                                                </Tooltip>
                                                                <Tooltip title="Remove">
                                                                    <IconButton
                                                                        edge="end"
                                                                        aria-label="delete"
                                                                        onClick={() => removeField(index)}
                                                                        size="small"
                                                                        color="error"
                                                                    >
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Box>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    {`${index + 1}. ${field.label}`}
                                                                    {field.required && <Typography component="span" color="error" sx={{ ml: 0.5 }}>*</Typography>}
                                                                </Typography>
                                                            }
                                                            secondary={
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {fieldTypes.find(f => f.value === field.type)?.label || field.type}
                                                                    {field.type === 'select' && field.options.length > 0 &&
                                                                        ` • Options: ${field.options.join(', ')}`
                                                                    }
                                                                    {` • ${field.column_span} column${field.column_span !== '1' ? 's' : ''}`}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </Paper>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 3 }}>
                                        <Typography color="text.secondary" variant="body2">No fields added yet</Typography>
                                    </Box>
                                )}

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => setActiveTab(0)}>
                                        Back to Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={saveForm}
                                        startIcon={<SaveIcon />}
                                        disabled={!formTitle || formFields.length === 0 || descWordCount > 10}
                                    >
                                        Save Form
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Form Summary Box */}
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>Form Summary</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Typography variant="caption">Title:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{formTitle || 'Not set'}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="caption">Category:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{formCategory || 'Not set'}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="caption">Fields:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {formFields.length} custom
                                        <Typography component="span" variant="caption" color="text.secondary"> (+2 system fields)</Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )}

                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Paper>
    );
};

export default FormBuilder;