// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  InputAdornment, IconButton, Divider, CircularProgress, Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudIcon from '@mui/icons-material/Cloud';
import MicrosoftIcon from '@mui/icons-material/Window';
import { useAuth } from '../context/AuthContext';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/msalConfig';

const LoginPage = () => {
  const { login, loginWithMicrosoft } = useAuth();
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMicrosoftLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      if (loginResponse && loginResponse.account) {
        loginWithMicrosoft(loginResponse.account, loginResponse.idToken || loginResponse.accessToken);
        navigate('/dashboard');
      } else {
        throw new Error('No account returned from Microsoft');
      }
    } catch (err) {
      console.error('MSAL Login Error:', err);
      setError(err.message || 'Microsoft Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Try admin@azure.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0c1a3a 50%, #001a40 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <Box sx={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,120,212,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,120,212,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Glow orbs */}
      <Box sx={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,120,212,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <Box sx={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(80,230,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <Card
        sx={{
          width: '100%', maxWidth: 440, mx: 2, position: 'relative', zIndex: 1,
          background: 'rgba(13,21,38,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,120,212,0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,120,212,0.08)',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64, height: 64, borderRadius: 3, mx: 'auto', mb: 2,
                background: 'linear-gradient(135deg, #0078D4, #50E6FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 32px rgba(0,120,212,0.5)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 32px rgba(0,120,212,0.5)' },
                  '50%': { boxShadow: '0 0 48px rgba(0,120,212,0.8)' },
                  '100%': { boxShadow: '0 0 32px rgba(0,120,212,0.5)' },
                },
              }}
            >
              <CloudIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#F3F2F1' }}>
              Azure Governance Portal
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
              Sign in to your organization account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, background: 'rgba(197,15,31,0.1)', border: '1px solid rgba(197,15,31,0.3)', color: '#ff8080' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth name="email" label="Email Address" type="email"
              value={form.email} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment> }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password} onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(v => !v)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit" fullWidth variant="contained" size="large"
              disabled={loading}
              sx={{
                py: 1.4, fontSize: '1rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #0078D4 0%, #005A9E 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #2B9FEB 0%, #0078D4 100%)', boxShadow: '0 8px 24px rgba(0,120,212,0.5)' },
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.08)' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', px: 1 }}>OR</Typography>
          </Divider>

          <Button
            fullWidth variant="outlined" size="large" startIcon={<MicrosoftIcon />}
            onClick={handleMicrosoftLogin}
            disabled={loading}
            sx={{
              py: 1.2, fontWeight: 600, borderColor: 'rgba(0,120,212,0.4)',
              color: '#50E6FF',
              '&:hover': {
                borderColor: '#0078D4',
                background: 'rgba(0,120,212,0.08)',
                boxShadow: '0 0 16px rgba(0,120,212,0.2)',
              },
            }}
          >
            Sign in with Microsoft
          </Button>

          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2.5, color: 'rgba(255,255,255,0.25)' }}>
            Demo: admin@azure.com / admin123
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
