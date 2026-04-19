import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function MahasiswaPage() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    api.get('/admin/mahasiswa')
      .then(res => setData(res.data?.data || res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(m =>
    !search ||
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.nim?.includes(search) ||
    m.username?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg">Data Mahasiswa</h2>
          <p className="text-gray-500 text-sm mt-0.5">Total {data.length} mahasiswa terdaftar</p>
        </div>
        <input
          type="text"
          placeholder="Cari nama, NIM, atau email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 w-72 placeholder-gray-600"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">👥</p>
          <p className="text-gray-400">
            {data.length === 0 ? 'Belum ada mahasiswa terdaftar' : 'Tidak ada hasil pencarian'}
          </p>
          {data.length === 0 && (
            <p className="text-gray-600 text-sm mt-2">Mahasiswa akan muncul di sini setelah mendaftar melalui halaman Register</p>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                {['#', 'Nama', 'NIM', 'Username', 'Email', 'No. HP', 'Alamat', 'Bergabung'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((m, i) => (
                <tr key={m.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3.5 text-gray-600 text-sm">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0">
                        {m.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span className="text-white text-sm font-medium">{m.name || '-'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm font-mono">{m.nim || '-'}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{m.username || '-'}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{m.email || <span className="text-gray-600 italic">-</span>}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{m.phone_number || '-'}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-sm">{m.address || '-'}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
