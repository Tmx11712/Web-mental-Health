import React, { useEffect, useState } from 'react';
import { getArtikels } from '../services/api';

export default function ArtikelPage() {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getArtikels()
      .then(res => setArtikels(res.data?.data || []))
      .catch(() => setArtikels([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-5 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">Manajemen Artikel</h2>
          <p className="text-gray-500 text-sm mt-0.5">{artikels.length} artikel tersedia</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : artikels.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📰</p>
          <p className="text-gray-400">Belum ada artikel</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artikels.map(a => (
            <div key={a.id} className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
              <div className="h-28 bg-gray-700/50 flex items-center justify-center text-4xl">
                {a.emoji}
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{a.kategori}</span>
                <h3 className="text-white font-semibold text-sm mt-1.5 mb-2 line-clamp-2 leading-snug">{a.judul}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{a.ringkasan}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                  <span className="text-xs text-gray-600">{a.waktu_baca} menit baca</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.published ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-700 text-gray-500'}`}>
                    {a.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
