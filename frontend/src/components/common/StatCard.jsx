// src/components/common/StatCard.jsx
import React from 'react';
import { Card, CardContent, Box, Typography, LinearProgress } from '@mui/material';

const StatCard = ({ title, value, icon, color = '#0078D4', progress, subtitle, trend }) => {
  return (
    <Card sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
      {/* Glow accent */}
      <Box
        sx={{
          position: 'absolute', top: 0, right: 0,
          width: 120, height: 120, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ color: '#F3F2F1', mt: 0.5, lineHeight: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44, height: 44, borderRadius: 2,
              background: `linear-gradient(135deg, ${color}33, ${color}11)`,
              border: `1px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>

        {subtitle && (
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Typography variant="caption" sx={{ color: trend > 0 ? '#13A10E' : '#C50F1F', fontWeight: 600, fontSize: '0.75rem', display: 'block', mt: 0.5 }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </Typography>
        )}

        {progress !== undefined && (
          <Box sx={{ mt: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${color}, ${color}99)`,
                },
                background: `${color}15`,
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
