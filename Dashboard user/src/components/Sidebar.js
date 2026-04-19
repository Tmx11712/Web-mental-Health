import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dashboard',         icon: '🏠', label: 'Beranda' },
  { to: '/dashboard/laporan', icon: '📋', label: 'Laporan Saya' },
  { to: '/dashboard/buat',    icon: '✏️',  label: 'Buat Laporan' },
  { to: '/dashboard/artikel', icon: '📰', label: 'Artikel' },
  { to: '/dashboard/polling', icon: '🗳️',  label: 'Polling' },
  { to: '/dashboard/bantuan', icon: '🆘', label: 'Bantuan Darurat' },
];

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-30
        flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="font-display text-lg font-bold text-primary-400 leading-tight">
            UMSU Mental Health
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 font-sans">Dashboard Mahasiswa</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-primary-50 text-primary-400 font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile bottom */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary-50">
            <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-bold">
              M
            </div>
            <div>
              <p className="text-sm font-medium text-primary-400">Mahasiswa</p>
              <p className="text-xs text-gray-400">UMSU</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
