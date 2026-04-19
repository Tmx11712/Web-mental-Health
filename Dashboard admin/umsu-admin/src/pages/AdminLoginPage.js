import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLoginPage() {
  const { login }   = useAdminAuth();
  const navigate    = useNavigate();
  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Username dan password wajib diisi.'); return; }
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa username dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🛡️
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">UMSU Mental Health</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="font-display text-lg font-semibold text-white mb-1">Masuk sebagai Admin</h2>
          <p className="text-gray-500 text-sm mb-6">Hanya untuk konselor & administrator</p>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 placeholder-gray-600 transition-all"
                placeholder="Masukkan username admin..."
                value={form.username}
                onChange={e => set('username', e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 placeholder-gray-600 transition-all"
                  placeholder="Masukkan password..."
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-400 hover:bg-primary-500 text-white font-semibold py-3 rounded-xl transition-all text-sm disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Masuk...
                </span>
              ) : 'Masuk ke Panel Admin'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          © 2026 UMSU Mental Health · Panel Khusus Admin
        </p>
      </div>
    </div>
  );
}
