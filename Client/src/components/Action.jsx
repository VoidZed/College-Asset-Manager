import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton, Stack } from '@mui/material';

const Action = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleForward = () => {
    navigate(1);
  };
  
  return (
    <Stack direction='row' spacing={4} color='#403f3f' paddingTop='10px'>
      <IconButton 
        onClick={handleGoBack}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            cursor: 'pointer',
            color: '#2b2b2b',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <IconButton 
        onClick={handleForward}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            cursor: 'pointer',
            color: '#2b2b2b',
          }
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
};

export default Action;