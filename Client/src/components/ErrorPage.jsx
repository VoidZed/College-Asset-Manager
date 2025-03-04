import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';

const ErrorPage = ({ errorMessage }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" mt={4}>
        <figure>
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
            alt="404 page"
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </figure>
        <Typography variant="h5" color='#474747' fontWeight='bold' gutterBottom>
          {errorMessage || "The page you were looking for could not be found"}
        </Typography>
        <Typography variant="body2" color='#474747' paragraph>
          Back to previous page
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
