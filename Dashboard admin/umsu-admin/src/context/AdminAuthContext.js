import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext(null);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const saved = localStorage.getItem('admin_user');
    if (token && saved) {
      setAdmin(JSON.parse(saved));
      api.get('/admin/me')
        .then(res => setAdmin(res.data.data))
        .catch(() => { localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user'); setAdmin(null); })
        .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = async (username, password) => {
    const res = await api.post('/admin/login', { username, password });
    const { token, user } = res.data;
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    setAdmin(user);
    return res.data;
  };

  const logout = async () => {
    try { await api.post('/admin/logout'); } catch (_) {}
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
export { api };
