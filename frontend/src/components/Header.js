import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Divider, Typography, Box, Tabs, Tab, ListItemIcon } from '@mui/material';
import { Brightness4, Brightness7, ArrowDropDown, AccountCircle, Visibility as EyeIcon, Settings as SettingsIcon, Logout as LogoutIcon, Feedback as FeedbackIcon, Support as SupportIcon, History as HistoryIcon, Fullscreen as FullscreenIcon } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

const Header = () => {
  const { toggleTheme, mode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose(); // Close the menu after changing the theme
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <header className={`header-container ${mode === 'dark' ? 'header-dark' : 'header-light'}`}>
      <div className="fullscreen-toggle">
        <IconButton
          onClick={handleFullscreenToggle}
          color="inherit"
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          <FullscreenIcon sx={{ fontSize: '20px' }} /> {/* Adjusted icon size */}
        </IconButton>
      </div>
      <div className="theme-toggle">
        <IconButton 
          onClick={handleClick} 
          color="inherit" 
          aria-label="user menu"
        >
          <Avatar
            src="/path-to-your-avatar-image.jpg"
            alt="User Avatar"
            sx={{ width: 32, height: 32 }}
            className="user-avatar"
          />
          <ArrowDropDown fontSize="small" />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '260px', // Adjusted width
            maxHeight: '400px', // Adjust max-height
            right: 0, // Align to right side
            top: '60px', // Position below the header
            position: 'absolute',
            transform: 'translateX(0%)', // Center menu horizontally relative to the right
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Align menu to the right
        transformOrigin={{ vertical: 'top', horizontal: 'right' }} // Align menu to the right
      >
        {/* Header Section */}
        <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/path-to-your-avatar-image.jpg"
              alt="User Avatar"
              sx={{ width: 36, height: 36, marginRight: 1 }} // Reduced avatar size
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '13px' }}>John Doe</Typography> {/* Reduced font size */}
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>Administrator</Typography> {/* Reduced font size */}
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose} 
            aria-label="logout" 
            sx={{ marginLeft: 'auto' }}
          >
            <LogoutIcon sx={{ fontSize: '20px' }} /> {/* Reduced icon size */}
          </IconButton>
        </Box>
        <Divider />
        {/* Tabs for Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              marginBottom: 1,
              '& .MuiTab-root': {
                fontSize: '12px', // Reduced font size for tab labels
                minWidth: 'auto', // Prevents tab from taking up too much space
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center', // Center tabs horizontally
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                  <AccountCircle sx={{ fontSize: '16px', marginRight: 1 }} /> {/* Reduced icon size */}
                  Profile
                </Box>
              }
              value="profile"
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                  <SettingsIcon sx={{ fontSize: '16px', marginRight: 1 }} /> {/* Reduced icon size */}
                  Settings
                </Box>
              }
              value="settings"
            />
          </Tabs>
        </Box>
        {/* Display Items Based on Selected Tab */}
        {selectedTab === 'profile' && (
          <Box sx={{ padding: 1 }}>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><EyeIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Replaced icon */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>View Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><AccountCircle sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Edit Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><FeedbackIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Feedback</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><LogoutIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Logout</Typography>
            </MenuItem>
          </Box>
        )}
        {selectedTab === 'settings' && (
          <Box sx={{ padding: 1 }}>
            <MenuItem onClick={handleThemeToggle} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7 sx={{ fontSize: '18px' }} /> : <Brightness4 sx={{ fontSize: '18px' }} />} {/* Toggle icon based on theme */}
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Change Theme</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><SupportIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Support</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><SettingsIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>Account Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><HistoryIcon sx={{ fontSize: '18px' }} /></ListItemIcon> {/* Reduced icon size */}
              <Typography variant="body2" sx={{ fontSize: '14px' }}>History</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </header>
  );
};

export default Header;
