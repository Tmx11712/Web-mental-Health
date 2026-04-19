import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getLaporans   = (params) => api.get('/laporan', { params });
export const getLaporan    = (id)     => api.get(`/laporan/${id}`);
export const kirimLaporan  = (data)   => api.post('/laporan', data);
export const updateLaporan = (id, data) => api.put(`/laporan/${id}`, data);
export const hapusLaporan  = (id)     => api.delete(`/laporan/${id}`);

export const getArtikels   = ()       => api.get('/artikel');
export const getPolling    = ()       => api.get('/polling');
export const kirimVote     = (opsiId) => api.post('/polling/vote', { opsi_id: opsiId });

export default api;
