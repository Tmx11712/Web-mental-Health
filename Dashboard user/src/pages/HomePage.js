import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaporans, getArtikels } from '../services/api';

const TIPS = [
  { icon: '🌱', judul: 'Bernapas dalam', desc: 'Tarik napas 4 detik, tahan 7, hembuskan 8. Ulangi 4 kali.' },
  { icon: '💧', judul: 'Minum air', desc: 'Dehidrasi ringan bisa menyebabkan kecemasan. Minum minimal 8 gelas/hari.' },
  { icon: '🚶', judul: 'Jalan kaki', desc: '10 menit jalan kaki terbukti mengurangi stres secara signifikan.' },
  { icon: '😴', judul: 'Tidur cukup', desc: 'Usahakan tidur 7-8 jam. Tidur adalah investasi terbaik untuk otak.' },
];

function StatCard({ icon, label, value, color, delay }) {
  return (
    <div
      className="card p-5 animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>
        {icon}
      </div>
      <p className="text-2xl font-display font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const [laporans, setLaporans]   = useState([]);
  const [artikels, setArtikels]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.allSettled([getLaporans(), getArtikels()])
      .then(([l, a]) => {
        if (l.status === 'fulfilled') setLaporans(l.value.data);
        if (a.status === 'fulfilled') setArtikels(a.value.data?.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const total    = laporans.length;
  const baru     = laporans.filter(l => l.status === 'baru').length;
  const diproses = laporans.filter(l => l.status === 'diproses').length;
  const selesai  = laporans.filter(l => l.status === 'selesai').length;

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl">

      {/* Greeting */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-300 rounded-2xl p-6 text-white">
        <p className="text-primary-100 text-sm font-medium mb-1">Selamat datang 👋</p>
        <h2 className="font-display text-2xl font-bold mb-2">Bagaimana kondisimu hari ini?</h2>
        <p className="text-primary-100 text-sm max-w-md">
          Platform ini hadir untuk mendukung kesehatan mentalmu. Jangan ragu untuk berbagi cerita.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <Link to="/dashboard/buat" className="bg-white text-primary-400 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
            Buat Laporan
          </Link>
          <Link to="/dashboard/bantuan" className="border border-white/60 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
            Bantuan Darurat
          </Link>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="📋" label="Total Laporan"   value={total}    color="bg-blue-50"   delay="0ms" />
          <StatCard icon="🆕" label="Menunggu"        value={baru}     color="bg-amber-50"  delay="60ms" />
          <StatCard icon="⚙️"  label="Diproses"       value={diproses} color="bg-purple-50" delay="120ms" />
          <StatCard icon="✅" label="Selesai"         value={selesai}  color="bg-green-50"  delay="180ms" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Laporan terbaru */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-gray-800">Laporan Terbaru</h3>
            <Link to="/dashboard/laporan" className="text-xs text-primary-400 hover:underline">Lihat semua →</Link>
          </div>
          {laporans.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">Belum ada laporan</p>
              <Link to="/dashboard/buat" className="btn-primary inline-block mt-3 text-xs">Buat Laporan Pertama</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {laporans.slice(0, 4).map((l) => (
                <div key={l.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-sm flex-shrink-0">
                    📋
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{l.jenis_masalah}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{l.deskripsi}</p>
                  </div>
                  <span className={`badge-${l.status} flex-shrink-0`}>
                    {l.status === 'baru' ? 'Baru' : l.status === 'diproses' ? 'Diproses' : 'Selesai'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips harian */}
        <div className="card p-5">
          <h3 className="font-display text-base font-semibold text-gray-800 mb-4">Tips Hari Ini 💡</h3>
          <div className="space-y-3">
            {TIPS.map((t) => (
              <div key={t.judul} className="flex gap-3">
                <span className="text-xl w-7 flex-shrink-0">{t.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">{t.judul}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artikel terbaru */}
      {artikels.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-gray-800">Artikel Terbaru</h3>
            <Link to="/dashboard/artikel" className="text-xs text-primary-400 hover:underline">Lihat semua →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {artikels.slice(0, 3).map((a) => (
              <div key={a.id} className="bg-gray-50 rounded-xl p-4 hover:bg-primary-50 transition-colors cursor-pointer">
                <span className="text-2xl">{a.emoji}</span>
                <p className="text-xs text-primary-400 font-medium mt-2">{a.kategori}</p>
                <p className="text-sm font-medium text-gray-700 mt-1 line-clamp-2">{a.judul}</p>
                <p className="text-xs text-gray-400 mt-1">{a.waktu_baca} menit baca</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
