// src/Register.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 40 } },
  exit: { opacity: 0, y: '100vh', transition: { ease: 'easeInOut' } }
};

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const validateName = (value) => {
    if (!value) {
      return 'Name is required';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Email address is invalid';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const validateConfirmPassword = (value, password) => {
    if (!value) {
      return 'Confirm password is required';
    } else if (value !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
      setErrors(prevErrors => ({ ...prevErrors, name: validateName(value) }));
    } else if (name === 'email') {
      setEmail(value);
      setErrors(prevErrors => ({ ...prevErrors, email: validateEmail(value) }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors(prevErrors => ({ ...prevErrors, password: validatePassword(value) }));
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: validateConfirmPassword(value, password) }));
    }
  };

  const handleRegister = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      // Proceed with registration logic
      navigate('/home');
    } else {
      setErrors({ name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });
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
            Register
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            InputLabelProps={{ style: { color: 'text.secondary' } }}
            InputProps={{ style: { color: 'text.primary' } }}
          />

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
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { color: 'text.secondary' } }}
            InputProps={{ style: { color: 'text.primary' } }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputLabelProps={{ style: { color: 'text.secondary' } }}
            InputProps={{ style: { color: 'text.primary' } }}
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I agree to the terms and conditions"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link onClick={() => navigate('/login')}             
            sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}>Login</Link>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Register;
