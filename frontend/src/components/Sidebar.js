// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Login as LoginIcon, PersonAdd as RegisterIcon, Password as ForgotPasswordIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = () => {
  const { mode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prevState => !prevState);

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'} ${mode}`}>
      <div className="sidebar">
        <button 
          className="toggle-button" 
          onClick={toggleSidebar} 
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseIcon className="toggle-icon" /> : <MenuIcon className="toggle-icon" />}
        </button>
        <motion.div
          className="sidebar-content"
          initial={{ width: 0 }}
          animate={{ width: isOpen ? '250px' : '60px' }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="company-name"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.3 }}
            transition={{ duration: 0.1 }}
          >
            Your Company
          </motion.div>
          <div className="sidebar-links">
            <Link to="/home" className="sidebar-link">
              <HomeIcon className="sidebar-icon" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              >
                Home
              </motion.span>
            </Link>
            <Link to="/login" className="sidebar-link">
              <LoginIcon className="sidebar-icon" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              >
                Login
              </motion.span>
            </Link>
            <Link to="/register" className="sidebar-link">
              <RegisterIcon className="sidebar-icon" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              >
                Register
              </motion.span>
            </Link>
            <Link to="/forgot-password" className="sidebar-link">
              <ForgotPasswordIcon className="sidebar-icon" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              >
                Forgot Password
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
