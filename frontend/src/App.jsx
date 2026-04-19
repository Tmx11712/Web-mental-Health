import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Issues from "./components/Issues";
import Articles from "./components/Articles";
import Polling from "./components/Polling";
import FormLaporan from "./components/FormLaporan";
import Emergency from "./components/Emergency";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ArticleDetail from "./pages/ArticleDetail";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Imports
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLoginPage from './admin/pages/auth/AdminLoginPage';
import AdminDashboardPage from './admin/pages/DashboardPage';
import AdminLaporanPage from './admin/pages/LaporanPage';
import AdminLaporanDetailPage from './admin/pages/LaporanDetailPage';
import AdminArtikelPage from './admin/pages/ArtikelPage';
import AdminPollingPage from './admin/pages/PollingPage';
import AdminMahasiswaPage from './admin/pages/MahasiswaPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Issues />
      <Articles />
      <Polling />
      <FormLaporan />
      <Emergency />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/artikel/:slug" element={<ArticleDetail />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="laporan" element={<AdminLaporanPage />} />
          <Route path="laporan/:id" element={<AdminLaporanDetailPage />} />
          <Route path="artikel" element={<AdminArtikelPage />} />
          <Route path="polling" element={<AdminPollingPage />} />
          <Route path="mahasiswa" element={<AdminMahasiswaPage />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;