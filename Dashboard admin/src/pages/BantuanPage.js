import React from 'react';
import { Link } from 'react-router-dom';

const KONTAK = [
  { icon: '🏫', nama: 'Konselor UMSU',           nomor: null,          info: 'Gedung Rektorat Lt. 2 · Senin–Jumat 08.00–16.00', tel: null },
  { icon: '📞', nama: 'Into The Light Indonesia', nomor: '119 ext. 8',  info: 'Hotline Nasional · 24 Jam',                       tel: 'tel:119' },
  { icon: '💬', nama: 'Yayasan Pulih',            nomor: '(021) 788-42580', info: 'Konsultasi Psikologi',                       tel: 'tel:02178842580' },
  { icon: '🚨', nama: 'Darurat Medis',            nomor: '119',         info: 'Layanan Darurat · 24 Jam',                        tel: 'tel:119' },
];

const TANDA = [
  { icon: '⚠️', judul: 'Kenali Tanda Krisis',     desc: 'Segera cari bantuan jika ada pikiran menyakiti diri sendiri, tidak bisa berfungsi normal, atau merasa tidak ada harapan.' },
  { icon: '🤝', judul: 'Jangan Sendirian',         desc: 'Dalam kondisi krisis, pastikan ada orang yang menemanimu. Hubungi teman, keluarga, atau konselor kampus segera.' },
  { icon: '💬', judul: 'Berani Berbicara',         desc: 'Berbicara tentang masalah kesehatan mental bukan tanda kelemahan — itu langkah berani menuju pemulihan.' },
];

export default function BantuanPage() {
  return (
    <div className="animate-fade-in max-w-3xl space-y-6">

      {/* Banner darurat */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-start gap-4">
        <span className="text-3xl">🚨</span>
        <div>
          <h3 className="font-display text-lg font-semibold text-red-700 mb-1">Dalam Kondisi Darurat?</h3>
          <p className="text-sm text-red-600 mb-3">Jika kamu atau seseorang dalam bahaya segera, hubungi layanan darurat sekarang.</p>
          <a href="tel:119" className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            📞 Hubungi 119 Sekarang
          </a>
        </div>
      </div>

      {/* Kontak */}
      <div className="card p-5">
        <h3 className="font-display text-base font-semibold text-gray-800 mb-4">Kontak Bantuan Kesehatan Mental</h3>
        <div className="space-y-3">
          {KONTAK.map((k) => (
            <div key={k.nama} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl flex-shrink-0">
                {k.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">{k.nama}</p>
                <p className="text-xs text-gray-400">{k.info}</p>
              </div>
              {k.nomor && (
                k.tel ? (
                  <a href={k.tel} className="font-bold text-primary-400 text-sm hover:underline flex-shrink-0">
                    {k.nomor}
                  </a>
                ) : (
                  <span className="font-bold text-gray-600 text-sm flex-shrink-0">{k.nomor}</span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Yang perlu diketahui */}
      <div className="card p-5">
        <h3 className="font-display text-base font-semibold text-gray-800 mb-4">Yang Perlu Kamu Tahu</h3>
        <div className="space-y-4">
          {TANDA.map((t) => (
            <div key={t.judul} className="flex gap-3">
              <span className="text-2xl w-8 flex-shrink-0">{t.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-0.5">{t.judul}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA laporan */}
      <div className="bg-primary-400 rounded-2xl p-6 text-white flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">Tidak dalam kondisi darurat?</h3>
          <p className="text-sm text-primary-100">Buat laporan dan konselor kami akan menghubungimu.</p>
        </div>
        <Link to="/dashboard/buat" className="bg-white text-primary-400 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors flex-shrink-0">
          Buat Laporan
        </Link>
      </div>
    </div>
  );
}
