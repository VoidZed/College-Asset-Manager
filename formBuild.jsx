// client/src/components/FormBuilder.jsx
import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, 
  TextField, MenuItem, Switch, FormControlLabel,
  List, ListItem, ListItemText, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
  const [formFields, setFormFields] = useState([]);
  const [currentField, setCurrentField] = useState({
    type: 'text',
    label: '',
    required: false,
    options: [], // for select fields
    validation: { type: null, params: {} }
  });

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
      options: [],
      validation: { type: null, params: {} }
    });
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
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
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          fields: formFields
        }),
      });
      
      if (response.ok) {
        alert('Form successfully created!');
        setFormTitle('');
        setFormFields([]);
      } else {
        alert('Error creating form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Form Builder
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        
        <Typography variant="h6" gutterBottom>Add New Field</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="Field Type"
              value={currentField.type}
              onChange={(e) => setCurrentField({...currentField, type: e.target.value})}
            >
              {fieldTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Field Label"
              value={currentField.label}
              onChange={(e) => setCurrentField({...currentField, label: e.target.value})}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentField.required}
                  onChange={(e) => setCurrentField({...currentField, required: e.target.checked})}
                />
              }
              label="Required"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={addField}>
              Add Field
            </Button>
          </Grid>
        </Grid>

        {currentField.type === 'select' && (
          <TextField
            fullWidth
            label="Options (comma-separated)"
            sx={{ mt: 2 }}
            onChange={handleOptionsChange}
          />
        )}
      </Paper>

      <Typography variant="h6" gutterBottom>
        Form Fields
      </Typography>
      
      <Paper>
        <List>
          {formFields.map((field, index) => (
            <ListItem
              key={field.id}
              secondaryAction={
                <Box>
                  <IconButton 
                    edge="end" 
                    aria-label="move up"
                    onClick={() => moveField(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="move down"
                    onClick={() => moveField(index, 'down')}
                    disabled={index === formFields.length - 1}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => removeField(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={`${index + 1}. ${field.label} (${field.type})`}
                secondary={
                  <>
                    {field.required ? 'Required' : 'Optional'}
                    {field.type === 'select' && field.options.length > 0 && 
                      `, Options: ${field.options.join(', ')}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {formFields.length > 0 && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={saveForm}
          sx={{ mt: 3 }}
        >
          Save Form
        </Button>
      )}
    </Box>
  );
};

export default FormBuilder;