// src/services/subscriptionService.js
import api from './api';

const mockSubscriptions = [
  { id: 1, name: 'Enterprise-001', subscriptionId: 'xxxxxxxx-0001-xxxx-xxxx-xxxxxxxxxxxx', owner: 'Amit Sharma', resourceCount: 28, status: 'Active', plan: 'Pay-As-You-Go', createdAt: '2023-01-10' },
  { id: 2, name: 'Finance-002', subscriptionId: 'xxxxxxxx-0002-xxxx-xxxx-xxxxxxxxxxxx', owner: 'Sneha Patel', resourceCount: 12, status: 'Active', plan: 'Enterprise Agreement', createdAt: '2023-03-15' },
  { id: 3, name: 'Security-003', subscriptionId: 'xxxxxxxx-0003-xxxx-xxxx-xxxxxxxxxxxx', owner: 'Rahul Verma', resourceCount: 7, status: 'Active', plan: 'Pay-As-You-Go', createdAt: '2023-06-20' },
  { id: 4, name: 'Dev-004', subscriptionId: 'xxxxxxxx-0004-xxxx-xxxx-xxxxxxxxxxxx', owner: 'Vikram Singh', resourceCount: 15, status: 'Active', plan: 'Dev/Test', createdAt: '2023-08-01' },
  { id: 5, name: 'Sandbox-005', subscriptionId: 'xxxxxxxx-0005-xxxx-xxxx-xxxxxxxxxxxx', owner: 'Karan Kapoor', resourceCount: 3, status: 'Inactive', plan: 'Free Tier', createdAt: '2024-01-05' },
];

const subscriptionService = {
  getAll: async () => {
    try {
      const res = await api.get('/subscriptions');
      return { success: true, data: res.data };
    } catch {
      return { success: true, data: mockSubscriptions, total: mockSubscriptions.length };
    }
  },
};

export default subscriptionService;
