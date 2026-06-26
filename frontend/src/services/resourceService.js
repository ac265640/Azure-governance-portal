// src/services/resourceService.js
import api from './api';

const mockResources = [
  { id: 1, name: 'vm-prod-east-01', type: 'Virtual Machine', status: 'Active', owner: 'Amit Sharma', resourceGroup: 'rg-production', subscription: 'Enterprise-001', location: 'East US', lastActivity: '2025-06-20' },
  { id: 2, name: 'storage-backup-central', type: 'Storage Account', status: 'Idle', owner: 'Priya Nair', resourceGroup: 'rg-storage', subscription: 'Enterprise-001', location: 'Central US', lastActivity: '2025-03-01' },
  { id: 3, name: 'sql-finance-db', type: 'SQL Database', status: 'Active', owner: 'Sneha Patel', resourceGroup: 'rg-finance', subscription: 'Finance-002', location: 'West Europe', lastActivity: '2025-06-24' },
  { id: 4, name: 'app-portal-web', type: 'App Service', status: 'Active', owner: 'Vikram Singh', resourceGroup: 'rg-production', subscription: 'Enterprise-001', location: 'East US', lastActivity: '2025-06-25' },
  { id: 5, name: 'kv-secrets-prod', type: 'Key Vault', status: 'Active', owner: 'Rahul Verma', resourceGroup: 'rg-security', subscription: 'Security-003', location: 'North Europe', lastActivity: '2025-06-22' },
  { id: 6, name: 'lb-api-gateway', type: 'Load Balancer', status: 'Idle', owner: 'Anjali Mehta', resourceGroup: 'rg-network', subscription: 'Enterprise-001', location: 'East US', lastActivity: '2025-01-10' },
  { id: 7, name: 'vnet-corp-main', type: 'Virtual Network', status: 'Active', owner: 'Karan Kapoor', resourceGroup: 'rg-network', subscription: 'Enterprise-001', location: 'East US', lastActivity: '2025-06-18' },
  { id: 8, name: 'ci-batch-worker', type: 'Container Instance', status: 'Candidate', owner: 'Deepika Roy', resourceGroup: 'rg-compute', subscription: 'Dev-004', location: 'Southeast Asia', lastActivity: '2025-04-05' },
  { id: 9, name: 'vm-dev-test-02', type: 'Virtual Machine', status: 'Candidate', owner: 'Vikram Singh', resourceGroup: 'rg-dev', subscription: 'Dev-004', location: 'East US', lastActivity: '2025-02-28' },
  { id: 10, name: 'storage-archive-01', type: 'Storage Account', status: 'Reclaimed', owner: 'Priya Nair', resourceGroup: 'rg-storage', subscription: 'Enterprise-001', location: 'West US', lastActivity: '2024-11-30' },
  { id: 11, name: 'sql-hr-database', type: 'SQL Database', status: 'Active', owner: 'Deepika Roy', resourceGroup: 'rg-hr', subscription: 'Enterprise-001', location: 'North Europe', lastActivity: '2025-06-23' },
  { id: 12, name: 'app-internal-tools', type: 'App Service', status: 'Idle', owner: 'Rahul Verma', resourceGroup: 'rg-dev', subscription: 'Dev-004', location: 'East US', lastActivity: '2025-05-01' },
];

const resourceService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/resources', { params });
      const resourcesList = Array.isArray(res.data) 
        ? res.data 
        : (res.data.resources || []);
      return { success: true, data: resourcesList };
    } catch {
      let result = [...mockResources];
      if (params.search) {
        const q = params.search.toLowerCase();
        result = result.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q)
        );
      }
      if (params.status) result = result.filter(r => r.status === params.status);
      if (params.type) result = result.filter(r => r.type === params.type);
      return { success: true, data: result, total: result.length };
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/resources/${id}`);
      return { success: true, data: res.data };
    } catch {
      return { success: true, data: mockResources.find(r => r.id === id) };
    }
  },
};

export default resourceService;
