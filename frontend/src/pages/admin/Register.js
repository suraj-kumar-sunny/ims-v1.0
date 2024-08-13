import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { registerUser } from '../../api/userApi'; // Import API call
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Register = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      setMessage('Registration successful!');
      // Redirect or handle successful registration
    } catch (error) {
      setMessage('Error registering');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="w-full max-w-sm">
        <Typography variant="h5" className="mb-4">Register</Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
        <Link to="/login">
          <Button variant="text" fullWidth className="mt-2">Go to Login Page</Button>
        </Link>
        {message && <Typography className="mt-4">{message}</Typography>}
      </div>
    </div>
  );
};

export default Register;
