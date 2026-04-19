import React, { useEffect, useState } from 'react';
import { getPolling } from '../services/api';

export default function PollingPage() {
  const [polling, setPolling] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPolling()
      .then(res => setPolling(res.data?.data || null))
      .catch(() => setPolling(null))
      .finally(() => setLoading(false));
  }, []);

  const maxVote = polling ? Math.max(...polling.opsi.map(o => o.jumlah_vote), 1) : 1;

  return (
    <div className="space-y-5 max-w-3xl animate-fade-in">
      <div>
        <h2 className="text-white font-bold text-lg">Manajemen Polling</h2>
        <p className="text-gray-500 text-sm mt-0.5">Data polling mahasiswa aktif</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : !polling ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🗳️</p>
          <p className="text-gray-400">Belum ada polling aktif</p>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold text-base max-w-lg">{polling.pertanyaan}</h3>
            <span className="bg-emerald-500/15 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-3">Aktif</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">Total {polling.total_votes} suara</p>

          <div className="space-y-4">
            {polling.opsi.map(opsi => {
              const pct    = polling.total_votes > 0 ? Math.round((opsi.jumlah_vote / polling.total_votes) * 100) : 0;
              const isTop  = opsi.jumlah_vote === maxVote;
              return (
                <div key={opsi.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm ${isTop ? 'text-emerald-400 font-semibold' : 'text-gray-300'}`}>
                      {opsi.teks_opsi}
                      {isTop && <span className="ml-2 text-xs bg-emerald-500/15 px-2 py-0.5 rounded-full">Terbanyak</span>}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-500">{opsi.jumlah_vote} suara</span>
                      <span className={`text-sm font-bold ${isTop ? 'text-emerald-400' : 'text-gray-400'}`}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${isTop ? 'bg-emerald-500' : 'bg-gray-600'}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
