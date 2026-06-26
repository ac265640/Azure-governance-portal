// src/services/dashboardService.js
import api from './api';

const mockDashboard = {
  stats: {
    totalResources: 62,
    activeResources: 38,
    idleResources: 14,
    reclamationRequests: 6,
    resourceGroups: 9,
    subscriptions: 5,
  },
  statusDistribution: [
    { name: 'Active', value: 38 },
    { name: 'Idle', value: 14 },
    { name: 'Candidate', value: 6 },
    { name: 'Approved', value: 2 },
    { name: 'Reclaimed', value: 2 },
  ],
  typeDistribution: [
    { name: 'Virtual Machine', count: 18 },
    { name: 'Storage Account', count: 12 },
    { name: 'SQL Database', count: 10 },
    { name: 'App Service', count: 9 },
    { name: 'Key Vault', count: 6 },
    { name: 'Load Balancer', count: 4 },
    { name: 'Others', count: 3 },
  ],
  recentActivity: [
    { id: 1, action: 'Resource Reclaimed', resource: 'storage-archive-01', user: 'Priya Nair', time: '2 hours ago', type: 'reclaim' },
    { id: 2, action: 'Employee Added', resource: 'Karan Kapoor', user: 'Admin', time: '5 hours ago', type: 'employee' },
    { id: 3, action: 'Resource Flagged', resource: 'vm-dev-test-02', user: 'System', time: '1 day ago', type: 'flag' },
    { id: 4, action: 'Subscription Created', resource: 'Sandbox-005', user: 'Admin', time: '2 days ago', type: 'subscription' },
    { id: 5, action: 'Resource Approved', resource: 'app-internal-tools', user: 'Amit Sharma', time: '3 days ago', type: 'approve' },
  ],
};

const dashboardService = {
  getStats: async () => {
    try {
      const [statsRes, chartsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/charts')
      ]);

      const statsData = statsRes.data;
      const chartsData = chartsRes.data;

      const formattedData = {
        stats: {
          totalResources: statsData.totalResources || 0,
          activeResources: chartsData.resourceStatus?.Active || 0,
          idleResources: chartsData.resourceStatus?.Idle || 0,
          reclamationRequests: statsData.pendingRequests || 0,
          resourceGroups: statsData.totalResourceGroups || 0,
          subscriptions: statsData.totalSubscriptions || 0,
        },
        statusDistribution: [
          { name: 'Active', value: chartsData.resourceStatus?.Active || 0 },
          { name: 'Idle', value: chartsData.resourceStatus?.Idle || 0 },
          { name: 'Candidate', value: chartsData.resourceStatus?.Candidate || 0 },
          { name: 'Approved', value: chartsData.reclamationStatus?.Approved || 0 },
          { name: 'Reclaimed', value: chartsData.resourceStatus?.Reclaimed || 0 },
        ],
        typeDistribution: [
          { name: 'Virtual Machine', count: chartsData.resourceTypes?.VM || 0 },
          { name: 'Storage Account', count: chartsData.resourceTypes?.Storage || 0 },
          { name: 'SQL Database', count: chartsData.resourceTypes?.SQLDatabase || 0 },
          { name: 'App Service', count: chartsData.resourceTypes?.AppService || 0 },
        ],
        recentActivity: [
          { id: 1, action: 'Database Connected', resource: 'Development-RG', user: 'System', time: 'Just now', type: 'approve' },
          { id: 2, action: 'Backend Synced', resource: 'SQLite DB', user: 'System', time: 'Just now', type: 'subscription' },
        ],
      };

      return { success: true, data: formattedData };
    } catch (error) {
      console.warn("API Error, using mock dashboard data:", error);
      return { success: true, data: mockDashboard };
    }
  },
};

export default dashboardService;
