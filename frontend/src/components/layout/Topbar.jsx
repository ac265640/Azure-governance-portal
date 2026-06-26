// src/components/layout/Topbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Avatar,
  Menu, MenuItem, Divider, Tooltip, Badge, InputBase,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 260;

const Topbar = ({ pageTitle, handleDrawerToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        background: 'rgba(10, 15, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,120,212,0.15)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'rgba(255,255,255,0.8)' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#F3F2F1' }}>
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(0,120,212,0.2)',
              borderRadius: 2, px: 1.5, py: 0.5,
              '&:hover': { border: '1px solid rgba(0,120,212,0.4)' },
              transition: 'all 0.2s',
            }}
          >
            <SearchIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} />
            <InputBase
              placeholder="Search..."
              sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', width: 160 }}
            />
          </Box>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton size="small">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton size="small">
              <SettingsIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }} />
            </IconButton>
          </Tooltip>

          {/* User Avatar Menu */}
          <Tooltip title={user?.name || 'User'}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar
                sx={{
                  width: 32, height: 32, fontSize: '0.85rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #0078D4, #50E6FF)',
                }}
              >
                {user?.name?.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1.5, minWidth: 200,
                background: '#111827',
                border: '1px solid rgba(0,120,212,0.2)',
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{user?.email}</Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(0,120,212,0.15)' }} />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: '#C50F1F' }}>
              <LogoutIcon fontSize="small" />
              <Typography variant="body2">Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
