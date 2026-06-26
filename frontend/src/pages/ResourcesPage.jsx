// src/pages/ResourcesPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  MenuItem, Grid, Chip, CircularProgress, TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';
import AppLayout from '../components/layout/AppLayout';
import StatusChip from '../components/common/StatusChip';
import StatCard from '../components/common/StatCard';
import resourceService from '../services/resourceService';
import { RESOURCE_STATUSES, RESOURCE_TYPES } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassIcon from '@mui/icons-material/HourglassEmpty';
import RecyclingIcon from '@mui/icons-material/Recycling';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    const res = await resourceService.getAll({ search, status: filterStatus, type: filterType });
    setResources(res.data || []);
    setLoading(false);
  }, [search, filterStatus, filterType]);

  useEffect(() => {
    const t = setTimeout(fetchResources, 300);
    return () => clearTimeout(t);
  }, [fetchResources]);

  const active = resources.filter(r => r.status === 'Active').length;
  const idle = resources.filter(r => r.status === 'Idle').length;
  const candidates = resources.filter(r => r.status === 'Candidate').length;

  return (
    <AppLayout pageTitle="Resources">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Resource Inventory</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
          Monitor and manage all Azure resources across subscriptions
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}><StatCard title="Total" value={resources.length} icon={<StorageIcon />} color="#0078D4" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Active" value={active} icon={<CheckCircleIcon />} color="#13A10E" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Idle" value={idle} icon={<HourglassIcon />} color="#FCE100" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Candidates" value={candidates} icon={<RecyclingIcon />} color="#C50F1F" /></Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Filters */}
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search resources..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              size="small"
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment> }}
              sx={{ width: 300 }}
            />
            <TextField
              select label="Status" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(0); }}
              size="small" sx={{ width: 150 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><FilterListIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment> }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {RESOURCE_STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField
              select label="Type" value={filterType} onChange={e => { setFilterType(e.target.value); setPage(0); }}
              size="small" sx={{ width: 200 }}
            >
              <MenuItem value="">All Types</MenuItem>
              {RESOURCE_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
            <Chip label={`${resources.length} results`} size="small" sx={{ ml: 'auto', background: 'rgba(0,120,212,0.15)', color: '#50E6FF', border: '1px solid rgba(0,120,212,0.3)' }} />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resource Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Resource Group</TableCell>
                  <TableCell>Subscription</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Activity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={8} align="center" sx={{ py: 6 }}><CircularProgress size={28} /></TableCell></TableRow>
                ) : resources.length === 0 ? (
                  <TableRow><TableCell colSpan={8} align="center" sx={{ py: 6, color: 'rgba(255,255,255,0.3)' }}>No resources found</TableCell></TableRow>
                ) : resources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(r => (
                  <TableRow key={r.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#50E6FF', fontFamily: 'monospace' }}>
                        {r.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={r.type} size="small" sx={{ background: 'rgba(0,120,212,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }} />
                    </TableCell>
                    <TableCell><StatusChip label={r.status} /></TableCell>
                    <TableCell><Typography variant="body2">{r.owner}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{r.resourceGroup}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>{r.subscription}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{r.location}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{formatDate(r.lastActivity)}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={resources.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.7)',
            }}
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ResourcesPage;
