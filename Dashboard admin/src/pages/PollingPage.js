import React, { useEffect, useState } from 'react';
import { getPolling, kirimVote } from '../services/api';

export default function PollingPage() {
  const [polling, setPolling]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [voted, setVoted]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    getPolling()
      .then(res => setPolling(res.data.data))
      .catch(() => setError('Gagal memuat polling.'))
      .finally(() => setLoading(false));
  }, []);

  const maxVote = polling ? Math.max(...polling.opsi.map(o => o.jumlah_vote), 1) : 1;

  const handleVote = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await kirimVote(selected);
      setPolling(res.data.data);
      setVoted(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setVoted(true);
      } else {
        setError('Gagal mengirim suara. Coba lagi.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-gray-800">Polling Mahasiswa</h2>
        <p className="text-sm text-gray-400 mt-0.5">Suaramu membantu kami memahami kondisi mahasiswa UMSU</p>
      </div>

      {loading && <div className="spinner" />}
      {error && <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {polling && (
        <div className="card p-6 space-y-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-800">{polling.pertanyaan}</h3>
            <p className="text-sm text-gray-400 mt-1">{polling.total_votes} suara · {voted ? 'Kamu sudah memilih' : 'Pilih satu jawaban'}</p>
          </div>

          <div className="space-y-3">
            {polling.opsi.map((opsi) => {
              const pct     = polling.total_votes > 0 ? Math.round((opsi.jumlah_vote / polling.total_votes) * 100) : 0;
              const isTop   = opsi.jumlah_vote === maxVote && voted;
              const isSel   = selected === opsi.id;

              return (
                <div
                  key={opsi.id}
                  onClick={() => !voted && setSelected(opsi.id)}
                  className={`relative rounded-xl border-2 p-4 transition-all overflow-hidden ${
                    voted
                      ? isTop ? 'border-primary-400 bg-primary-50' : 'border-gray-100 bg-gray-50'
                      : isSel ? 'border-primary-400 bg-primary-50 cursor-pointer' : 'border-gray-200 hover:border-primary-300 cursor-pointer'
                  }`}
                >
                  {/* Bar background jika sudah vote */}
                  {voted && (
                    <div
                      className="absolute inset-0 bg-primary-100 opacity-30 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  )}

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {!voted && (
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSel ? 'border-primary-400' : 'border-gray-300'}`}>
                          {isSel && <div className="w-2 h-2 rounded-full bg-primary-400" />}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700">{opsi.teks_opsi}</span>
                    </div>
                    {voted && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isTop && <span className="text-xs bg-primary-400 text-white px-2 py-0.5 rounded-full">Terbanyak</span>}
                        <span className="text-sm font-bold text-primary-400">{pct}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!voted ? (
            <button
              onClick={handleVote}
              disabled={!selected || submitting}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {submitting ? 'Mengirim...' : 'Kirim Suara Saya'}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-primary-50 text-primary-400 rounded-xl px-4 py-3 text-sm font-medium">
              <span>✅</span>
              <span>Terima kasih sudah berpartisipasi!</span>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="card p-5 mt-4">
        <h4 className="font-semibold text-gray-700 text-sm mb-2">📊 Mengapa polling ini penting?</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          Data polling membantu tim konselor dan pihak kampus UMSU merancang program dukungan yang lebih tepat sasaran sesuai kebutuhan mahasiswa. Suaramu anonim dan tidak dapat ditelusuri.
        </p>
      </div>
    </div>
  );
}
