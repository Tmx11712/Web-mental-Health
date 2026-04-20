/**
 * Data artikel statis — disimpan di sini, bukan database.
 * Admin bisa tambah/edit/hapus via halaman manajemen artikel (tersimpan di localStorage).
 */
export const DEFAULT_ARTICLES = [
  {
    id: 1,
    slug: "mengenal-anxiety-disorder",
    judul: "Mengenal Anxiety Disorder: Gejala, Penyebab, dan Cara Mengatasinya",
    ringkasan:
      "Anxiety disorder adalah gangguan kecemasan yang umum dialami mahasiswa. Kenali tanda-tandanya lebih awal agar bisa segera ditangani.",
    konten: `<h2>Apa Itu Anxiety Disorder?</h2>
<p>Anxiety disorder atau gangguan kecemasan adalah kondisi kesehatan mental di mana seseorang mengalami rasa cemas yang berlebihan dan terus-menerus, hingga mengganggu aktivitas sehari-hari. Kondisi ini berbeda dari rasa cemas biasa yang wajar kita rasakan sesekali.</p>

<h2>Gejala yang Perlu Diwaspadai</h2>
<p>Beberapa gejala umum anxiety disorder antara lain:</p>
<ul>
  <li>Rasa khawatir berlebihan yang sulit dikendalikan</li>
  <li>Jantung berdebar-debar</li>
  <li>Sulit tidur atau insomnia</li>
  <li>Mudah lelah meski tidak banyak beraktivitas</li>
  <li>Sulit berkonsentrasi</li>
  <li>Ketegangan otot</li>
</ul>

<h2>Penyebab Anxiety Disorder</h2>
<p>Gangguan ini bisa dipicu oleh kombinasi faktor genetik, pengalaman traumatis, stres berkepanjangan, atau ketidakseimbangan kimia otak. Pada mahasiswa, tekanan akademik, masalah keuangan, dan adaptasi sosial sering menjadi pemicu utama.</p>

<h2>Cara Mengatasi</h2>
<p>Beberapa langkah yang bisa membantu:</p>
<ul>
  <li><strong>Terapi kognitif perilaku (CBT)</strong> — terbukti efektif untuk anxiety disorder</li>
  <li><strong>Teknik relaksasi</strong> — pernapasan dalam, meditasi, yoga</li>
  <li><strong>Olahraga rutin</strong> — membantu menstabilkan mood</li>
  <li><strong>Batasi kafein dan alkohol</strong></li>
  <li><strong>Konsultasi dengan profesional</strong> — jangan ragu untuk mencari bantuan</li>
</ul>

<p>Jika kamu merasa gejala-gejala di atas mengganggu kehidupanmu, segera konsultasikan dengan konselor atau psikolog. Kamu tidak harus menghadapinya sendirian.</p>`,
    kategori: "Gangguan Mental",
    emoji: "😰",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 5,
    published: true,
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: 2,
    slug: "teknik-mindfulness-untuk-mahasiswa",
    judul: "5 Teknik Mindfulness yang Bisa Dipraktikkan Mahasiswa Setiap Hari",
    ringkasan:
      "Mindfulness bukan hanya untuk meditasi. Ada banyak cara sederhana yang bisa kamu lakukan di sela-sela kuliah untuk menjaga ketenangan pikiran.",
    konten: `<h2>Apa Itu Mindfulness?</h2>
<p>Mindfulness adalah kemampuan untuk hadir sepenuhnya di momen sekarang — sadar akan pikiran, perasaan, dan lingkungan sekitar tanpa menghakimi. Penelitian menunjukkan bahwa mindfulness secara signifikan mengurangi stres dan meningkatkan kesejahteraan mental.</p>

<h2>5 Teknik Mindfulness untuk Mahasiswa</h2>

<h2>1. Pernapasan 4-7-8</h2>
<p>Tarik napas selama 4 detik, tahan 7 detik, hembuskan perlahan selama 8 detik. Lakukan 3–4 kali saat merasa cemas atau sebelum ujian.</p>

<h2>2. Body Scan</h2>
<p>Luangkan 5 menit untuk memindai tubuhmu dari kepala hingga kaki. Rasakan setiap bagian tubuh tanpa menghakimi. Ini membantu melepas ketegangan fisik akibat stres.</p>

<h2>3. Makan dengan Sadar</h2>
<p>Saat makan, jauhkan ponsel. Fokus pada rasa, tekstur, dan aroma makanan. Ini melatih otak untuk hadir di momen sekarang.</p>

<h2>4. Jalan Mindful</h2>
<p>Saat berjalan ke kelas, perhatikan setiap langkah. Rasakan tanah di bawah kakimu, udara di sekitarmu. Ini cara mudah melatih mindfulness tanpa waktu ekstra.</p>

<h2>5. Jurnal Rasa Syukur</h2>
<p>Sebelum tidur, tulis 3 hal yang kamu syukuri hari ini. Kebiasaan ini terbukti meningkatkan mood dan mengurangi kecemasan dalam jangka panjang.</p>

<p>Mulailah dengan satu teknik dan lakukan secara konsisten. Perubahan besar dimulai dari langkah kecil yang dilakukan setiap hari.</p>`,
    kategori: "Self-Care",
    emoji: "🧘",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 4,
    published: true,
    created_at: "2024-03-05T00:00:00Z",
  },
  {
    id: 3,
    slug: "mengatasi-burnout-akademik",
    judul: "Burnout Akademik: Kenali Tanda-Tandanya Sebelum Terlambat",
    ringkasan:
      "Burnout bukan sekadar kelelahan biasa. Jika dibiarkan, kondisi ini bisa mengganggu prestasi dan kesehatan mentalmu secara serius.",
    konten: `<h2>Apa Itu Burnout Akademik?</h2>
<p>Burnout akademik adalah kondisi kelelahan mental, emosional, dan fisik yang disebabkan oleh tekanan belajar yang berlebihan dan terus-menerus. Ini bukan sekadar "capek" — burnout bisa membuat kamu kehilangan motivasi total untuk belajar.</p>

<h2>Tanda-Tanda Burnout</h2>
<ul>
  <li>Merasa lelah meski sudah cukup tidur</li>
  <li>Kehilangan minat pada mata kuliah yang dulu disukai</li>
  <li>Nilai turun meski sudah belajar keras</li>
  <li>Sering sakit kepala atau gangguan fisik lainnya</li>
  <li>Merasa tidak berguna atau tidak kompeten</li>
  <li>Menghindari tugas dan kewajiban akademik</li>
</ul>

<h2>Penyebab Umum</h2>
<p>Burnout biasanya terjadi karena kombinasi dari:</p>
<ul>
  <li>Beban tugas yang terlalu berat</li>
  <li>Kurang tidur dan istirahat</li>
  <li>Perfeksionisme yang tidak realistis</li>
  <li>Kurangnya dukungan sosial</li>
  <li>Tidak ada waktu untuk hal-hal yang menyenangkan</li>
</ul>

<h2>Cara Pulih dari Burnout</h2>
<p>Pemulihan burnout membutuhkan waktu dan kesabaran:</p>
<ul>
  <li><strong>Istirahat yang cukup</strong> — tidur 7–9 jam per malam</li>
  <li><strong>Set batasan yang sehat</strong> — belajar mengatakan "tidak"</li>
  <li><strong>Lakukan aktivitas yang kamu nikmati</strong></li>
  <li><strong>Bicara dengan konselor</strong> — minta bantuan bukan tanda kelemahan</li>
  <li><strong>Revisi target belajar</strong> — buat yang lebih realistis</li>
</ul>

<p>Ingat: prestasi akademik penting, tapi kesehatan mentalmu jauh lebih berharga. Jangan tunggu sampai benar-benar jatuh untuk mulai merawat dirimu.</p>`,
    kategori: "Stres & Burnout",
    emoji: "🔥",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 6,
    published: true,
    created_at: "2024-03-10T00:00:00Z",
  },
  {
    id: 4,
    slug: "pentingnya-tidur-untuk-kesehatan-mental",
    judul: "Kenapa Tidur yang Cukup Sangat Penting untuk Kesehatan Mental?",
    ringkasan:
      "Mahasiswa sering mengorbankan tidur demi belajar. Padahal, kurang tidur justru merusak kemampuan kognitif dan kesehatan mentalmu.",
    konten: `<h2>Hubungan Tidur dan Kesehatan Mental</h2>
<p>Tidur bukan sekadar istirahat fisik. Saat tidur, otak memproses emosi, mengkonsolidasi memori, dan memulihkan diri dari stres harian. Kurang tidur secara langsung berdampak pada mood, konsentrasi, dan kesehatan mental secara keseluruhan.</p>

<h2>Dampak Kurang Tidur</h2>
<ul>
  <li>Mudah marah dan emosional</li>
  <li>Sulit berkonsentrasi dan mengingat informasi</li>
  <li>Peningkatan risiko depresi dan anxiety</li>
  <li>Penurunan kemampuan pengambilan keputusan</li>
  <li>Sistem imun melemah</li>
</ul>

<h2>Berapa Jam yang Ideal?</h2>
<p>Mahasiswa (usia 18–25 tahun) membutuhkan <strong>7–9 jam tidur per malam</strong>. Tidur di bawah 6 jam secara konsisten sama berbahayanya dengan tidak tidur sama sekali selama 24 jam.</p>

<h2>Tips Tidur Lebih Baik</h2>
<ul>
  <li><strong>Jadwal konsisten</strong> — tidur dan bangun di jam yang sama setiap hari</li>
  <li><strong>Hindari layar 1 jam sebelum tidur</strong> — cahaya biru mengganggu produksi melatonin</li>
  <li><strong>Kamar yang nyaman</strong> — gelap, sejuk, dan tenang</li>
  <li><strong>Hindari kafein setelah jam 2 siang</strong></li>
  <li><strong>Teknik relaksasi</strong> — baca buku, meditasi, atau mandi air hangat</li>
</ul>

<p>Investasikan waktumu untuk tidur yang berkualitas. Otak yang beristirahat dengan baik akan belajar lebih efisien dan lebih tahan terhadap tekanan.</p>`,
    kategori: "Self-Care",
    emoji: "😴",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 4,
    published: true,
    created_at: "2024-03-15T00:00:00Z",
  },
  {
    id: 5,
    slug: "cara-membangun-dukungan-sosial",
    judul: "Membangun Jaringan Dukungan Sosial yang Sehat di Kampus",
    ringkasan:
      "Koneksi sosial adalah salah satu faktor paling penting untuk kesehatan mental. Ini cara membangunnya di lingkungan kampus.",
    konten: `<h2>Mengapa Dukungan Sosial Penting?</h2>
<p>Manusia adalah makhluk sosial. Penelitian menunjukkan bahwa orang dengan jaringan sosial yang kuat memiliki kesehatan mental yang jauh lebih baik, lebih tahan terhadap stres, dan bahkan hidup lebih lama. Di kampus, memiliki teman yang bisa dipercaya adalah salah satu proteksi terbaik terhadap gangguan mental.</p>

<h2>Tanda-Tanda Kamu Butuh Lebih Banyak Dukungan Sosial</h2>
<ul>
  <li>Sering merasa kesepian meski ada orang di sekitar</li>
  <li>Tidak ada orang yang bisa diajak bicara saat sedang down</li>
  <li>Selalu menyelesaikan masalah sendirian</li>
  <li>Merasa seperti beban jika minta tolong orang lain</li>
</ul>

<h2>Cara Membangun Koneksi yang Bermakna</h2>
<ul>
  <li><strong>Bergabung dengan UKM atau komunitas</strong> yang sesuai minatmu</li>
  <li><strong>Jadilah pendengar yang baik</strong> — hubungan dibangun dengan memberi, bukan hanya menerima</li>
  <li><strong>Mulai dari yang kecil</strong> — sapa teman sekelas, ajak ngobrol saat istirahat</li>
  <li><strong>Manfaatkan media sosial dengan bijak</strong> — gunakan untuk terhubung, bukan untuk membandingkan diri</li>
  <li><strong>Konsultasi dengan konselor kampus</strong> jika merasa kesulitan membangun koneksi sosial</li>
</ul>

<h2>Perbedaan Kuantitas dan Kualitas</h2>
<p>Kamu tidak butuh banyak teman — kamu butuh beberapa teman yang bisa dipercaya. Satu hubungan yang dalam dan tulus lebih berharga dari seratus koneksi yang dangkal.</p>

<p>Jika kamu merasa sangat kesepian, jangan ragu untuk menghubungi layanan konseling kampus. Kami ada untuk membantu.</p>`,
    kategori: "Relasi Sosial",
    emoji: "🤝",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 5,
    published: true,
    created_at: "2024-03-20T00:00:00Z",
  },
  {
    id: 6,
    slug: "depresi-bukan-kelemahan",
    judul: "Depresi Bukan Kelemahan: Memahami dan Mencari Bantuan",
    ringkasan:
      "Stigma seputar depresi masih tinggi di kalangan mahasiswa. Mari kita luruskan miskonsepsi dan bicara terbuka tentang cara mendapatkan bantuan.",
    konten: `<h2>Apa Itu Depresi?</h2>
<p>Depresi adalah gangguan mood yang ditandai dengan perasaan sedih yang mendalam, kehilangan minat, dan berbagai gejala fisik maupun emosional yang berlangsung lebih dari dua minggu. Ini bukan "sekadar sedih" dan bukan tanda kelemahan karakter.</p>

<h2>Gejala Depresi</h2>
<ul>
  <li>Perasaan sedih, kosong, atau putus asa yang terus-menerus</li>
  <li>Kehilangan minat pada aktivitas yang dulu menyenangkan</li>
  <li>Perubahan nafsu makan dan berat badan</li>
  <li>Gangguan tidur (terlalu banyak atau terlalu sedikit)</li>
  <li>Kelelahan dan kehilangan energi</li>
  <li>Pikiran tentang kematian atau menyakiti diri sendiri</li>
</ul>

<h2>Mitos vs Fakta</h2>
<p><strong>Mitos:</strong> "Depresi itu pilihan, tinggal berpikir positif saja."<br/>
<strong>Fakta:</strong> Depresi adalah kondisi medis dengan basis neurobiologis yang nyata. Berpikir positif saja tidak cukup.</p>

<p><strong>Mitos:</strong> "Orang yang depresi itu lemah."<br/>
<strong>Fakta:</strong> Banyak orang yang sangat sukses pernah berjuang dengan depresi. Mencari bantuan justru tanda keberanian.</p>

<h2>Langkah Pertama Mencari Bantuan</h2>
<ul>
  <li><strong>Akui bahwa kamu butuh bantuan</strong> — ini langkah paling berani</li>
  <li><strong>Hubungi layanan konseling kampus</strong> — gratis dan rahasia</li>
  <li><strong>Ceritakan pada orang yang dipercaya</strong></li>
  <li><strong>Jangan tunda</strong> — semakin cepat ditangani, semakin baik</li>
</ul>

<p>Kamu tidak sendirian. Ribuan mahasiswa di seluruh Indonesia menghadapi hal yang sama. Kami siap mendengarkan dan membantu.</p>`,
    kategori: "Gangguan Mental",
    emoji: "💙",
    penulis: "Tim Konselor UMSU",
    waktu_baca: 6,
    published: true,
    created_at: "2024-03-25T00:00:00Z",
  },
];

