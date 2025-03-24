// import React, { useState } from 'react';
// import {
//     Box, Typography, Button, Paper, Grid,
//     TextField, MenuItem, Switch, FormControlLabel,
//     List, ListItem, ListItemText, IconButton,
//     FormHelperText, Checkbox, Divider, Card, CardContent, CardHeader
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const fieldTypes = [
//     { value: 'text', label: 'Text Field' },
//     { value: 'number', label: 'Number Field' },
//     { value: 'select', label: 'Dropdown' },
//     { value: 'checkbox', label: 'Checkbox' },
//     { value: 'date', label: 'Date Picker' },
//     { value: 'file', label: 'File Upload' }
// ];

// const FormBuilder = () => {
//     const [formTitle, setFormTitle] = useState('');
//     const [formDesc, setFormDesc] = useState('');
//     const [formCategory, setFormCategory] = useState('');
//     const [formFields, setFormFields] = useState([]);
//     const [includeMedia, setIncludeMedia] = useState(false);

//     const [currentField, setCurrentField] = useState({
//         type: 'text',
//         label: '',
//         required: false,
//         column_span: '1',
//         options: [],
//     });

//     const addField = () => {
//         if (!currentField.label) return;

//         setFormFields([...formFields, {
//             ...currentField,
//             id: `field-${Date.now()}`
//         }]);

//         // Reset current field
//         setCurrentField({
//             type: 'text',
//             label: '',
//             required: false,
//             column_span: '1',
//             options: [],
//         });
//     };

//     const removeField = (index) => {
//         const updatedFields = [...formFields];
//         updatedFields.splice(index, 1);
//         setFormFields(updatedFields);
//     };

//     const handleMediaChange = (event) => {
//         setIncludeMedia(event.target.checked);
//     };

//     const moveField = (index, direction) => {
//         if (
//             (direction === 'up' && index === 0) ||
//             (direction === 'down' && index === formFields.length - 1)
//         ) {
//             return;
//         }

//         const newIndex = direction === 'up' ? index - 1 : index + 1;
//         const updatedFields = [...formFields];
//         const field = updatedFields[index];

//         // Remove the field from its current position
//         updatedFields.splice(index, 1);
//         // Insert it at the new position
//         updatedFields.splice(newIndex, 0, field);

//         setFormFields(updatedFields);
//     };

//     const handleOptionsChange = (e) => {
//         setCurrentField({
//             ...currentField,
//             options: e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt !== '')
//         });
//     };

//     const saveForm = async () => {
//         if (!formTitle || formFields.length === 0) return;

//         try {
//             const fieldsToSubmit = [
//                 ...formFields,
//                 {
//                   type: 'text',
//                   label: 'Year',
//                   required: true,
//                   options: [],
//                   id: `field-${Date.now()}`
//                 },
//                 {
//                   type: 'text',
//                   label: 'Sem',
//                   required: true,
//                   options: [],
//                   id: `field-${Date.now() + 1}`
//                 }
//             ];

//             const response = await fetch('/api/admin/addForm', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     slug: formTitle.toLowerCase()
//                         .replace(/\s+/g, '-')
//                         .replace(/[^\w-]+/g, ''),
//                     title: formTitle,
//                     fields: fieldsToSubmit,
//                     description: formDesc,
//                     category: formCategory,
//                     includeMedia: includeMedia
//                 }),
//             });

//             if (response.ok) {
//                 setFormTitle('');
//                 setFormDesc('');
//                 setFormCategory('');
//                 setFormFields([]);
//                 setIncludeMedia(false);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <Box sx={{ overflowY: 'auto', height: '100%', padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//                 Form Builder
//             </Typography>

//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card>
//                         <CardHeader title="Form Details" />
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Form Title"
//                                         value={formTitle}
//                                         onChange={(e) => setFormTitle(e.target.value)}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Description"
//                                         value={formDesc}
//                                         onChange={(e) => setFormDesc(e.target.value)}
//                                         multiline
//                                         rows={3}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <TextField
//                                         select
//                                         fullWidth
//                                         label="Category"
//                                         value={formCategory}
//                                         onChange={(e) => setFormCategory(e.target.value)}
//                                     >
//                                         <MenuItem value="r&d cell">R&D Cell</MenuItem>
//                                         <MenuItem value="tyro">Tyro Club</MenuItem>
//                                         <MenuItem value="other">Other</MenuItem>
//                                     </TextField>
//                                 </Grid>
//                                 <Grid item xs={12} md={6}>
//                                     <FormControlLabel
//                                         control={
//                                             <Checkbox
//                                                 checked={includeMedia}
//                                                 onChange={handleMediaChange}
//                                                 name="checkbox"
//                                                 color="primary"
//                                             />
//                                         }
//                                         label="Include Media Upload Field"
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12}>
//                     <Card>
//                         <CardHeader title="Add New Field" />
//                         <CardContent>
//                             <Grid container spacing={2} alignItems="center">
//                                 <Grid item xs={12} md={3}>
//                                     <TextField
//                                         select
//                                         fullWidth
//                                         label="Field Type"
//                                         value={currentField.type}
//                                         onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
//                                     >
//                                         {fieldTypes.map((option) => (
//                                             <MenuItem key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </TextField>
//                                 </Grid>
//                                 <Grid item xs={12} md={5}>
//                                     <TextField
//                                         fullWidth
//                                         label="Field Label"
//                                         value={currentField.label}
//                                         onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6} md={2}>
//                                     <TextField
//                                         type="number"
//                                         fullWidth
//                                         label="Column Span (1-12)"
//                                         value={currentField.column_span}
//                                         onChange={(e) => setCurrentField({ ...currentField, column_span: e.target.value })}
//                                         inputProps={{ min: 1, max: 12 }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6} md={2}>
//                                     <FormControlLabel
//                                         control={
//                                             <Switch
//                                                 checked={currentField.required}
//                                                 onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
//                                             />
//                                         }
//                                         label="Required"
//                                     />
//                                 </Grid>

