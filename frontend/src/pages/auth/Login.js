import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Checkbox, FormControlLabel, Link, InputAdornment } from '@mui/material';
import { Brightness4, Brightness7, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 40 } },
  exit: { opacity: 0, y: '100vh', transition: { ease: 'easeInOut' } }
};

const Login = () => {
  const { toggleTheme, mode } = useTheme();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors(prevErrors => ({ ...prevErrors, email: validateEmail(value) }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors(prevErrors => ({ ...prevErrors, password: validatePassword(value) }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (!emailError && !passwordError) {
      navigate('/home'); // Implement login logic here
    } else {
      setErrors({ email: emailError, password: passwordError });
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
        bgcolor: theme => theme.palette.background.default,
        color: theme => theme.palette.text.primary,
        padding: 2,
        position: 'relative', // Ensure positioning context for the IconButton
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1, // Ensures the button is on top of other content
        }}
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
            backgroundColor: theme => theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ style: { color: 'text.secondary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{ style: { color: 'text.secondary' } }}
              InputProps={{
                style: { color: 'text.primary' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />

            <Link href="#" variant="body2" 
                sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Don’t have an account? <Link onClick={() => navigate('/register')} 
                sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}>Register</Link>
            </Typography>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Login;
