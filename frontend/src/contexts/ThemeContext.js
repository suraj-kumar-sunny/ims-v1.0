// src/ThemeContext.js
import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: '#d9d9d9', // light sky blue
                paper: '#f0f0f0',
              },
              text: {
                primary: '#262626',
                secondary: '#002766', //dark blue
              },
            }
          : {
              background: {
                default: '#141414',
                paper: '#262626',
              },
              text: {
                primary: '#bfbfbf',
                secondary: '#91d5ff',
              },
            }),
      },
    }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
