import React, { useEffect, useState } from 'react';
import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  generateSlug,
} from '../../data/artikelData';

const EMPTY_FORM = {
  judul: '',
  ringkasan: '',
  konten: '',
  kategori: 'Gangguan Mental',
  emoji: '📄',
  penulis: 'Tim Konselor UMSU',
  waktu_baca: 3,
  published: true,
  slug: '',
};

const KATEGORI_LIST = [
  'Gangguan Mental',
  'Self-Care',
  'Stres & Burnout',
  'Relasi Sosial',
  'Motivasi',
  'Tips & Trik',
];

const EMOJI_LIST = ['📄','😰','🧘','🔥','😴','🤝','💙','🌱','💪','🎯','📚','❤️','🌟','🧠'];

export default function ArtikelPage() {
  const [artikels, setArtikels]     = useState([]);
  const [showForm, setShowForm]     = useState(false);
  const [editId, setEditId]         = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch]         = useState('');
  const [activeTab, setActiveTab]   = useState('list'); // 'list' | 'form'
  const [toast, setToast]           = useState(null);

  const load = () => setArtikels(getArticles());

  useEffect(() => { load(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openNew = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setActiveTab('form');
  };

  const openEdit = (artikel) => {
    setForm({
      judul:      artikel.judul,
      ringkasan:  artikel.ringkasan,
      konten:     artikel.konten,
      kategori:   artikel.kategori,
      emoji:      artikel.emoji || '📄',
      penulis:    artikel.penulis,
      waktu_baca: artikel.waktu_baca,
      published:  artikel.published,
      slug:       artikel.slug,
    });
    setEditId(artikel.id);
    setActiveTab('form');
  };

  const cancelForm = () => {
    setActiveTab('list');
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      // Auto-generate slug dari judul jika bukan edit
      if (name === 'judul' && !editId) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.judul.trim() || !form.konten.trim()) {
      showToast('Judul dan konten wajib diisi!', 'error');
      return;
    }
    const payload = { ...form, waktu_baca: Number(form.waktu_baca) };
    if (editId) {
      updateArticle(editId, payload);
      showToast('Artikel berhasil diperbarui!');
    } else {
      if (!payload.slug) payload.slug = generateSlug(payload.judul);
      addArticle(payload);
      showToast('Artikel baru berhasil ditambahkan!');
    }
    load();
    cancelForm();
  };

  const handleTogglePublish = (artikel) => {
    updateArticle(artikel.id, { published: !artikel.published });
    load();
    showToast(artikel.published ? 'Artikel dijadikan draft.' : 'Artikel dipublish!');
  };

  const handleDelete = (id) => {
    deleteArticle(id);
    load();
    setDeleteConfirm(null);
    showToast('Artikel berhasil dihapus.', 'error');
  };

  const filtered = artikels.filter((a) =>
    a.judul.toLowerCase().includes(search.toLowerCase()) ||
    a.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const published = artikels.filter((a) => a.published).length;
  const drafts    = artikels.filter((a) => !a.published).length;

  return (
    <div className="space-y-5 max-w-7xl animate-fade-in">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all
          ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">Manajemen Artikel</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {published} published · {drafts} draft
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          Tambah Artikel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: artikels.length, icon: '📰', color: 'text-blue-400' },
          { label: 'Published', value: published, icon: '✅', color: 'text-emerald-400' },
          { label: 'Draft', value: drafts, icon: '✏️', color: 'text-yellow-400' },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== LIST VIEW ===== */}
      {activeTab === 'list' && (
        <>
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
              <p className="text-4xl mb-3">📰</p>
              <p className="text-gray-400">
                {search ? 'Artikel tidak ditemukan.' : 'Belum ada artikel. Klik "+ Tambah Artikel" untuk memulai.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-start gap-4 hover:border-gray-600 transition-colors"
                >
                  {/* Emoji */}
                  <div className="w-12 h-12 bg-gray-700/60 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {a.emoji || '📄'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{a.kategori}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${a.published ? 'bg-emerald-500/15 text-emerald-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                        {a.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-1">{a.judul}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{a.ringkasan}</p>
                    <div className="text-gray-600 text-xs mt-1.5">{a.waktu_baca} menit baca · {a.penulis}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(a)}
                      className="text-xs bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(a)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        a.published
                          ? 'bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-400'
                          : 'bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400'
                      }`}
                    >
                      {a.published ? '📦 Draft' : '🚀 Publish'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(a.id)}
                      className="text-xs bg-red-500/15 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== FORM VIEW ===== */}
      {activeTab === 'form' && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold text-base">
              {editId ? '✏️ Edit Artikel' : '📝 Tambah Artikel Baru'}
            </h3>
            <button
              type="button"
              onClick={cancelForm}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              ✕ Batal
            </button>
          </div>

          {/* Judul */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Judul Artikel *</label>
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              required
              placeholder="Masukkan judul artikel..."
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="otomatis-dari-judul"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-400 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
          </div>

          {/* Row: Kategori + Emoji + Waktu Baca */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Kategori</label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {KATEGORI_LIST.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Emoji</label>
              <select
                name="emoji"
                value={form.emoji}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {EMOJI_LIST.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Menit Baca</label>
              <input
                type="number"
                name="waktu_baca"
                value={form.waktu_baca}
                onChange={handleChange}
                min={1} max={60}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Penulis */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Penulis</label>
            <input
              type="text"
              name="penulis"
              value={form.penulis}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Ringkasan */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Ringkasan</label>
            <textarea
              name="ringkasan"
              value={form.ringkasan}
              onChange={handleChange}
              rows={2}
              placeholder="Deskripsi singkat artikel..."
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Konten */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">
              Konten * <span className="text-gray-600 font-normal">(mendukung HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;)</span>
            </label>
            <textarea
              name="konten"
              value={form.konten}
              onChange={handleChange}
              required
              rows={12}
              placeholder={`<h2>Judul Bagian</h2>\n<p>Isi paragraf di sini...</p>\n<ul>\n  <li>Poin pertama</li>\n  <li>Poin kedua</li>\n</ul>`}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-y font-mono leading-relaxed"
            />
          </div>

          {/* Preview konten */}
          {form.konten && (
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Preview Konten</label>
              <div
                className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 prose prose-invert max-w-none prose-sm
                  prose-h2:text-white prose-h2:font-bold prose-h2:mt-4 prose-h2:mb-2
                  prose-p:text-gray-300 prose-p:mb-3 prose-li:text-gray-300"
                dangerouslySetInnerHTML={{ __html: form.konten }}
              />
            </div>
          )}

          {/* Published toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-emerald-500' : 'bg-gray-600'}`} />
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${form.published ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-sm text-gray-300">
              {form.published ? '🚀 Published (tampil di website)' : '📦 Draft (tidak tampil di website)'}
            </span>
          </label>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              {editId ? '💾 Simpan Perubahan' : '✨ Tambah Artikel'}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="px-6 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="text-4xl text-center mb-3">🗑️</div>
            <h3 className="text-white font-bold text-center mb-2">Hapus Artikel?</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Artikel ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold text-sm py-2.5 rounded-xl transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
