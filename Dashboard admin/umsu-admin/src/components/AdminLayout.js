import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const TITLES = {
  '/admin':           'Dashboard',
  '/admin/laporan':   'Manajemen Laporan',
  '/admin/mahasiswa': 'Data Mahasiswa',
  '/admin/artikel':   'Manajemen Artikel',
  '/admin/polling':   'Manajemen Polling',
};

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const title = Object.entries(TITLES).find(([k]) => pathname === k || pathname.startsWith(k + '/'))?.[1] || 'Admin';

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400">
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
              <span className="block w-5 h-0.5 bg-current rounded" />
            </div>
          </button>
          <h1 className="text-white font-bold text-lg">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-semibold rounded-full">
              Administrator
            </span>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
