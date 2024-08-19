import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        p: 3,
        borderRadius: 1,
      }}
    >
      <Typography variant="h4">About Page</Typography>
      <Typography variant="body1">
        This is the about page. Here you can learn more about us and our mission.
      </Typography>
    </Box>
  );
};

export default About;