const STORAGE_KEY = "mental_health_articles";

/** Ambil semua artikel (dari localStorage jika ada, atau default) */
export function getArticles() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return DEFAULT_ARTICLES;
}

/** Simpan semua artikel ke localStorage */
export function saveArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

/** Ambil artikel yang dipublish saja */
export function getPublishedArticles() {
  return getArticles().filter((a) => a.published);
}

/** Ambil satu artikel berdasarkan slug */
export function getArticleBySlug(slug) {
  return getArticles().find((a) => a.slug === slug) || null;
}

/** Tambah artikel baru */
export function addArticle(article) {
  const articles = getArticles();
  const newId = articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
  const newArticle = {
    ...article,
    id: newId,
    created_at: new Date().toISOString(),
  };
  saveArticles([...articles, newArticle]);
  return newArticle;
}

/** Update artikel */
export function updateArticle(id, data) {
  const articles = getArticles();
  const updated = articles.map((a) => (a.id === id ? { ...a, ...data } : a));
  saveArticles(updated);
  return updated.find((a) => a.id === id);
}

/** Hapus artikel */
export function deleteArticle(id) {
  const articles = getArticles().filter((a) => a.id !== id);
  saveArticles(articles);
}

/** Generate slug dari judul */
export function generateSlug(judul) {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
