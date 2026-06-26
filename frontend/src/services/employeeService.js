// src/services/employeeService.js
import api from './api';

const mockEmployees = [
  { id: 1, name: 'Amit Sharma', email: 'amit@contoso.com', department: 'Engineering', role: 'Admin', resourceCount: 12, createdAt: '2024-01-15' },
  { id: 2, name: 'Priya Nair', email: 'priya@contoso.com', department: 'DevOps', role: 'Manager', resourceCount: 8, createdAt: '2024-02-20' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@contoso.com', department: 'Security', role: 'Developer', resourceCount: 5, createdAt: '2024-03-10' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@contoso.com', department: 'Finance', role: 'Analyst', resourceCount: 3, createdAt: '2024-04-05' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@contoso.com', department: 'Engineering', role: 'Developer', resourceCount: 9, createdAt: '2024-05-12' },
  { id: 6, name: 'Anjali Mehta', email: 'anjali@contoso.com', department: 'Product', role: 'Manager', resourceCount: 6, createdAt: '2024-06-01' },
  { id: 7, name: 'Karan Kapoor', email: 'karan@contoso.com', department: 'Data Science', role: 'Developer', resourceCount: 11, createdAt: '2024-06-20' },
  { id: 8, name: 'Deepika Roy', email: 'deepika@contoso.com', department: 'HR', role: 'Viewer', resourceCount: 1, createdAt: '2024-07-03' },
];

let employees = [...mockEmployees];

const employeeService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/employees', { params });
      return { success: true, data: res.data };
    } catch {
      let result = [...employees];
      if (params.search) {
        const q = params.search.toLowerCase();
        result = result.filter(e =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q)
        );
      }
      return { success: true, data: result, total: result.length };
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/employees/${id}`);
      return { success: true, data: res.data };
    } catch {
      const emp = employees.find(e => e.id === id);
      return { success: true, data: emp };
    }
  },

  create: async (data) => {
    try {
      const res = await api.post('/employees', data);
      return { success: true, data: res.data };
    } catch {
      const newEmp = { ...data, id: employees.length + 1, createdAt: new Date().toISOString(), resourceCount: 0 };
      employees.push(newEmp);
      return { success: true, data: newEmp };
    }
  },

  update: async (id, data) => {
    try {
      const res = await api.put(`/employees/${id}`, data);
      return { success: true, data: res.data };
    } catch {
      employees = employees.map(e => e.id === id ? { ...e, ...data } : e);
      return { success: true, data: employees.find(e => e.id === id) };
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/employees/${id}`);
      return { success: true, data: res.data };
    } catch {
      employees = employees.filter(e => e.id !== id);
      return { success: true };
    }
  },
};

export default employeeService;
