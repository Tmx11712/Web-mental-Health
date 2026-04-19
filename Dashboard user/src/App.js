import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import HomePage        from './pages/HomePage';
import LaporanPage     from './pages/LaporanPage';
import BuatLaporanPage from './pages/BuatLaporanPage';
import ArtikelPage     from './pages/ArtikelPage';
import PollingPage     from './pages/PollingPage';
import BantuanPage     from './pages/BantuanPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index          element={<HomePage />} />
          <Route path="laporan" element={<LaporanPage />} />
          <Route path="buat"    element={<BuatLaporanPage />} />
          <Route path="artikel" element={<ArtikelPage />} />
          <Route path="polling" element={<PollingPage />} />
          <Route path="bantuan" element={<BantuanPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
