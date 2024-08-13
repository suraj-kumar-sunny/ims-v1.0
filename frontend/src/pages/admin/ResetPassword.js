import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api/userApi'; // Import API call
import { useTheme } from '../../contexts/ThemeContext';

const ResetPassword = () => {
  const { theme } = useTheme();
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(resetToken, password);
      setMessage('Password reset successful.');
      // Redirect or handle successful password reset
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="w-full max-w-sm">
        <Typography variant="h5" className="mb-4">Reset Password</Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
          Reset Password
        </Button>
        {message && <Typography className="mt-4">{message}</Typography>}
      </div>
    </div>
  );
};

export default ResetPassword;
