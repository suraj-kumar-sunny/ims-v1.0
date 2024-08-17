// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <ErrorOutlineIcon style={{ fontSize: '100px', color: '#f44336' }} />
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/home"
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
