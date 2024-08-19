import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Login as LoginIcon, PersonAdd as RegisterIcon, Password as ForgotPasswordIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';

const linkData = [
  { to: '/home', icon: <HomeIcon />, label: 'Home' },
  { to: '/login', icon: <LoginIcon />, label: 'Login' },
  { to: '/register', icon: <RegisterIcon />, label: 'Register' },
  { to: '/forgot-password', icon: <ForgotPasswordIcon />, label: 'Forgot Password' }
];

const SidebarLinks = memo(({ isOpen, activeLink, onLinkClick }) => (
  <div className="sidebar-links">
    {linkData.map(({ to, icon, label }) => (
      <Link 
        to={to} 
        className={`sidebar-link ${activeLink === to ? 'active' : ''}`} 
        key={to} 
        onClick={() => onLinkClick(to)} // Pass the path of the clicked link
      >
        {icon}
        {isOpen && (
          <motion.span
            initial={{ opacity: 0.5, x: -5 }}
            animate={{ opacity: isOpen ? 1 : 0.5, x: isOpen ? 0 : -5 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
        )}
      </Link>
    ))}
  </div>
));

export default SidebarLinks;
