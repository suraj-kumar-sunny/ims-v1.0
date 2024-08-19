import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './index.css';  // Your global CSS
import ThemeContextProvider from './contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
  <ThemeContextProvider>  {/* Wrap the entire app in ThemeContextProvider */}
    <App />
  </ThemeContextProvider>
  </React.StrictMode>
);
