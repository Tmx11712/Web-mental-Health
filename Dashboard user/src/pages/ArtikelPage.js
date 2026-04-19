import React, { useEffect, useState } from 'react';
import { getArtikels } from '../services/api';

export default function ArtikelPage() {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getArtikels()
      .then(res => setArtikels(res.data?.data || []))
      .catch(() => setArtikels([]))
      .finally(() => setLoading(false));
  }, []);

  if (selected) return (
    <div className="animate-fade-in max-w-2xl">
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-5 transition-colors">
        ← Kembali ke Artikel
      </button>
      <div className="card p-6">
        <div className="text-5xl mb-4">{selected.emoji}</div>
        <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{selected.kategori}</span>
        <h2 className="font-display text-2xl font-bold text-gray-800 mt-2 mb-1">{selected.judul}</h2>
        <p className="text-sm text-gray-400 mb-6">{selected.waktu_baca} menit baca · {selected.penulis}</p>
        <div
          className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: selected.konten }}
        />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-gray-800">Artikel & Informasi</h2>
        <p className="text-sm text-gray-400 mt-0.5">Bacaan ringan untuk mendukung kesehatan mentalmu</p>
      </div>

      {loading ? <div className="spinner" /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artikels.map((a, i) => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className="card p-5 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl mb-4">
                {a.emoji}
              </div>
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{a.kategori}</span>
              <h3 className="font-display text-base font-semibold text-gray-800 mt-1.5 mb-2 line-clamp-2">{a.judul}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{a.ringkasan}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">{a.waktu_baca} menit baca</span>
                <span className="text-xs text-primary-400 font-medium">Baca →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && artikels.length === 0 && (
        <div className="card p-12 text-center text-gray-400">
          <p className="text-4xl mb-3">📰</p>
          <p>Belum ada artikel tersedia</p>
        </div>
      )}
    </div>
  );
}
