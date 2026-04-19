import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaporans } from '../services/api';

const STATUS_BADGE = {
  baru:     'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  diproses: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  selesai:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
};
const TINGKAT_BADGE = {
  Ringan:  'bg-green-500/15 text-green-400',
  Sedang:  'bg-amber-500/15 text-amber-400',
  Berat:   'bg-orange-500/15 text-orange-400',
  Darurat: 'bg-red-500/15 text-red-400',
};

export default function LaporanPage() {
  const [laporans, setLaporans] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('semua');
  const [search, setSearch]     = useState('');

  useEffect(() => {
    getLaporans()
      .then(res => setLaporans(res.data || []))
      .catch(() => setLaporans([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = laporans
    .filter(l => filter === 'semua' || l.status === filter)
    .filter(l => !search || l.jenis_masalah.toLowerCase().includes(search.toLowerCase())
      || (l.nama && l.nama.toLowerCase().includes(search.toLowerCase()))
      || (l.nim && l.nim.includes(search))
      || l.deskripsi.toLowerCase().includes(search.toLowerCase()));

  const count = (s) => laporans.filter(l => l.status === s).length;

  return (
    <div className="space-y-5 max-w-7xl animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg">Manajemen Laporan</h2>
          <p className="text-gray-500 text-sm mt-0.5">Total {laporans.length} laporan masuk</p>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Cari nama, NIM, atau jenis masalah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 w-72 placeholder-gray-600"
        />
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'semua',    label: 'Semua',    count: laporans.length },
            { key: 'baru',     label: 'Baru',     count: count('baru') },
            { key: 'diproses', label: 'Diproses', count: count('diproses') },
            { key: 'selesai',  label: 'Selesai',  count: count('selesai') },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
              }`}>
              {f.label} <span className="ml-1 opacity-70 text-xs">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabel */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-400">Tidak ada laporan ditemukan</p>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Pelapor</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Jenis Masalah</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Tingkat</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Tanggal</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3.5 text-gray-500 text-sm">#{l.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-white text-sm font-medium">{l.nama || <span className="text-gray-600 italic">Anonim</span>}</p>
                    {l.nim && <p className="text-xs text-gray-500">{l.nim}</p>}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-gray-300 text-sm">{l.jenis_masalah}</p>
                    <p className="text-xs text-gray-600 truncate max-w-[180px]">{l.deskripsi}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TINGKAT_BADGE[l.tingkat_keparahan]}`}>
                      {l.tingkat_keparahan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[l.status]}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {l.created_at ? new Date(l.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) : '-'}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/admin/laporan/${l.id}`}
                      className="text-xs bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 px-3 py-1.5 rounded-lg transition-colors font-medium">
                      Detail
                    </Link>
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
