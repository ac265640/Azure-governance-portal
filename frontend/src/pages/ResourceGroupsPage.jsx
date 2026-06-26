// src/pages/ResourceGroupsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AppLayout from '../components/layout/AppLayout';
import StatusChip from '../components/common/StatusChip';
import resourceGroupService from '../services/resourceGroupService';
import { formatDate } from '../utils/formatters';

const ResourceGroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxResources = 20;

  useEffect(() => {
    resourceGroupService.getAll().then(res => {
      setGroups(res.data || []);
      setLoading(false);
    });
  }, []);

  const totalResources = groups.reduce((sum, g) => sum + (g.resourceCount || 0), 0);

  return (
    <AppLayout pageTitle="Resource Groups">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Resource Groups</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
            {groups.length} groups · {totalResources} total resources
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : (
        <>
          {/* Card Grid */}
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {groups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group.id}>
                <Card sx={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: group.status === 'Active' ? 'linear-gradient(90deg, #0078D4, #50E6FF)' : 'rgba(255,255,255,0.1)' }} />
                  <CardContent sx={{ pt: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: 1.5, background: 'rgba(0,120,212,0.15)', border: '1px solid rgba(0,120,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FolderIcon sx={{ color: '#0078D4', fontSize: 20 }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={700} sx={{ fontFamily: 'monospace', color: '#F3F2F1' }}>
                            {group.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                            {group.subscription}
                          </Typography>
                        </Box>
                      </Box>
                      <StatusChip label={group.status} />
                    </Box>

                    {/* Resource Count Progress */}
                    <Box sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Resources</Typography>
                        <Typography variant="caption" fontWeight={700} sx={{ color: '#50E6FF' }}>{group.resourceCount}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((group.resourceCount / maxResources) * 100, 100)}
                        sx={{
                          height: 5, borderRadius: 3,
                          background: 'rgba(0,120,212,0.1)',
                          '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #0078D4, #50E6FF)', borderRadius: 3 },
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{group.owner}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{group.location}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Table View */}
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography variant="subtitle1" fontWeight={700}>All Resource Groups</Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Resource Group</TableCell>
                      <TableCell>Subscription</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Resource Count</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map(g => (
                      <TableRow key={g.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FolderIcon sx={{ color: '#0078D4', fontSize: 18 }} />
                            <Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace' }}>{g.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{g.subscription}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{g.owner}</Typography></TableCell>
                        <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>{g.location}</Typography></TableCell>
                        <TableCell>
                          <Chip label={g.resourceCount} size="small" icon={<StorageIcon style={{ fontSize: 13, color: '#0078D4' }} />} sx={{ background: 'rgba(0,120,212,0.1)', color: '#0078D4', fontWeight: 700 }} />
                        </TableCell>
                        <TableCell><StatusChip label={g.status} /></TableCell>
                        <TableCell><Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(g.createdAt)}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}
    </AppLayout>
  );
};

export default ResourceGroupsPage;
