import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const NAV = [
  { to: '/admin',           icon: '📊', label: 'Dashboard',  exact: true },
  { to: '/admin/laporan',   icon: '📋', label: 'Laporan' },
  { to: '/admin/mahasiswa', icon: '👥', label: 'Mahasiswa' },
  { to: '/admin/artikel',   icon: '📰', label: 'Artikel' },
  { to: '/admin/polling',   icon: '🗳️',  label: 'Polling' },
];

export default function AdminSidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => { await logout(); navigate('/admin/login'); };
  const isActive = (to, exact) => exact ? pathname === to : pathname.startsWith(to);
  const initials = admin?.officer_name
    ? admin.officer_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)
    : 'A';

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-gray-950 border-r border-gray-800 z-30 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="px-5 py-5 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sm font-bold text-white">U</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">UMSU Admin</p>
              <p className="text-gray-500 text-xs">Mental Health</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-2">Menu</p>
          {NAV.map(item => {
            const active = isActive(item.to, item.exact);
            return (
              <Link key={item.to} to={item.to} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-emerald-500/15 text-emerald-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-800 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-900">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{initials}</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{admin?.officer_name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{admin?.email || 'Administrator'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <span className="w-5 text-center">🚪</span> Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
