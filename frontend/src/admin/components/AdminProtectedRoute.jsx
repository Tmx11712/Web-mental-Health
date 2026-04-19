import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Memuat...</p>
      </div>
    </div>
  );

  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}
