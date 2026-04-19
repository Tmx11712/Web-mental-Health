import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kirimLaporan } from '../services/api';

const JENIS = ['Stres Akademik','Kecemasan & Panik','Burnout','Masalah Finansial','Kesepian & Isolasi','Gangguan Tidur','Lainnya'];

const TINGKAT = [
  { value: 'Ringan',  label: 'Ringan',  desc: 'Masih bisa diatasi sendiri',        color: 'border-green-200 bg-green-50 text-green-700',  active: 'border-green-400 bg-green-100' },
  { value: 'Sedang',  label: 'Sedang',  desc: 'Perlu dukungan dari orang lain',    color: 'border-amber-200 bg-amber-50 text-amber-700',   active: 'border-amber-400 bg-amber-100' },
  { value: 'Berat',   label: 'Berat',   desc: 'Sangat mengganggu aktivitas',       color: 'border-orange-200 bg-orange-50 text-orange-700',active: 'border-orange-400 bg-orange-100' },
  { value: 'Darurat', label: 'Darurat', desc: 'Butuh bantuan segera',              color: 'border-red-200 bg-red-50 text-red-700',         active: 'border-red-400 bg-red-100' },
];

const INIT = { nama: '', nim: '', email: '', jenis_masalah: '', tingkat_keparahan: '', deskripsi: '' };

export default function BuatLaporanPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.jenis_masalah)    e.jenis_masalah    = 'Pilih jenis masalah';
    if (!form.tingkat_keparahan) e.tingkat_keparahan = 'Pilih tingkat keparahan';
    if (!form.deskripsi.trim()) e.deskripsi         = 'Ceritakan masalahmu';
    else if (form.deskripsi.trim().length < 10) e.deskripsi = 'Minimal 10 karakter';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await kirimLaporan(form);
      setSuccess(true);
    } catch (err) {
      const se = err.response?.data?.errors || {};
      if (Object.keys(se).length) {
        const flat = {};
        Object.entries(se).forEach(([k,v]) => flat[k] = Array.isArray(v) ? v[0] : v);
        setErrors(flat);
      } else {
        alert('Gagal mengirim laporan. Coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="max-w-lg mx-auto mt-10 card p-10 text-center animate-slide-up">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="font-display text-2xl font-bold text-primary-400 mb-2">Laporan Terkirim!</h2>
      <p className="text-gray-500 text-sm mb-6">Konselor kami akan segera meninjau laporan kamu. Terima kasih sudah berani berbagi.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => { setForm(INIT); setSuccess(false); }} className="btn-outline">Buat Lagi</button>
        <button onClick={() => navigate('/dashboard/laporan')} className="btn-primary">Lihat Laporan</button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-gray-800">Buat Laporan Baru</h2>
        <p className="text-sm text-gray-400 mt-1">Laporan bersifat anonim dan hanya diakses oleh konselor kampus</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 card p-6 space-y-5" noValidate>

          {/* Identitas opsional */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Identitas (Opsional)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Nama</label>
                <input className="input" placeholder="Nama kamu..." value={form.nama} onChange={e => set('nama', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">NIM</label>
                <input className="input" placeholder="Nomor Induk" value={form.nim} onChange={e => set('nim', e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email (untuk tindak lanjut)</label>
              <input className={`input ${errors.email ? 'border-red-300' : ''}`} type="email" placeholder="email@students.umsu.ac.id" value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Jenis masalah */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Jenis Masalah <span className="text-red-400">*</span></label>
            <select
              className={`input ${errors.jenis_masalah ? 'border-red-300' : ''}`}
              value={form.jenis_masalah}
              onChange={e => set('jenis_masalah', e.target.value)}
            >
              <option value="">— Pilih kategori —</option>
              {JENIS.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
            {errors.jenis_masalah && <p className="text-xs text-red-500 mt-1">{errors.jenis_masalah}</p>}
          </div>

          {/* Tingkat keparahan */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Tingkat Keparahan <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {TINGKAT.map(t => (
                <label
                  key={t.value}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.tingkat_keparahan === t.value ? t.active + ' border-2' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input type="radio" name="tingkat" value={t.value} checked={form.tingkat_keparahan === t.value} onChange={() => set('tingkat_keparahan', t.value)} className="sr-only" />
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${form.tingkat_keparahan === t.value ? 'bg-current' : 'bg-gray-300'}`} />
                  <div>
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs opacity-70">{t.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {errors.tingkat_keparahan && <p className="text-xs text-red-500 mt-1">{errors.tingkat_keparahan}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Ceritakan Masalahmu <span className="text-red-400">*</span></label>
            <textarea
              className={`input min-h-[120px] resize-y ${errors.deskripsi ? 'border-red-300' : ''}`}
              placeholder="Tuliskan apa yang kamu rasakan atau alami... Semua informasi bersifat rahasia."
              value={form.deskripsi}
              onChange={e => set('deskripsi', e.target.value)}
              maxLength={2000}
            />
            <div className="flex justify-between mt-1">
              {errors.deskripsi ? <p className="text-xs text-red-500">{errors.deskripsi}</p> : <span />}
              <p className="text-xs text-gray-400">{form.deskripsi.length}/2000</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-60">
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>
        </form>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="card p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Kerahasiaan Terjamin</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Laporan hanya diakses konselor terlatih yang menjaga kerahasiaan penuh.</p>
          </div>
          <div className="card p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Respon Cepat</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Laporan Berat & Darurat diprioritaskan untuk penanganan segera.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="text-2xl mb-2">🚨</div>
            <h4 className="text-sm font-semibold text-red-700 mb-1">Kondisi Darurat?</h4>
            <p className="text-xs text-red-600 mb-2">Hubungi hotline segera:</p>
            <a href="tel:119" className="text-lg font-bold text-red-600 hover:underline">119 ext. 8</a>
            <p className="text-xs text-red-400 mt-0.5">Into The Light · 24 Jam</p>
          </div>
        </div>
      </div>
    </div>
  );
}
