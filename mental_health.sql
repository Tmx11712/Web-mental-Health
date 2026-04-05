-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 04 Apr 2026
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10
--
-- Database: `mental_health`
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Buat Database
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `mental_health`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `mental_health`;

-- --------------------------------------------------------
--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_01_01_000001_create_laporan_table', 1),
(2, '2024_01_01_000002_create_polling_tables', 1),
(3, '2024_01_01_000003_create_artikel_table', 1);

-- --------------------------------------------------------
--
-- Struktur dari tabel `artikel`
--

CREATE TABLE `artikel` (
  `id` bigint UNSIGNED NOT NULL,
  `judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emoji` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '📄',
  `ringkasan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `konten` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu_baca` int NOT NULL DEFAULT '5',
  `penulis` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Tim Konselor UMSU',
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `slug`, `kategori`, `emoji`, `ringkasan`, `konten`, `waktu_baca`, `penulis`, `published`, `created_at`, `updated_at`) VALUES
(1, '5 Cara Mudah Mengelola Stres saat Ujian', '5-cara-mengelola-stres-ujian', 'Tips Kesehatan', '🌱', 'Teknik pernapasan, manajemen waktu, dan strategi belajar yang efektif untuk menjaga ketenangan pikiran.', '<p>Stres saat ujian adalah hal yang sangat umum dialami mahasiswa. Namun, dengan strategi yang tepat, kamu bisa mengatasinya.</p><h2>1. Teknik Pernapasan 4-7-8</h2><p>Hirup napas selama 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 4 kali. Teknik ini membantu menenangkan sistem saraf secara cepat.</p><h2>2. Buat Jadwal Belajar Realistis</h2><p>Jangan coba belajar semua materi dalam satu malam. Bagi materi menjadi bagian kecil dan belajar secara konsisten setiap hari.</p><h2>3. Istirahat dengan Teknik Pomodoro</h2><p>Belajar 25 menit, istirahat 5 menit. Setiap 4 sesi, istirahat 15-30 menit. Metode ini terbukti meningkatkan fokus dan mengurangi kelelahan mental.</p><h2>4. Jaga Pola Makan dan Tidur</h2><p>Tidur minimal 7-8 jam dan konsumsi makanan bergizi. Otak yang lelah tidak bisa menyerap informasi dengan baik.</p><h2>5. Bicara dengan Seseorang</h2><p>Jangan pendam perasaan sendiri. Cerita ke teman, keluarga, atau konselor kampus bisa sangat membantu meringankan beban mental.</p>', 10, 'Tim Konselor UMSU', 1, '2026-04-04 08:00:00', '2026-04-04 08:00:00'),
(2, 'Cara Membangun Koneksi Sosial yang Sehat di Kampus', 'membangun-koneksi-sosial-kampus', 'Hubungan Sosial', '🤝', 'Panduan untuk mahasiswa dalam membangun pertemanan yang bermakna dan jaringan dukungan yang kuat.', '<p>Membangun hubungan sosial yang sehat adalah kunci kesejahteraan mental selama kuliah.</p><h2>Mulai dari Lingkungan Terdekat</h2><p>Kenali teman sekelas dan teman kos terlebih dahulu. Sapaan sederhana bisa menjadi awal persahabatan yang bermakna.</p><h2>Ikuti UKM atau Organisasi Kampus</h2><p>Bergabung dengan unit kegiatan mahasiswa sesuai minat membantu kamu bertemu orang-orang dengan ketertarikan yang sama.</p><h2>Jadilah Pendengar yang Baik</h2><p>Hubungan yang kuat dibangun dari saling mendengarkan, bukan hanya berbicara. Tunjukkan minat yang tulus pada cerita orang lain.</p><h2>Batasi Penggunaan Media Sosial</h2><p>Terlalu banyak menggunakan media sosial justru bisa membuat kamu merasa lebih kesepian. Prioritaskan interaksi langsung.</p>', 8, 'Tim Konselor UMSU', 1, '2026-04-04 08:01:00', '2026-04-04 08:01:00'),
(3, 'Mengenal Mindfulness: Solusi Cemas di Era Digital', 'mengenal-mindfulness-solusi-cemas', 'Mindfulness', '💆', 'Latihan mindfulness sederhana yang bisa dilakukan kapan saja untuk meredakan kecemasan sehari-hari.', '<p>Mindfulness adalah kemampuan untuk hadir sepenuhnya di momen saat ini, tanpa menghakimi pikiran dan perasaan yang muncul.</p><h2>Apa Itu Mindfulness?</h2><p>Mindfulness berasal dari tradisi meditasi dan kini diadopsi luas dalam psikologi modern sebagai terapi yang terbukti efektif.</p><h2>Latihan Sederhana untuk Pemula</h2><p>Coba duduk diam selama 5 menit. Fokus pada napasmu. Ketika pikiran mengembara, kembalikan perhatian ke napas tanpa menyalahkan diri sendiri.</p><h2>Mindful Eating</h2><p>Makan tanpa gadget, nikmati setiap suapan dengan penuh kesadaran. Ini salah satu bentuk mindfulness paling mudah dipraktikkan.</p><h2>Manfaat yang Terbukti</h2><p>Penelitian menunjukkan mindfulness dapat mengurangi kecemasan hingga 30%, memperbaiki kualitas tidur, dan meningkatkan fokus belajar.</p>', 12, 'Tim Konselor UMSU', 1, '2026-04-04 08:02:00', '2026-04-04 08:02:00'),
(4, 'Mengenali Tanda-tanda Burnout pada Mahasiswa', 'mengenali-tanda-burnout-mahasiswa', 'Kesehatan Mental', '🔥', 'Burnout bukan sekadar kelelahan biasa. Kenali tanda-tandanya sebelum terlambat dan pelajari cara pemulihannya.', '<p>Burnout adalah kondisi kelelahan fisik, emosional, dan mental akibat stres berkepanjangan. Berbeda dengan kelelahan biasa, burnout tidak hilang hanya dengan istirahat satu malam.</p><h2>Tanda-tanda Burnout</h2><p>Beberapa tanda umum: merasa tidak berenergi meski sudah tidur cukup, kehilangan motivasi, mudah tersinggung, kesulitan berkonsentrasi, dan merasa tidak ada gunanya berusaha.</p><h2>Penyebab Burnout</h2><p>Beban tugas berlebihan, tekanan nilai, ekspektasi orang tua, kesulitan finansial, dan kurangnya waktu untuk diri sendiri adalah penyebab paling umum.</p><h2>Langkah Pemulihan</h2><p>Pertama, akui bahwa kamu mengalami burnout. Kedua, kurangi beban yang bisa dikurangi. Ketiga, prioritaskan tidur, makan, dan olahraga ringan.</p><h2>Kapan Harus Cari Bantuan?</h2><p>Jika gejala berlangsung lebih dari dua minggu dan mengganggu kemampuanmu berfungsi sehari-hari, segera konsultasikan ke konselor kampus.</p>', 9, 'Tim Konselor UMSU', 1, '2026-04-04 08:03:00', '2026-04-04 08:03:00'),
(5, 'Tips Menjaga Kesehatan Mental saat Jauh dari Keluarga', 'menjaga-kesehatan-mental-jauh-keluarga', 'Tips Kesehatan', '🏠', 'Merantau untuk kuliah bisa terasa berat. Berikut tips praktis untuk tetap sehat mental meski jauh dari rumah.', '<p>Bagi banyak mahasiswa UMSU yang berasal dari luar Medan, merantau adalah pengalaman yang menantang secara emosional. Rasa rindu rumah adalah hal yang sangat normal.</p><h2>Bangun Rutinitas Harian</h2><p>Rutinitas memberikan rasa stabilitas yang membantu mengurangi kecemasan. Tetapkan jam bangun, makan, belajar, dan tidur yang konsisten.</p><h2>Tetap Terhubung dengan Keluarga</h2><p>Jadwalkan video call dengan keluarga secara rutin, misalnya setiap minggu.</p><h2>Ciptakan Rumah Baru</h2><p>Personalisasi kamarmu dengan foto dan benda kesayangan. Membuat lingkungan barumu terasa nyaman sangat membantu proses adaptasi.</p><h2>Temukan Komunitas</h2><p>Bergabunglah dengan komunitas mahasiswa dari daerah yang sama. Berbagi pengalaman dengan orang yang memahami situasimu bisa sangat melegakan.</p>', 8, 'Tim Konselor UMSU', 1, '2026-04-04 08:04:00', '2026-04-04 08:04:00');

