// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Grid, Box, Typography, Card, CardContent, List, ListItem,
  ListItemText, ListItemAvatar, Avatar, Button, Chip, CircularProgress,
} from '@mui/material';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassIcon from '@mui/icons-material/HourglassEmpty';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FolderIcon from '@mui/icons-material/Folder';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AddIcon from '@mui/icons-material/Add';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import AppLayout from '../components/layout/AppLayout';
import StatCard from '../components/common/StatCard';
import dashboardService from '../services/dashboardService';
import { useNavigate } from 'react-router-dom';

const PIE_COLORS = ['#13A10E', '#FCE100', '#50E6FF', '#0078D4', '#C50F1F'];
const BAR_COLOR = '#0078D4';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ background: '#111827', border: '1px solid rgba(0,120,212,0.3)', borderRadius: 2, p: 1.5 }}>
        <Typography variant="caption" fontWeight={700} sx={{ color: '#F3F2F1' }}>{label || payload[0].name}</Typography>
        <Typography variant="body2" sx={{ color: '#0078D4', mt: 0.25 }}>
          {payload[0].value} resources
        </Typography>
      </Box>
    );
  }
  return null;
};

const ACTIVITY_ICONS = {
  reclaim: { icon: <RecyclingIcon sx={{ fontSize: 16 }} />, color: '#C50F1F' },
  employee: { icon: <PeopleIcon sx={{ fontSize: 16 }} />, color: '#0078D4' },
  flag: { icon: <HourglassIcon sx={{ fontSize: 16 }} />, color: '#FCE100' },
  subscription: { icon: <SubscriptionsIcon sx={{ fontSize: 16 }} />, color: '#13A10E' },
  approve: { icon: <CheckCircleIcon sx={{ fontSize: 16 }} />, color: '#50E6FF' },
};

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dashboardService.getStats().then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AppLayout pageTitle="Dashboard">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  const { stats, statusDistribution, typeDistribution, recentActivity } = data;

  const statCards = [
    { title: 'Total Resources', value: stats.totalResources, icon: <StorageIcon />, color: '#0078D4', subtitle: 'Across all subscriptions', trend: 8 },
    { title: 'Active Resources', value: stats.activeResources, icon: <CheckCircleIcon />, color: '#13A10E', subtitle: 'Currently in use', progress: (stats.activeResources / stats.totalResources) * 100 },
    { title: 'Idle Resources', value: stats.idleResources, icon: <HourglassIcon />, color: '#FCE100', subtitle: 'No activity 30+ days', trend: -3 },
    { title: 'Reclamation Requests', value: stats.reclamationRequests, icon: <RecyclingIcon />, color: '#C50F1F', subtitle: 'Pending review' },
    { title: 'Resource Groups', value: stats.resourceGroups, icon: <FolderIcon />, color: '#50E6FF', subtitle: 'Across subscriptions' },
    { title: 'Subscriptions', value: stats.subscriptions, icon: <SubscriptionsIcon />, color: '#9C27B0', subtitle: 'Active subscriptions' },
  ];

  return (
    <AppLayout pageTitle="Dashboard">
      {/* Stats Grid */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Pie Chart */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                Resource Status Distribution
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusDistribution} cx="45%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                      {statusDistribution.map((entry, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      formatter={(val) => <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                Resource Type Distribution
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeDistribution} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill={BAR_COLOR} radius={[4, 4, 0, 0]}
                      background={{ fill: 'rgba(0,120,212,0.04)', radius: [4, 4, 0, 0] }} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity + Quick Actions */}
      <Grid container spacing={2.5}>
        {/* Recent Activity */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <List disablePadding>
                {recentActivity.map((item, i) => {
                  const actConf = ACTIVITY_ICONS[item.type] || ACTIVITY_ICONS.approve;
                  return (
                    <ListItem
                      key={item.id}
                      disablePadding
                      sx={{
                        py: 1, px: 1.5, mb: 0.5, borderRadius: 2,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        '&:hover': { background: 'rgba(0,120,212,0.06)' },
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar sx={{ width: 30, height: 30, background: `${actConf.color}18`, color: actConf.color }}>
                          {actConf.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" fontWeight={600}>{item.action}</Typography>
                            <Typography variant="caption" sx={{ color: '#0078D4' }}>{item.resource}</Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                            by {item.user} · {item.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Add New Employee', icon: <PeopleIcon />, path: '/employees', color: '#0078D4' },
                  { label: 'View Idle Resources', icon: <HourglassIcon />, path: '/resources', color: '#FCE100' },
                  { label: 'Review Reclamations', icon: <RecyclingIcon />, path: '/reclamation', color: '#C50F1F' },
                  { label: 'Ask AI Copilot', icon: <SmartToyIcon />, path: '/ai-copilot', color: '#50E6FF' },
                  { label: 'Governance Report', icon: <AssessmentIcon />, path: '/ai-copilot', color: '#13A10E' },
                ].map((action) => (
                  <Button
                    key={action.label}
                    fullWidth variant="outlined"
                    startIcon={action.icon}
                    onClick={() => navigate(action.path)}
                    sx={{
                      justifyContent: 'flex-start', py: 1.2, px: 2,
                      borderColor: `${action.color}30`,
                      color: 'rgba(255,255,255,0.8)',
                      background: `${action.color}08`,
                      '&:hover': {
                        borderColor: action.color,
                        background: `${action.color}16`,
                        color: action.color,
                      },
                      '& .MuiButton-startIcon': { color: action.color },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default DashboardPage;
