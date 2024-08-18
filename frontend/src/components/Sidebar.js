import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';
import '../styles/Theme.css'; // Ensure this file contains your theme variables
import { useTheme } from '../contexts/ThemeContext'; // Ensure this is the path to your theme hook
import SidebarLinks from './SidebarLinks';

const Sidebar = () => {
  const { mode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prevState => !prevState);

  return (
    <div
      className={`sidebar-container ${isOpen ? 'open' : 'closed'} ${mode}`}
      role="navigation"
    >
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
          animate={{ width: isOpen ? '200px' : '40px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            className="company-name"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            Your Company
          </motion.div>          
          <SidebarLinks isOpen={isOpen} />
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
