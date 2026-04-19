import React from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/dashboard':         'Beranda',
  '/dashboard/laporan': 'Laporan Saya',
  '/dashboard/buat':    'Buat Laporan',
  '/dashboard/artikel': 'Artikel',
  '/dashboard/polling': 'Polling',
  '/dashboard/bantuan': 'Bantuan Darurat',
};

export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
      {/* Hamburger - mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <div className="space-y-1">
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
        </div>
      </button>

      <h2 className="font-display text-xl font-semibold text-gray-800">{title}</h2>

      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-gray-400 hidden sm:block">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
      </div>
    </header>
  );
}
