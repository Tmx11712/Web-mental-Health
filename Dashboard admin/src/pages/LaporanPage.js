import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaporans } from '../services/api';

const STATUS_MAP = {
  baru:      { label: 'Menunggu',  class: 'badge-baru',     dot: 'bg-blue-400' },
  diproses:  { label: 'Diproses',  class: 'badge-diproses', dot: 'bg-amber-400' },
  selesai:   { label: 'Selesai',   class: 'badge-selesai',  dot: 'bg-green-400' },
};

const TINGKAT_MAP = {
  Ringan:  'bg-green-50 text-green-700',
  Sedang:  'bg-amber-50 text-amber-700',
  Berat:   'bg-orange-50 text-orange-700',
  Darurat: 'bg-red-50 text-red-700',
};

export default function LaporanPage() {
  const [laporans, setLaporans] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('semua');

  useEffect(() => {
    getLaporans()
      .then(res => setLaporans(res.data))
      .catch(() => setLaporans([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'semua'
    ? laporans
    : laporans.filter(l => l.status === filter);

  return (
    <div className="animate-fade-in max-w-4xl space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-gray-800">Laporan Saya</h2>
          <p className="text-sm text-gray-400 mt-0.5">Total {laporans.length} laporan</p>
        </div>
        <Link to="/dashboard/buat" className="btn-primary">+ Buat Laporan</Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['semua', 'baru', 'diproses', 'selesai'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === s
                ? 'bg-primary-400 text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-primary-400 hover:text-primary-400'
            }`}
          >
            {s === 'semua' ? 'Semua' : s === 'baru' ? 'Menunggu' : s === 'diproses' ? 'Diproses' : 'Selesai'}
            <span className="ml-1.5 text-xs opacity-70">
              {s === 'semua' ? laporans.length : laporans.filter(l => l.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="spinner" />
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500 font-medium">Belum ada laporan</p>
          <p className="text-sm text-gray-400 mt-1 mb-4">Ceritakan masalahmu kepada konselor kami</p>
          <Link to="/dashboard/buat" className="btn-primary inline-block">Buat Laporan Sekarang</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l, i) => {
            const status  = STATUS_MAP[l.status] || STATUS_MAP.baru;
            const tingkat = TINGKAT_MAP[l.tingkat_keparahan] || '';
            return (
              <div
                key={l.id}
                className="card p-5 animate-slide-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-lg flex-shrink-0">
                      📋
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-gray-800 text-sm">{l.jenis_masalah}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tingkat}`}>
                          {l.tingkat_keparahan}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{l.deskripsi}</p>
                      {l.catatan_konselor && (
                        <div className="mt-2 bg-primary-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-primary-400 font-medium">💬 Catatan Konselor:</p>
                          <p className="text-xs text-gray-600 mt-0.5">{l.catatan_konselor}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={status.class}>{status.label}</span>
                    <p className="text-xs text-gray-400">
                      {l.created_at ? new Date(l.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
