// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   TextField,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Divider
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const MultipleInputs = () => {
//   const [inputs, setInputs] = useState([
//     { id: 1, name: '', designation: '' }
//   ]);
//   const [expanded, setExpanded] = useState(null);

//   // Handle accordion expansion
//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : null);
//   };

//   // Add a new input field
//   const handleAddInput = () => {
//     const newId = inputs.length > 0 ? Math.max(...inputs.map(input => input.id)) + 1 : 1;
//     const newInput = { id: newId, name: '', designation: '' };
//     setInputs([...inputs, newInput]);
//     // Automatically expand the newly added input
//     setExpanded(`panel${newId}`);
//   };

//   // Remove an input field
//   const handleRemoveInput = (id) => {
//     setInputs(inputs.filter(input => input.id !== id));
//   };

//   // Update input values
//   const handleInputChange = (id, field, value) => {
//     setInputs(inputs.map(input => 
//       input.id === id ? { ...input, [field]: value } : input
//     ));
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitted data:', inputs);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Personnel Information
//       </Typography>
      
//       {inputs.map((input) => (
//         <Accordion 
//           key={input.id} 
//           expanded={expanded === `panel${input.id}`} 
//           onChange={handleAccordionChange(`panel${input.id}`)}
//           sx={{ mb: 2 }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel${input.id}-content`}
//             id={`panel${input.id}-header`}
//           >
//             <Typography>
//               {input.name ? input.name : `Person ${input.id}`}
//               {input.designation ? ` - ${input.designation}` : ''}
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Name"
//                   variant="outlined"
//                   value={input.name}
//                   onChange={(e) => handleInputChange(input.id, 'name', e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Designation"
//                   variant="outlined"
//                   value={input.designation}
//                   onChange={(e) => handleInputChange(input.id, 'designation', e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
//                 {inputs.length > 1 && (
//                   <IconButton 
//                     color="error" 
//                     onClick={() => handleRemoveInput(input.id)}
//                     aria-label="delete entry"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </Grid>
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       ))}
      
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <Button 
//           type="button" 
//           variant="outlined" 
//           startIcon={<AddIcon />} 
//           onClick={handleAddInput}
//         >
//           Add Person
//         </Button>
        
//         <Button 
//           type="submit" 
//           variant="contained" 
//           color="primary"
//         >
//           Submit
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default MultipleInputs;


import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';

const MultipleInputs = () => {
  const [inputs, setInputs] = useState([
    { id: 1, name: '', designation: '' }
  ]);
  const [expanded, setExpanded] = useState(false);

  // Handle accordion expansion
  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  // Add a new input field
  const handleAddInput = () => {
    const newId = inputs.length > 0 ? Math.max(...inputs.map(input => input.id)) + 1 : 1;
    const newInput = { id: newId, name: '', designation: '' };
    setInputs([...inputs, newInput]);
    // Ensure dropdown is expanded when adding a new input
    setExpanded(true);
  };

  // Remove an input field
  const handleRemoveInput = (id) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  // Update input values
  const handleInputChange = (id, field, value) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, [field]: value } : input
    ));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', inputs);
    // Here you would typically send the data to your backend
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Personnel Information
      </Typography>
      
      <Accordion 
        expanded={expanded} 
        onChange={handleAccordionChange}
        sx={{ mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="personnel-content"
          id="personnel-header"
        >
          <Typography>
            {inputs.length === 1 ? '1 Person' : `${inputs.length} People`} Added
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {inputs.map((input, index) => (
            <React.Fragment key={input.id}>
              {index > 0 && <Divider sx={{ my: 2 }} />}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={input.name}
                    onChange={(e) => handleInputChange(input.id, 'name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Designation"
                    variant="outlined"
                    value={input.designation}
                    onChange={(e) => handleInputChange(input.id, 'designation', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  {inputs.length > 1 && (
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveInput(input.id)}
                      aria-label="delete entry"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
          
          <Box sx={{ mt: 2 }}>
            <Button 
              type="button" 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={handleAddInput}
              size="small"
            >
              Add Person
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MultipleInputs;