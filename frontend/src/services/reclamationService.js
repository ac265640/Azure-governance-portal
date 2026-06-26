// src/services/reclamationService.js
import api from './api';

let mockReclamations = [
  { id: 1, resourceName: 'storage-backup-central', resourceType: 'Storage Account', status: 'Idle', owner: 'Priya Nair', resourceGroup: 'rg-storage', flaggedAt: '2025-06-01', reason: 'No activity for 90+ days', idleDays: 117 },
  { id: 2, resourceName: 'ci-batch-worker', resourceType: 'Container Instance', status: 'Candidate', owner: 'Deepika Roy', resourceGroup: 'rg-compute', flaggedAt: '2025-06-10', reason: 'Underutilized compute instance', idleDays: 82 },
  { id: 3, resourceName: 'vm-dev-test-02', resourceType: 'Virtual Machine', status: 'Candidate', owner: 'Vikram Singh', resourceGroup: 'rg-dev', flaggedAt: '2025-06-15', reason: 'Dev VM unused for 120 days', idleDays: 120 },
  { id: 4, resourceName: 'lb-api-gateway', resourceType: 'Load Balancer', status: 'Idle', owner: 'Anjali Mehta', resourceGroup: 'rg-network', flaggedAt: '2025-05-20', reason: 'Zero traffic in 6 months', idleDays: 168 },
  { id: 5, resourceName: 'app-internal-tools', resourceType: 'App Service', status: 'Approved', owner: 'Rahul Verma', resourceGroup: 'rg-dev', flaggedAt: '2025-05-10', reason: 'Decommissioned application', idleDays: 56 },
  { id: 6, resourceName: 'storage-archive-01', resourceType: 'Storage Account', status: 'Reclaimed', owner: 'Priya Nair', resourceGroup: 'rg-storage', flaggedAt: '2024-11-01', reason: 'Archived data migrated', idleDays: 210 },
];

const reclamationService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/reclamations', { params });
      return { success: true, data: res.data };
    } catch {
      let result = [...mockReclamations];
      if (params.status) result = result.filter(r => r.status === params.status);
      return { success: true, data: result, total: result.length };
    }
  },

  approve: async (id) => {
    try {
      const res = await api.put(`/reclamations/${id}/approve`);
      return { success: true, data: res.data };
    } catch {
      mockReclamations = mockReclamations.map(r =>
        r.id === id ? { ...r, status: 'Approved' } : r
      );
      return { success: true };
    }
  },

  reject: async (id) => {
    try {
      const res = await api.put(`/reclamations/${id}/reject`);
      return { success: true, data: res.data };
    } catch {
      mockReclamations = mockReclamations.filter(r => r.id !== id);
      return { success: true };
    }
  },
};

export default reclamationService;
