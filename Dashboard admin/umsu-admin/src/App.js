import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminProtectedRoute  from './components/AdminProtectedRoute';
import AdminLayout          from './components/AdminLayout';
import AdminLoginPage       from './pages/auth/AdminLoginPage';
import DashboardPage        from './pages/DashboardPage';
import LaporanPage          from './pages/LaporanPage';
import LaporanDetailPage    from './pages/LaporanDetailPage';
import ArtikelPage          from './pages/ArtikelPage';
import PollingPage          from './pages/PollingPage';
import MahasiswaPage        from './pages/MahasiswaPage';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route path="/"       element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index                    element={<DashboardPage />} />
            <Route path="laporan"           element={<LaporanPage />} />
            <Route path="laporan/:id"       element={<LaporanDetailPage />} />
            <Route path="artikel"           element={<ArtikelPage />} />
            <Route path="polling"           element={<PollingPage />} />
            <Route path="mahasiswa"         element={<MahasiswaPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