//                                 {currentField.type === 'select' && (
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             label="Options (comma-separated)"
//                                             onChange={handleOptionsChange}
//                                             helperText="Enter comma-separated values for dropdown options"
//                                         />
//                                     </Grid>
//                                 )}

//                                 <Grid item xs={12}>
//                                     <Button 
//                                         variant="contained" 
//                                         onClick={addField}
//                                         startIcon={<AddCircleIcon />}
//                                         sx={{ mt: 1 }}
//                                     >
//                                         Add Field
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12}>
//                     <Card>
//                         <CardHeader title={`Form Fields (${formFields.length})`} />
//                         <CardContent>
//                             {formFields.length > 0 ? (
//                                 <Paper variant="outlined">
//                                     <List>
//                                         {formFields.map((field, index) => (
//                                             <React.Fragment key={field.id}>
//                                                 {index > 0 && <Divider />}
//                                                 <ListItem
//                                                     sx={{ 
//                                                         backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
//                                                         py: 1
//                                                     }}
//                                                     secondaryAction={
//                                                         <Box>
//                                                             <IconButton
//                                                                 edge="end"
//                                                                 aria-label="move up"
//                                                                 onClick={() => moveField(index, 'up')}
//                                                                 disabled={index === 0}
//                                                                 size="small"
//                                                             >
//                                                                 <ArrowUpwardIcon />
//                                                             </IconButton>
//                                                             <IconButton
//                                                                 edge="end"
//                                                                 aria-label="move down"
//                                                                 onClick={() => moveField(index, 'down')}
//                                                                 disabled={index === formFields.length - 1}
//                                                                 size="small"
//                                                             >
//                                                                 <ArrowDownwardIcon />
//                                                             </IconButton>
//                                                             <IconButton
//                                                                 edge="end"
//                                                                 aria-label="delete"
//                                                                 onClick={() => removeField(index)}
//                                                                 size="small"
//                                                                 color="error"
//                                                             >
//                                                                 <DeleteIcon />
//                                                             </IconButton>
//                                                         </Box>
//                                                     }
//                                                 >
//                                                     <ListItemText
//                                                         primary={
//                                                             <Typography variant="subtitle1">
//                                                                 {`${index + 1}. ${field.label}`} 
//                                                                 {field.required && 
//                                                                     <Typography component="span" color="error" sx={{ ml: 1 }}>*</Typography>
//                                                                 }
//                                                             </Typography>
//                                                         }
//                                                         secondary={
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 Type: {fieldTypes.find(f => f.value === field.type)?.label || field.type}
//                                                                 {field.column_span && `, Span: ${field.column_span} column${field.column_span !== '1' ? 's' : ''}`}
//                                                                 {field.type === 'select' && field.options.length > 0 &&
//                                                                     <>, Options: ${field.options.join(', ')}</>
//                                                                 }
//                                                             </Typography>
//                                                         }
//                                                     />
//                                                 </ListItem>
//                                             </React.Fragment>
//                                         ))}
//                                     </List>
//                                 </Paper>
//                             ) : (
//                                 <Box sx={{ textAlign: 'center', py: 4 }}>
//                                     <Typography color="text.secondary">No fields added yet</Typography>
//                                     <FormHelperText>Add fields using the form above</FormHelperText>
//                                 </Box>
//                             )}

