import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { forgotPassword } from '../../api/userApi'; // Import API call
import { useTheme } from '../../contexts/ThemeContext';

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset link.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="w-full max-w-sm">
        <Typography variant="h5" className="mb-4">Forgot Password</Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleForgotPassword}>
          Send Reset Link
        </Button>
        {message && <Typography className="mt-4">{message}</Typography>}
      </div>
    </div>
  );
};

export default ForgotPassword;
