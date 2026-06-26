// src/components/layout/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, Avatar, Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import FolderIcon from '@mui/icons-material/Folder';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloudIcon from '@mui/icons-material/Cloud';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Employees', icon: <PeopleIcon />, path: '/employees' },
  { label: 'Resources', icon: <StorageIcon />, path: '/resources' },
  { label: 'Resource Groups', icon: <FolderIcon />, path: '/resource-groups' },
  { label: 'Subscriptions', icon: <SubscriptionsIcon />, path: '/subscriptions' },
  { label: 'Reclamation Center', icon: <RecyclingIcon />, path: '/reclamation' },
  { label: 'AI Copilot', icon: <SmartToyIcon />, path: '/ai-copilot', badge: 'AI' },
];

const Sidebar = ({ user, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    if (handleDrawerToggle && mobileOpen) {
      handleDrawerToggle();
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Area */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid rgba(0,120,212,0.2)',
          background: 'rgba(0,120,212,0.08)',
        }}
      >
        <Box
          sx={{
            width: 38, height: 38, borderRadius: 2,
            background: 'linear-gradient(135deg, #0078D4, #50E6FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,120,212,0.5)',
          }}
        >
          <CloudIcon sx={{ color: 'white', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#F3F2F1', lineHeight: 1.2 }}>
            Azure Governance
          </Typography>
          <Typography variant="caption" sx={{ color: '#50E6FF', fontSize: '0.68rem' }}>
            Resource Portal
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5 }}>
        <Typography
          variant="caption"
          sx={{ px: 2.5, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}
        >
          Navigation
        </Typography>
        <List sx={{ mt: 0.5 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => handleNavClick(item.path)}
                  sx={{
                    mx: 1, borderRadius: 2, py: 1.1,
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(0,120,212,0.35) 0%, rgba(0,120,212,0.1) 100%)'
                      : 'transparent',
                    borderLeft: isActive ? '3px solid #0078D4' : '3px solid transparent',
                    '&:hover': {
                      background: 'rgba(0,120,212,0.15)',
                      borderLeft: '3px solid rgba(0,120,212,0.5)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: isActive ? '#50E6FF' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? '#F3F2F1' : 'rgba(255,255,255,0.7)',
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 18, fontSize: '0.6rem', fontWeight: 700,
                        background: 'linear-gradient(135deg, #0078D4, #50E6FF)',
                        color: 'white',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile */}
      <Divider sx={{ borderColor: 'rgba(0,120,212,0.2)' }} />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #0078D4, #50E6FF)',
            fontSize: '0.9rem', fontWeight: 700,
          }}
        >
          {user?.name?.charAt(0) || 'A'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#F3F2F1', truncate: true }} noWrap>
            {user?.name || 'Admin User'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem' }}>
            {user?.role || 'Administrator'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundImage: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
