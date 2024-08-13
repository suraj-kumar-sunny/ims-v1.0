import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { loginUser } from '../../api/userApi'; // Import API call
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Login = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      setMessage('Login successful!');
      // Redirect or handle successful login
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="w-full max-w-sm">
        <Typography variant="h5" className="mb-4">Login</Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Link to="/forgot-password">
          <Button variant="text" fullWidth className="mt-2">Forgot Password?</Button>
        </Link>
        {message && <Typography className="mt-4">{message}</Typography>}
      </div>
    </div>
  );
};

export default Login;
