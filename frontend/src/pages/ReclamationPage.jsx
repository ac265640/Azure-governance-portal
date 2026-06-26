// src/pages/ReclamationPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Chip, IconButton, Tooltip,
  TextField, InputAdornment, MenuItem, CircularProgress, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, TablePagination,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';
import RecyclingIcon from '@mui/icons-material/Recycling';
import HourglassIcon from '@mui/icons-material/HourglassEmpty';
import WarningIcon from '@mui/icons-material/Warning';
import AppLayout from '../components/layout/AppLayout';
import StatusChip from '../components/common/StatusChip';
import StatCard from '../components/common/StatCard';
import reclamationService from '../services/reclamationService';
import { formatDate } from '../utils/formatters';

const ReclamationPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, action: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await reclamationService.getAll({ status: filterStatus });
    setItems(res.data || []);
    setLoading(false);
  }, [filterStatus]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleAction = async () => {
    const { id, action } = confirmDialog;
    setConfirmDialog({ open: false, id: null, action: '' });
    try {
      if (action === 'approve') {
        await reclamationService.approve(id);
        setSnack({ open: true, message: 'Resource approved for reclamation', severity: 'success' });
      } else {
        await reclamationService.reject(id);
        setSnack({ open: true, message: 'Reclamation request rejected', severity: 'info' });
      }
      fetchItems();
    } catch {
      setSnack({ open: true, message: 'Operation failed', severity: 'error' });
    }
  };

  const candidate = items.filter(i => i.status === 'Candidate').length;
  const approved = items.filter(i => i.status === 'Approved').length;
  const idle = items.filter(i => i.status === 'Idle').length;

  const STATUSES = ['Idle', 'Candidate', 'Approved', 'Reclaimed'];

  return (
    <AppLayout pageTitle="Reclamation Center">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Reclamation Center</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
            Review and manage resources flagged for reclamation
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}><StatCard title="Total Flagged" value={items.length} icon={<RecyclingIcon />} color="#C50F1F" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Idle" value={idle} icon={<HourglassIcon />} color="#FCE100" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Candidates" value={candidate} icon={<WarningIcon />} color="#50E6FF" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Approved" value={approved} icon={<CheckCircleIcon />} color="#13A10E" /></Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Filter */}
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              select label="Filter by Status" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(0); }}
              size="small" sx={{ width: 200 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><FilterListIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment> }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <Chip label={`${items.length} flagged resources`} size="small" sx={{ ml: 'auto', background: 'rgba(197,15,31,0.12)', color: '#ff6b6b', border: '1px solid rgba(197,15,31,0.3)' }} />
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
                  <TableCell>Idle Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Flagged At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={9} align="center" sx={{ py: 6 }}><CircularProgress size={28} /></TableCell></TableRow>
                ) : items.length === 0 ? (
                  <TableRow><TableCell colSpan={9} align="center" sx={{ py: 6, color: 'rgba(255,255,255,0.3)' }}>No flagged resources</TableCell></TableRow>
                ) : items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace', color: '#50E6FF' }}>{item.resourceName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.resourceType} size="small" sx={{ background: 'rgba(0,120,212,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }} />
                    </TableCell>
                    <TableCell><StatusChip label={item.status} /></TableCell>
                    <TableCell><Typography variant="body2">{item.owner}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{item.resourceGroup}</Typography></TableCell>
                    <TableCell>
                      <Chip
                        label={`${item.idleDays}d`}
                        size="small"
                        sx={{
                          background: item.idleDays > 100 ? 'rgba(197,15,31,0.15)' : 'rgba(252,225,0,0.1)',
                          color: item.idleDays > 100 ? '#C50F1F' : '#FCE100',
                          fontWeight: 700, border: `1px solid ${item.idleDays > 100 ? 'rgba(197,15,31,0.3)' : 'rgba(252,225,0,0.2)'}`,
                        }}
                      />
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', maxWidth: 180 }}>{item.reason}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(item.flaggedAt)}</Typography></TableCell>
                    <TableCell align="center">
                      {(item.status === 'Candidate' || item.status === 'Idle') && (
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                          <Tooltip title="Approve Reclamation">
                            <IconButton size="small" onClick={() => setConfirmDialog({ open: true, id: item.id, action: 'approve' })} sx={{ color: '#13A10E', border: '1px solid rgba(19,161,14,0.3)', borderRadius: 1, '&:hover': { background: 'rgba(19,161,14,0.12)' } }}>
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton size="small" onClick={() => setConfirmDialog({ open: true, id: item.id, action: 'reject' })} sx={{ color: '#C50F1F', border: '1px solid rgba(197,15,31,0.3)', borderRadius: 1, '&:hover': { background: 'rgba(197,15,31,0.12)' } }}>
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      {item.status === 'Approved' && <Chip label="Approved" size="small" sx={{ background: 'rgba(19,161,14,0.1)', color: '#13A10E', fontWeight: 700 }} />}
                      {item.status === 'Reclaimed' && <Chip label="Reclaimed" size="small" sx={{ background: 'rgba(197,15,31,0.1)', color: '#C50F1F', fontWeight: 700 }} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
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

      {/* Confirm Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null, action: '' })} PaperProps={{ sx: { background: '#111827', border: `1px solid ${confirmDialog.action === 'approve' ? 'rgba(19,161,14,0.3)' : 'rgba(197,15,31,0.3)'}` } }}>
        <DialogTitle>
          {confirmDialog.action === 'approve' ? '✅ Approve Reclamation' : '❌ Reject Reclamation'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmDialog.action === 'approve'
              ? 'This resource will be marked as approved for reclamation. The resource owner will be notified.'
              : 'This resource will be removed from the reclamation queue.'}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmDialog({ open: false, id: null, action: '' })} sx={{ color: 'rgba(255,255,255,0.5)' }}>Cancel</Button>
          <Button variant="contained" color={confirmDialog.action === 'approve' ? 'success' : 'error'} onClick={handleAction}>
            {confirmDialog.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} variant="filled">{snack.message}</Alert>
      </Snackbar>
    </AppLayout>
  );
};

export default ReclamationPage;
