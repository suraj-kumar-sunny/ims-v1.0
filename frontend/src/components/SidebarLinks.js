import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';

const linkData = [
  { to: '/home', icon: <HomeIcon />, label: 'Home' },
  { to: '/about', icon: <InfoIcon />, label: 'About' }
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
