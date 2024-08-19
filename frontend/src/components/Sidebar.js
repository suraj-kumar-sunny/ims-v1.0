import React, { useState, useRef, useEffect } from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';
import '../styles/Theme.css'; // Ensure this file contains your theme variables
import { useTheme } from '../contexts/ThemeContext'; // Ensure this is the correct path to your theme hook
import SidebarLinks from './SidebarLinks';
import { Divider } from '@mui/material';

const Sidebar = () => {
  const { mode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/home'); // Default active link
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(prevState => !prevState);

  // Close sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !backdropRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Handle clicks on sidebar links
  const handleLinkClick = (path) => {
    setActiveLink(path);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside the sidebar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`backdrop ${isOpen ? 'active' : ''}`} 
        ref={backdropRef}
        onClick={toggleSidebar}
        aria-hidden="true"
      />
      <div
        className={`sidebar-container ${isOpen ? 'open' : 'closed'} ${mode}`}
        role="navigation"
        ref={sidebarRef}
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
            animate={{ width: isOpen ? '200px' : '50px' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div
              className={`company-name ${isOpen ? 'show' : 'hide'}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Your Company
            </motion.div>
            <Divider />
            <SidebarLinks isOpen={isOpen} activeLink={activeLink} onLinkClick={handleLinkClick} />
          </motion.div>
          <footer className="sidebar-footer">
            {/* Add footer content here */}
            Footer Content
          </footer>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
