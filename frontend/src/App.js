// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import About from './pages/About';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/auth/NotFound';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

const App = () => {
  // Example state to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This function should be called upon successful login
  const handleLogin = () => {
    console.log("click");
    
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute
                element={<Layout><Home /></Layout>}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute
                element={<Layout><About /></Layout>}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute
                element={<Layout><NotFound /></Layout>}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
