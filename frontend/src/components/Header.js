import '../styles/Header.css'
// src/components/Header.js
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, ListItemIcon, ListItemText, Divider, Tabs, Tab } from '@mui/material';
import { Brightness4, Brightness7, ArrowDropDown, AccountCircle, Edit, Visibility, Logout, Help, Settings as SettingsIcon, History } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { toggleTheme, mode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState('profile'); // State for selected tab
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <header className="header-container">
      <div className="theme-toggle">
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>
      <div className="user-menu">
        <IconButton
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <Avatar src="/path-to-your-avatar-image.jpg" alt="User Avatar" className="user-avatar" />
          <ArrowDropDown fontSize="small" />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: mode === 'dark' ? '#333' : '#fff', // Theme-based background
              color: mode === 'dark' ? 'white' : 'black', // Theme-based text color
              borderRadius: '8px',
              minWidth: '220px', // Reduced width
              padding: '4px', // Reduced padding
            },
          }}
        >
          <div className="dropdown-header">
            <Avatar src="/path-to-your-avatar-image.jpg" alt="User Avatar" className="dropdown-avatar" />
            <div className="dropdown-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Admin</span>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {/* Handle logout */}}
              aria-label="logout"
            >
              <Logout fontSize="small" />
            </IconButton>
          </div>
          <Divider />
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            className="dropdown-tabs"
          >
            <Tab value="profile" label="Profile" icon={<AccountCircle className="tab-icon" />} />
            <Tab value="settings" label="Settings" icon={<SettingsIcon className="tab-icon" />} />
          </Tabs>
          <div className="dropdown-body">
            {selectedTab === 'profile' && (
              <div className="dropdown-section">
                <MenuItem onClick={handleMenuClose} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <Visibility fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="View" />
                </MenuItem>
                <MenuItem onClick={() => {/* Handle logout */}} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </div>
            )}
            {selectedTab === 'settings' && (
              <div className="dropdown-section">
                <MenuItem onClick={handleMenuClose} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <Help fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Support" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="dropdown-item">
                  <ListItemIcon className="dropdown-icon">
                    <History fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </MenuItem>
              </div>
            )}
          </div>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
