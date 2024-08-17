import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/auth/NotFound';
import Layout from './components/Layout'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched routes */}
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
};

export default App;
