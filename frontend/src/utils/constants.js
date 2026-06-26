// src/utils/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';

export const RESOURCE_STATUSES = ['Active', 'Idle', 'Candidate', 'Approved', 'Reclaimed'];

export const RESOURCE_TYPES = [
  'Virtual Machine',
  'Storage Account',
  'SQL Database',
  'App Service',
  'Key Vault',
  'Load Balancer',
  'Virtual Network',
  'Container Instance',
];

export const DEPARTMENTS = [
  'Engineering',
  'DevOps',
  'Security',
  'Finance',
  'Product',
  'HR',
  'Data Science',
];

export const ROLES = ['Admin', 'Manager', 'Developer', 'Analyst', 'Viewer'];

export const RECLAMATION_STATUSES = {
  Active: { color: 'success', label: 'Active' },
  Idle: { color: 'warning', label: 'Idle' },
  Candidate: { color: 'info', label: 'Candidate' },
  Approved: { color: 'primary', label: 'Approved' },
  Reclaimed: { color: 'error', label: 'Reclaimed' },
};

export const STATUS_COLORS = {
  Active: '#13A10E',
  Idle: '#FCE100',
  Candidate: '#50E6FF',
  Approved: '#0078D4',
  Reclaimed: '#C50F1F',
};
