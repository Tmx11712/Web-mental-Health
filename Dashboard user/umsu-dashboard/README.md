# UMSU Mental Health — Dashboard User (React.js + Tailwind CSS)

## Persyaratan
- Node.js >= 18
- Backend Laravel sudah berjalan di http://localhost:8000

---

## Cara Install & Jalankan

  cd umsu-dashboard-user
  npm install
  npm start

Dashboard berjalan di: http://localhost:3000

---

## Halaman yang Tersedia

  /dashboard           -> Beranda (statistik, laporan terbaru, tips, artikel)
  /dashboard/laporan   -> Daftar laporan saya (filter: semua/menunggu/diproses/selesai)
  /dashboard/buat      -> Form buat laporan baru
  /dashboard/artikel   -> Daftar artikel kesehatan mental
  /dashboard/polling   -> Polling mahasiswa
  /dashboard/bantuan   -> Kontak bantuan darurat

---

## Struktur File

  src/
  ├── App.js                         <- Routing utama
  ├── index.css                      <- Tailwind CSS + custom styles
  ├── index.js                       <- Entry point
  ├── components/
  │   ├── DashboardLayout.js         <- Layout wrapper (sidebar + topbar)
  │   ├── Sidebar.js                 <- Navigasi sidebar
  │   └── Topbar.js                  <- Header atas
  ├── pages/
  │   ├── HomePage.js                <- Beranda dashboard
  │   ├── LaporanPage.js             <- Daftar laporan
  │   ├── BuatLaporanPage.js         <- Form buat laporan
  │   ├── ArtikelPage.js             <- Artikel kesehatan mental
  │   ├── PollingPage.js             <- Polling mahasiswa
  │   └── BantuanPage.js             <- Bantuan darurat
  └── services/
      └── api.js                     <- Axios API calls ke Laravel

---

## Koneksi ke Laravel Backend

Pastikan file .env berisi:

  REACT_APP_API_URL=http://localhost:8000/api

Dan backend Laravel sudah jalan:

  php artisan serve --port=8000

---

## Cara Install Tailwind CSS (jika belum ada)

  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

---

## Troubleshooting

  CORS error      -> Pastikan FRONTEND_URL=http://localhost:3000 di .env Laravel
  Data tidak muncul -> Pastikan php artisan serve sudah running
  Tailwind tidak jalan -> Jalankan: npm install -D tailwindcss postcss autoprefixer
