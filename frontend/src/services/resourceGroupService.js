// src/services/resourceGroupService.js
import api from './api';

const mockResourceGroups = [
  { id: 1, name: 'rg-production', owner: 'Amit Sharma', resourceCount: 14, status: 'Active', location: 'East US', subscription: 'Enterprise-001', createdAt: '2023-01-15' },
  { id: 2, name: 'rg-storage', owner: 'Priya Nair', resourceCount: 8, status: 'Active', location: 'Central US', subscription: 'Enterprise-001', createdAt: '2023-02-10' },
  { id: 3, name: 'rg-finance', owner: 'Sneha Patel', resourceCount: 5, status: 'Active', location: 'West Europe', subscription: 'Finance-002', createdAt: '2023-03-20' },
  { id: 4, name: 'rg-security', owner: 'Rahul Verma', resourceCount: 6, status: 'Active', location: 'North Europe', subscription: 'Security-003', createdAt: '2023-06-25' },
  { id: 5, name: 'rg-network', owner: 'Anjali Mehta', resourceCount: 9, status: 'Active', location: 'East US', subscription: 'Enterprise-001', createdAt: '2023-07-01' },
  { id: 6, name: 'rg-compute', owner: 'Karan Kapoor', resourceCount: 4, status: 'Active', location: 'Southeast Asia', subscription: 'Dev-004', createdAt: '2023-09-12' },
  { id: 7, name: 'rg-dev', owner: 'Vikram Singh', resourceCount: 11, status: 'Active', location: 'East US', subscription: 'Dev-004', createdAt: '2023-10-05' },
  { id: 8, name: 'rg-hr', owner: 'Deepika Roy', resourceCount: 3, status: 'Active', location: 'North Europe', subscription: 'Enterprise-001', createdAt: '2023-12-01' },
  { id: 9, name: 'rg-archive', owner: 'Priya Nair', resourceCount: 2, status: 'Inactive', location: 'West US', subscription: 'Enterprise-001', createdAt: '2024-01-20' },
];

const resourceGroupService = {
  getAll: async () => {
    try {
      const res = await api.get('/resourcegroups');
      return { success: true, data: res.data };
    } catch {
      return { success: true, data: mockResourceGroups, total: mockResourceGroups.length };
    }
  },
};

export default resourceGroupService;
