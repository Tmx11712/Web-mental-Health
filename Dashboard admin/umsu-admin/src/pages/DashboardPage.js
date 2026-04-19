import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaporans, getArtikels, getPolling } from '../services/api';

function StatCard({ icon, label, value, sub, color, delay }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 animate-fade-in" style={{ animationDelay: delay }}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
    </div>
  );
}

const STATUS_BADGE = {
  baru:     'bg-blue-500/15 text-blue-400',
  diproses: 'bg-amber-500/15 text-amber-400',
  selesai:  'bg-emerald-500/15 text-emerald-400',
};

const TINGKAT_BADGE = {
  Ringan:  'bg-green-500/15 text-green-400',
  Sedang:  'bg-amber-500/15 text-amber-400',
  Berat:   'bg-orange-500/15 text-orange-400',
  Darurat: 'bg-red-500/15 text-red-400',
};

export default function DashboardPage() {
  const [laporans, setLaporans] = useState([]);
  const [artikels, setArtikels] = useState([]);
  const [polling,  setPolling]  = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.allSettled([getLaporans(), getArtikels(), getPolling()])
      .then(([l, a, p]) => {
        if (l.status === 'fulfilled') setLaporans(l.value.data || []);
        if (a.status === 'fulfilled') setArtikels(a.value.data?.data || []);
        if (p.status === 'fulfilled') setPolling(p.value.data?.data || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const total    = laporans.length;
  const baru     = laporans.filter(l => l.status === 'baru').length;
  const diproses = laporans.filter(l => l.status === 'diproses').length;
  const selesai  = laporans.filter(l => l.status === 'selesai').length;
  const darurat  = laporans.filter(l => l.tingkat_keparahan === 'Darurat').length;

  // Hitung per jenis
  const perJenis = laporans.reduce((acc, l) => {
    acc[l.jenis_masalah] = (acc[l.jenis_masalah] || 0) + 1;
    return acc;
  }, {});
  const topJenis = Object.entries(perJenis).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl">

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 text-white">
        <p className="text-emerald-100 text-sm mb-1">Selamat datang 👋</p>
        <h2 className="text-2xl font-bold mb-1">Panel Admin UMSU Mental Health</h2>
        <p className="text-emerald-100 text-sm">Monitor laporan, kelola konten, dan tangani mahasiswa yang membutuhkan bantuan.</p>
        {darurat > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-200 text-sm px-4 py-2 rounded-xl">
            🚨 <strong>{darurat} laporan DARURAT</strong> membutuhkan penanganan segera!
          </div>
        )}
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon="📋" label="Total Laporan"  value={total}    color="bg-blue-500/15"    delay="0ms" />
          <StatCard icon="🆕" label="Baru"           value={baru}     color="bg-blue-500/15"    delay="50ms" />
          <StatCard icon="⚙️"  label="Diproses"      value={diproses} color="bg-amber-500/15"   delay="100ms" />
          <StatCard icon="✅" label="Selesai"        value={selesai}  color="bg-emerald-500/15" delay="150ms" />
          <StatCard icon="🚨" label="Darurat"        value={darurat}  color="bg-red-500/15"     delay="200ms" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Laporan terbaru */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Laporan Terbaru</h3>
            <Link to="/admin/laporan" className="text-xs text-emerald-400 hover:underline">Lihat semua →</Link>
          </div>
          {laporans.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">Belum ada laporan</p>
            </div>
          ) : (
            <div className="space-y-2">
              {laporans.slice(0, 6).map(l => (
                <Link to={`/admin/laporan/${l.id}`} key={l.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-sm flex-shrink-0">📋</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{l.jenis_masalah}</p>
                    <p className="text-xs text-gray-500 truncate">{l.deskripsi}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[l.status]}`}>
                      {l.status}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TINGKAT_BADGE[l.tingkat_keparahan]}`}>
                      {l.tingkat_keparahan}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar kanan */}
        <div className="space-y-4">
          {/* Distribusi masalah */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Distribusi Masalah</h3>
            {topJenis.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-4">Belum ada data</p>
            ) : (
              <div className="space-y-3">
                {topJenis.map(([jenis, count]) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={jenis}>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span className="truncate max-w-[140px]">{jenis}</span>
                        <span>{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info konten */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3">Ringkasan Konten</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">📰 Artikel</span>
                <span className="text-sm font-semibold text-white">{artikels.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">🗳️ Polling aktif</span>
                <span className="text-sm font-semibold text-white">{polling ? 1 : 0}</span>
              </div>
              {polling && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">🗳️ Total suara</span>
                  <span className="text-sm font-semibold text-white">{polling.total_votes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
