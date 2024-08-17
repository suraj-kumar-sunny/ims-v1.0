import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';  // Your global CSS
import ThemeContextProvider from './contexts/ThemeContext';

ReactDOM.render(
  <ThemeContextProvider>  {/* Wrap the entire app in ThemeContextProvider */}
    <App />
  </ThemeContextProvider>,
  document.getElementById('root')
);
