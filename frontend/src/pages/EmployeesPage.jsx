// src/pages/EmployeesPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Avatar, Tooltip, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, MenuItem, CircularProgress, Snackbar, Alert,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import AppLayout from '../components/layout/AppLayout';
import StatusChip from '../components/common/StatusChip';
import employeeService from '../services/employeeService';
import { DEPARTMENTS, ROLES } from '../utils/constants';
import { formatDate } from '../utils/formatters';

const EMPTY_FORM = { name: '', email: '', department: '', role: '' };

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    const res = await employeeService.getAll({ search });
    setEmployees(res.data || []);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  const openAdd = () => { setEditingEmployee(null); setForm(EMPTY_FORM); setDialogOpen(true); };
  const openEdit = (emp) => { setEditingEmployee(emp); setForm({ name: emp.name, email: emp.email, department: emp.department, role: emp.role }); setDialogOpen(true); };
  const openDelete = (id) => { setDeletingId(id); setDeleteDialogOpen(true); };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.department || !form.role) return;
    setSaving(true);
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, form);
        setSnack({ open: true, message: 'Employee updated successfully', severity: 'success' });
      } else {
        await employeeService.create(form);
        setSnack({ open: true, message: 'Employee added successfully', severity: 'success' });
      }
      setDialogOpen(false);
      fetchEmployees();
    } catch { setSnack({ open: true, message: 'Operation failed', severity: 'error' }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    await employeeService.delete(deletingId);
    setDeleteDialogOpen(false);
    setSnack({ open: true, message: 'Employee deleted', severity: 'info' });
    fetchEmployees();
  };

  return (
    <AppLayout pageTitle="Employees">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Employee Management</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
            Manage your organization's Azure resource owners
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd} sx={{ px: 3 }}>
          Add Employee
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Search Bar */}
          <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              placeholder="Search by name, email, or department..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              size="small"
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment> }}
              sx={{ width: 380 }}
            />
            <Chip label={`${employees.length} employees`} size="small" sx={{ background: 'rgba(0,120,212,0.15)', color: '#50E6FF', border: '1px solid rgba(0,120,212,0.3)' }} />
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Resources</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={7} align="center" sx={{ py: 6 }}><CircularProgress size={28} /></TableCell></TableRow>
                ) : employees.length === 0 ? (
                  <TableRow><TableCell colSpan={7} align="center" sx={{ py: 6, color: 'rgba(255,255,255,0.3)' }}>No employees found</TableCell></TableRow>
                ) : employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp) => (
                  <TableRow key={emp.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, background: 'linear-gradient(135deg, #0078D4, #50E6FF)', fontSize: '0.85rem', fontWeight: 700 }}>
                          {emp.name?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600}>{emp.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{emp.email}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{emp.department}</Typography></TableCell>
                    <TableCell><StatusChip label={emp.role} /></TableCell>
                    <TableCell>
                      <Chip label={emp.resourceCount ?? 0} size="small" sx={{ background: 'rgba(0,120,212,0.1)', color: '#0078D4', fontWeight: 700, minWidth: 32 }} />
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>{formatDate(emp.createdAt)}</Typography></TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit"><IconButton size="small" onClick={() => openEdit(emp)} sx={{ color: '#0078D4', mr: 0.5 }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton size="small" onClick={() => openDelete(emp.id)} sx={{ color: '#C50F1F' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employees.length}
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

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { background: '#111827', border: '1px solid rgba(0,120,212,0.2)' } }}>
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PeopleIcon sx={{ color: '#0078D4' }} />
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}><TextField fullWidth label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Email Address" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></Grid>
            <Grid item xs={6}><TextField select fullWidth label="Department" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}>{DEPARTMENTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}</TextField></Grid>
            <Grid item xs={6}><TextField select fullWidth label="Role" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>{ROLES.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}</TextField></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? <CircularProgress size={18} color="inherit" /> : editingEmployee ? 'Update' : 'Add Employee'}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { background: '#111827', border: '1px solid rgba(197,15,31,0.3)' } }}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete this employee? This action cannot be undone.</Typography></DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} variant="filled">{snack.message}</Alert>
      </Snackbar>
    </AppLayout>
  );
};

export default EmployeesPage;
