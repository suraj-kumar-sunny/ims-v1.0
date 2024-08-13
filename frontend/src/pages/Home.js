import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col justify-between ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="p-4 flex justify-between items-center">
        <div>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </div>
        <div>
          <Link to="/login">
            <Button variant="outlined" className="mx-4">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" className="mx-4">Register</Button>
          </Link>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <h1 className={`text-4xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>Welcome</h1>
      </div>
    </div>
  );
};

export default Home;
