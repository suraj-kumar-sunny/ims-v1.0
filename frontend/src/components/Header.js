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

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose(); // Close the menu after changing the theme
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.() ||
      document.documentElement.mozRequestFullScreen?.() ||
      document.documentElement.webkitRequestFullscreen?.() ||
      document.documentElement.msRequestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.() ||
      document.mozCancelFullScreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.msExitFullscreen?.();
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
          <FullscreenIcon sx={{ fontSize: 20 }} />
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
            width: 260,
            maxHeight: 400,
            right: 0,
            top: 60,
            position: 'absolute',
            transform: 'translateX(0%)',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/path-to-your-avatar-image.jpg"
              alt="User Avatar"
              sx={{ width: 36, height: 36, marginRight: 1 }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 13 }}>John Doe</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: 11 }}>Administrator</Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose} 
            aria-label="close menu" 
          >
            <LogoutIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        <Divider />
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
                fontSize: 12,
                minWidth: 'auto',
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
                  <AccountCircle sx={{ fontSize: 16, marginRight: 1 }} />
                  Profile
                </Box>
              }
              value="profile"
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
                  <SettingsIcon sx={{ fontSize: 16, marginRight: 1 }} />
                  Settings
                </Box>
              }
              value="settings"
            />
          </Tabs>
        </Box>
        {selectedTab === 'profile' && (
          <Box sx={{ padding: 1 }}>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><EyeIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>View Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><AccountCircle sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Edit Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><FeedbackIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Feedback</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><LogoutIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Logout</Typography>
            </MenuItem>
          </Box>
        )}
        {selectedTab === 'settings' && (
          <Box sx={{ padding: 1 }}>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><SupportIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Support</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><SettingsIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Account Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon><HistoryIcon sx={{ fontSize: 18 }} /></ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>History</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleThemeToggle} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7 sx={{ fontSize: 18 }} /> : <Brightness4 sx={{ fontSize: 18 }} />}
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: 14 }}>Change Theme</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </header>
  );
};

export default Header;