//                             {formFields.length > 0 && (
//                                 <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={saveForm}
//                                         size="large"
//                                     >
//                                         Save Form
//                                     </Button>
//                                 </Box>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default FormBuilder;


import React, { useState, useRef } from 'react';
import {
    Box, Typography, Button, Paper, Grid,
    TextField, MenuItem, Switch, FormControlLabel,
    List, ListItem, ListItemText, IconButton,
    FormHelperText, Checkbox, Divider, Card, CardContent, CardHeader,
    Avatar, Input
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

const fieldTypes = [
    { value: 'text', label: 'Text Field' },
    { value: 'number', label: 'Number Field' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date Picker' },
    { value: 'file', label: 'File Upload' }
];

const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formFields, setFormFields] = useState([]);
    const [includeMedia, setIncludeMedia] = useState(false);
    const [formLogo, setFormLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    const logoInputRef = useRef(null);

    const [currentField, setCurrentField] = useState({
        type: 'text',
        label: '',
        required: false,
        column_span: '1',
        options: [],
    });

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setFormLogo(null);
        setLogoPreview('');
        if (logoInputRef.current) {
            logoInputRef.current.value = '';
        }
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
    };

    const removeField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleMediaChange = (event) => {
        setIncludeMedia(event.target.checked);
    };

    const moveField = (index, direction) => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === formFields.length - 1)
        ) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const updatedFields = [...formFields];
        const field = updatedFields[index];

        // Remove the field from its current position
        updatedFields.splice(index, 1);
        // Insert it at the new position
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
        if (!formTitle || formFields.length === 0) return;

        try {
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

            // Create form data to send files
            const formData = new FormData();
            formData.append('title', formTitle);
            formData.append('slug', formTitle.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, ''));
            formData.append('description', formDesc);
            formData.append('category', formCategory);
            formData.append('includeMedia', includeMedia);
            formData.append('fields', JSON.stringify(fieldsToSubmit));

            // Add logo if it exists
            if (formLogo) {
                formData.append('logo', formLogo);
            }

            const response = await fetch('/api/admin/addForm', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setFormTitle('');
                setFormDesc('');
                setFormCategory('');
                setFormFields([]);
                setIncludeMedia(false);
                setFormLogo(null);
                setLogoPreview('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{ overflowY: 'auto', height: '100%', padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Form Builder
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Form Details" />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        fullWidth
                                        label="Form Title"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={formDesc}
                                        onChange={(e) => setFormDesc(e.target.value)}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                    >
                                        <MenuItem value="r&d cell">R&D Cell</MenuItem>
                                        <MenuItem value="tyro">Tyro Club</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={includeMedia}
                                                onChange={handleMediaChange}
                                                name="checkbox"
                                                color="primary"
                                            />
                                        }
                                        label="Include Media Upload Field"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1">Form Logo</Typography>
                                        {logoPreview ? (
                                            <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                                                <Avatar
                                                    src={logoPreview}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        objectFit: 'contain',
                                                        border: '1px solid #eee'
                                                    }}
                                                    variant="rounded"
                                                />
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -10,
                                                        right: -10,
                                                        backgroundColor: 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5'
                                                        }
                                                    }}
                                                    onClick={removeLogo}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    border: '2px dashed #ccc',
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => logoInputRef.current.click()}
                                            >
                                                <ImageIcon sx={{ color: '#aaa', fontSize: 40 }} />
                                            </Box>
                                        )}
                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleLogoUpload}
                                        />
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                            size="small"
                                            onClick={() => logoInputRef.current.click()}
                                        >
                                            {logoPreview ? 'Change Logo' : 'Upload Logo'}
                                        </Button>
                                    </Box>
                                </Grid>


                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Add New Field" />
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Field Type"
                                        value={currentField.type}
                                        onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
                                    >
                                        {fieldTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        fullWidth
                                        label="Field Label"
                                        value={currentField.label}
                                        onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Column Span (1-12)"
                                        value={currentField.column_span}
                                        onChange={(e) => setCurrentField({ ...currentField, column_span: e.target.value })}
                                        inputProps={{ min: 1, max: 12 }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={currentField.required}
                                                onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
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
                                            helperText="Enter comma-separated values for dropdown options"
                                        />
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        onClick={addField}
                                        startIcon={<AddCircleIcon />}
                                        sx={{ mt: 1 }}
                                    >
                                        Add Field
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={`Form Fields (${formFields.length})`} />
                        <CardContent>
                            {formFields.length > 0 ? (
                                <Paper variant="outlined">
                                    <List>
                                        {formFields.map((field, index) => (
                                            <React.Fragment key={field.id}>
                                                {index > 0 && <Divider />}
                                                <ListItem
                                                    sx={{
                                                        backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                                                        py: 1
                                                    }}
                                                    secondaryAction={
                                                        <Box>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="move up"
                                                                onClick={() => moveField(index, 'up')}
                                                                disabled={index === 0}
                                                                size="small"
                                                            >
                                                                <ArrowUpwardIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="move down"
                                                                onClick={() => moveField(index, 'down')}
                                                                disabled={index === formFields.length - 1}
                                                                size="small"
                                                            >
                                                                <ArrowDownwardIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={() => removeField(index)}
                                                                size="small"
                                                                color="error"
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle1">
                                                                {`${index + 1}. ${field.label}`}
                                                                {field.required &&
                                                                    <Typography component="span" color="error" sx={{ ml: 1 }}>*</Typography>
                                                                }
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography variant="body2" color="text.secondary">
                                                                Type: {fieldTypes.find(f => f.value === field.type)?.label || field.type}
                                                                {field.column_span && `, Span: ${field.column_span} column${field.column_span !== '1' ? 's' : ''}`}
                                                                {field.type === 'select' && field.options.length > 0 &&
                                                                    <>, Options: ${field.options.join(', ')}</>
                                                                }
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Paper>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography color="text.secondary">No fields added yet</Typography>
                                    <FormHelperText>Add fields using the form above</FormHelperText>
                                </Box>
                            )}

                            {formFields.length > 0 && (
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={saveForm}
                                        size="large"
                                    >
                                        Save Form
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormBuilder;