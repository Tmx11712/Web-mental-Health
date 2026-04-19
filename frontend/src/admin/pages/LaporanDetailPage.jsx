import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLaporan, updateStatusLaporan, hapusLaporan } from '../services/api';

const STATUS_OPTIONS = ['baru', 'diproses', 'selesai'];
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

export default function LaporanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laporan, setLaporan]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [status, setStatus]         = useState('');
  const [catatan, setCatatan]       = useState('');
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);
  const [deleting, setDeleting]     = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    getLaporan(id)
      .then(res => {
        const data = res.data;
        setLaporan(data);
        setStatus(data.status);
        setCatatan(data.catatan_konselor || '');
      })
      .catch(() => navigate('/admin/laporan'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateStatusLaporan(id, { status, catatan_konselor: catatan });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setLaporan(p => ({ ...p, status, catatan_konselor: catatan }));
    } catch (_) { alert('Gagal menyimpan.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await hapusLaporan(id);
      navigate('/admin/laporan');
    } catch (_) { alert('Gagal menghapus.'); setDeleting(false); }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  if (!laporan) return null;

  return (
    <div className="max-w-4xl animate-fade-in space-y-5">
      {/* Back */}
      <Link to="/admin/laporan" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
        ← Kembali ke Laporan
      </Link>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Detail laporan */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Laporan #{laporan.id}</p>
                <h2 className="text-white font-bold text-lg">{laporan.jenis_masalah}</h2>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[laporan.status]}`}>
                  {laporan.status}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TINGKAT_BADGE[laporan.tingkat_keparahan]}`}>
                  {laporan.tingkat_keparahan}
                </span>
              </div>
            </div>

            {/* Info pelapor */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Nama',  value: laporan.nama  || 'Anonim' },
                { label: 'NIM',   value: laporan.nim   || '-' },
                { label: 'Email', value: laporan.email || '-' },
                { label: 'Tanggal', value: laporan.created_at
                  ? new Date(laporan.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
                  : '-' },
              ].map(item => (
                <div key={item.label} className="bg-gray-700/40 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Deskripsi */}
            <div className="bg-gray-700/40 rounded-xl px-4 py-4">
              <p className="text-xs text-gray-500 mb-2">Deskripsi Masalah</p>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{laporan.deskripsi}</p>
            </div>

            {/* Catatan konselor lama */}
            {laporan.catatan_konselor && (
              <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <p className="text-xs text-emerald-400 mb-1">💬 Catatan Konselor Sebelumnya:</p>
                <p className="text-sm text-gray-300">{laporan.catatan_konselor}</p>
              </div>
            )}
          </div>
        </div>

        {/* Panel tindakan */}
        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Update Status</h3>

            <div className="space-y-2 mb-4">
              {STATUS_OPTIONS.map(s => (
                <label key={s}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    status === s
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}>
                  <input type="radio" name="status" value={s} checked={status === s}
                    onChange={() => setStatus(s)} className="sr-only" />
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                    status === s ? 'border-emerald-400' : 'border-gray-600'
                  }`}>
                    {status === s && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </div>
                  <span className={`text-sm font-medium capitalize ${
                    status === s ? 'text-emerald-400' : 'text-gray-400'
                  }`}>{s}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1.5">Catatan Konselor</label>
              <textarea
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Tulis catatan tindak lanjut..."
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 resize-none placeholder-gray-600"
              />
            </div>

            <button onClick={handleSave} disabled={saving}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50">
              {saving ? 'Menyimpan...' : saved ? '✅ Tersimpan!' : 'Simpan Perubahan'}
            </button>
          </div>

          {/* Hapus */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-2">Hapus Laporan</h3>
            <p className="text-xs text-gray-500 mb-3">Tindakan ini tidak dapat dibatalkan.</p>
            {!confirmDel ? (
              <button onClick={() => setConfirmDel(true)}
                className="w-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-medium py-2.5 rounded-xl text-sm transition-all">
                Hapus Laporan
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-red-400 text-center">Yakin ingin menghapus?</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDel(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-600">
                    Batal
                  </button>
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 disabled:opacity-50">
                    {deleting ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
