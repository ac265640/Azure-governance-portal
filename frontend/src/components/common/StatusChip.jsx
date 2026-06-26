// src/components/common/StatusChip.jsx
import React from 'react';
import { Chip } from '@mui/material';

const STATUS_CONFIG = {
  Active:    { bg: 'rgba(19,161,14,0.15)',  border: 'rgba(19,161,14,0.4)',  text: '#13A10E' },
  Idle:      { bg: 'rgba(252,225,0,0.12)',  border: 'rgba(252,225,0,0.4)',  text: '#FCE100' },
  Candidate: { bg: 'rgba(80,230,255,0.1)',  border: 'rgba(80,230,255,0.35)', text: '#50E6FF' },
  Approved:  { bg: 'rgba(0,120,212,0.15)', border: 'rgba(0,120,212,0.4)', text: '#0078D4' },
  Reclaimed: { bg: 'rgba(197,15,31,0.12)', border: 'rgba(197,15,31,0.4)', text: '#C50F1F' },
  Inactive:  { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', text: 'rgba(255,255,255,0.5)' },
  Admin:     { bg: 'rgba(0,120,212,0.15)', border: 'rgba(0,120,212,0.4)', text: '#0078D4' },
  Manager:   { bg: 'rgba(80,230,255,0.1)', border: 'rgba(80,230,255,0.3)', text: '#50E6FF' },
  Developer: { bg: 'rgba(19,161,14,0.12)', border: 'rgba(19,161,14,0.3)',  text: '#13A10E' },
  Analyst:   { bg: 'rgba(252,225,0,0.1)',  border: 'rgba(252,225,0,0.3)',  text: '#FCE100' },
  Viewer:    { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', text: 'rgba(255,255,255,0.5)' },
};

const StatusChip = ({ label, size = 'small' }) => {
  const config = STATUS_CONFIG[label] || STATUS_CONFIG['Inactive'];
  return (
    <Chip
      label={label}
      size={size}
      sx={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.text,
        fontWeight: 700,
        fontSize: '0.72rem',
        height: size === 'small' ? 22 : 28,
      }}
    />
  );
};

export default StatusChip;
