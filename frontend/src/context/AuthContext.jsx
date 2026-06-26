// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success || result.token) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      return result;
    }
    throw new Error('Login failed');
  };

  const loginWithMicrosoft = (account, token) => {
    const msalUser = {
      id: account.localAccountId || 'msal-user',
      name: account.name || account.username.split('@')[0],
      email: account.username,
      role: 'Admin',
    };
    localStorage.setItem('token', token || 'mock-msal-token');
    localStorage.setItem('user', JSON.stringify(msalUser));
    setUser(msalUser);
    return { success: true, token: token || 'mock-msal-token', user: msalUser };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithMicrosoft, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
