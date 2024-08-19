import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 1, textAlign: 'center' }}>
      <Typography variant="body2">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </Typography>
    </Box>
  );
};

export default Footer;
