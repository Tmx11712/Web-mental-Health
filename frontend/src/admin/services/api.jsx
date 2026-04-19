import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const adminLogin  = (data) => api.post('/admin/login', data);
export const adminLogout = ()     => api.post('/admin/logout');
export const adminMe     = ()     => api.get('/admin/me');

// Laporan
export const getLaporans       = (params)   => api.get('/laporan', { params });
export const getLaporan        = (id)       => api.get(`/laporan/${id}`);
export const updateStatusLaporan = (id, data) => api.patch(`/laporan/${id}/status`, data);
export const hapusLaporan      = (id)       => api.delete(`/laporan/${id}`);
export const getStatistik      = ()         => api.get('/laporan/statistik');

// Artikel
export const getArtikels  = ()       => api.get('/artikel');
export const getArtikel   = (slug)   => api.get(`/artikel/${slug}`);

// Polling
export const getPolling   = ()       => api.get('/polling');

export default api;
