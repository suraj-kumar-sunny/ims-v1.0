import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Link } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

// Updated email validation regex
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const containerVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 40 } },
  exit: { opacity: 0, y: '100vh', transition: { ease: 'easeInOut' } }
};

const ForgotPassword = () => {
  const { toggleTheme, mode } = useTheme();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate the email in real-time
    if (isValidEmail(newEmail)) {
      setError('');
    } else {
      setError('Email address is invalid');
    }
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Email address is invalid');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/reset-password');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        padding: 2,
      }}
    >
      <IconButton
        sx={{ alignSelf: 'flex-end', marginBottom: 2 }}
        onClick={toggleTheme}
        color="inherit"
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ width: '100%', maxWidth: '350px' }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Forgot Password
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your email address below and we’ll send you a link to reset your password.
          </Typography>

          <form onSubmit={handleSendResetLink}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleInputChange}
              error={!!error}
              helperText={error}
              InputLabelProps={{ style: { color: 'text.secondary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Remembered your password?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
              >
                Login
              </Link>
            </Typography>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;