-- --------------------------------------------------------
--
-- Struktur dari tabel `laporan`
--

CREATE TABLE `laporan` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nim` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_masalah` enum('Stres Akademik','Kecemasan & Panik','Burnout','Masalah Finansial','Kesepian & Isolasi','Gangguan Tidur','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tingkat_keparahan` enum('Ringan','Sedang','Berat','Darurat') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('baru','diproses','selesai') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'baru',
  `catatan_konselor` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `laporan`
--

INSERT INTO `laporan` (`id`, `nama`, `nim`, `email`, `jenis_masalah`, `tingkat_keparahan`, `deskripsi`, `status`, `catatan_konselor`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, 'Stres Akademik', 'Sedang', 'Saya merasa sangat terbebani dengan banyaknya tugas dan deadline yang bertumpuk. Sulit tidur dan susah berkonsentrasi saat belajar.', 'baru', NULL, '2026-04-04 08:10:00', '2026-04-04 08:10:00'),
(2, 'Budi Santoso', '2101234', 'budi@students.umsu.ac.id', 'Kecemasan & Panik', 'Berat', 'Sering mengalami serangan panik menjelang presentasi. Jantung berdebar kencang dan tangan gemetar. Sudah berlangsung 2 bulan terakhir.', 'diproses', 'Sudah dihubungi, jadwal konseling Rabu 10.00 WIB', '2026-04-04 08:15:00', '2026-04-04 08:20:00'),
(3, NULL, NULL, NULL, 'Kesepian & Isolasi', 'Ringan', 'Sebagai mahasiswa baru, saya kesulitan beradaptasi dan belum punya teman dekat. Sering merasa sendiri meskipun di lingkungan yang ramai.', 'selesai', 'Sudah diberikan panduan membangun koneksi sosial dan bergabung UKM', '2026-04-04 08:20:00', '2026-04-04 09:00:00'),
(4, 'Sari Dewi', '2209876', 'sari@students.umsu.ac.id', 'Burnout', 'Berat', 'Merasa kelelahan total, tidak ada motivasi untuk mengerjakan apapun. Sudah tidak masuk kuliah 1 minggu karena tidak sanggup bangun dari tempat tidur.', 'diproses', 'Dirujuk ke psikolog kampus untuk sesi konseling intensif', '2026-04-04 08:30:00', '2026-04-04 09:30:00'),
(5, NULL, NULL, NULL, 'Masalah Finansial', 'Sedang', 'Kesulitan membayar UKT semester ini. Beasiswa belum cair dan orang tua sedang sakit. Kondisi ini membuat saya tidak bisa fokus belajar.', 'baru', NULL, '2026-04-04 09:00:00', '2026-04-04 09:00:00');

-- --------------------------------------------------------
--
-- Struktur dari tabel `polling`
--

CREATE TABLE `polling` (
  `id` bigint UNSIGNED NOT NULL,
  `pertanyaan` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aktif` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `polling`
--

INSERT INTO `polling` (`id`, `pertanyaan`, `aktif`, `created_at`, `updated_at`) VALUES
(1, 'Apa masalah terbesar yang kamu hadapi sebagai mahasiswa?', 1, '2026-04-04 08:00:00', '2026-04-04 08:00:00');

-- --------------------------------------------------------
--
-- Struktur dari tabel `polling_opsi`
--

CREATE TABLE `polling_opsi` (
  `id` bigint UNSIGNED NOT NULL,
  `polling_id` bigint UNSIGNED NOT NULL,
  `teks_opsi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah_vote` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `polling_opsi`
--

INSERT INTO `polling_opsi` (`id`, `polling_id`, `teks_opsi`, `jumlah_vote`, `created_at`, `updated_at`) VALUES
(1, 1, 'Stres akademik dan tekanan tugas', 45, '2026-04-04 08:00:00', '2026-04-04 08:00:00'),
(2, 1, 'Masalah keuangan dan biaya hidup', 32, '2026-04-04 08:00:00', '2026-04-04 08:00:00'),
(3, 1, 'Kesepian dan kurangnya dukungan sosial', 25, '2026-04-04 08:00:00', '2026-04-04 08:00:00'),
(4, 1, 'Ketidakpastian masa depan dan karir', 18, '2026-04-04 08:00:00', '2026-04-04 08:00:00');

-- --------------------------------------------------------
--
-- Struktur dari tabel `polling_votes`
--

CREATE TABLE `polling_votes` (
  `id` bigint UNSIGNED NOT NULL,
  `polling_opsi_id` bigint UNSIGNED NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `polling_votes`
-- (kosong - akan terisi saat user melakukan vote)
--

-- --------------------------------------------------------
--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `artikel_slug_unique` (`slug`),
  ADD KEY `artikel_published_index` (`published`),
  ADD KEY `artikel_kategori_index` (`kategori`);

--
-- Indeks untuk tabel `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `laporan_status_index` (`status`),
  ADD KEY `laporan_jenis_masalah_index` (`jenis_masalah`),
  ADD KEY `laporan_tingkat_keparahan_index` (`tingkat_keparahan`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `polling`
--
ALTER TABLE `polling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `polling_aktif_index` (`aktif`);

--
-- Indeks untuk tabel `polling_opsi`
--
ALTER TABLE `polling_opsi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `polling_opsi_polling_id_foreign` (`polling_id`);

--
-- Indeks untuk tabel `polling_votes`
--
ALTER TABLE `polling_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `polling_votes_opsi_id_foreign` (`polling_opsi_id`),
  ADD KEY `polling_votes_ip_address_index` (`ip_address`);

-- --------------------------------------------------------
--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `laporan`
--
ALTER TABLE `laporan`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `polling`
--
ALTER TABLE `polling`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `polling_opsi`
--
ALTER TABLE `polling_opsi`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `polling_votes`
--
ALTER TABLE `polling_votes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- --------------------------------------------------------
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `polling_opsi`
--
ALTER TABLE `polling_opsi`
  ADD CONSTRAINT `polling_opsi_polling_id_foreign` FOREIGN KEY (`polling_id`) REFERENCES `polling` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `polling_votes`
--
ALTER TABLE `polling_votes`
  ADD CONSTRAINT `polling_votes_opsi_id_foreign` FOREIGN KEY (`polling_opsi_id`) REFERENCES `polling_opsi` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
