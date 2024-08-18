// SidebarLinks.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Login as LoginIcon, PersonAdd as RegisterIcon, Password as ForgotPasswordIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css'

const linkData = [
  { to: '/home', icon: <HomeIcon />, label: 'Home' },
  { to: '/login', icon: <LoginIcon />, label: 'Login' },
  { to: '/register', icon: <RegisterIcon />, label: 'Register' },
  { to: '/forgot-password', icon: <ForgotPasswordIcon />, label: 'Forgot Password' }
];

const SidebarLinks = ({ isOpen }) => (
  <div className="sidebar-links">
    {linkData.map(({ to, icon, label }) => (
      <Link to={to} className="sidebar-link" key={to}>
        {icon}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.span>
      </Link>
    ))}
  </div>
);

export default SidebarLinks;
