# Laporan Praktikum Pemrograman Web - Pertemuan 3
## Aplikasi Manajemen Buku Pribadi (Single Page Application dengan React)

---

### Identitas Mahasiswa
- **Nama Lengkap:** Ilyas Ramadhan
- **NIM:** 123140016
- **Kelas Praktikum:** RB
- **Program Studi:** Teknik Informatika
- **Institusi:** Institut Teknologi Sumatera (ITERA)

---

### 1. Deskripsi Aplikasi
Aplikasi **Manajemen Buku Pribadi** adalah aplikasi berbasis web (*Single Page Application*) yang dibangun menggunakan ekosistem **React.js** dan bundler **Vite**. Aplikasi ini dirancang untuk mempermudah pengguna dalam mencatat, mengorganisasi, mengelompokkan, dan memantau status koleksi buku pribadi (apakah buku tersebut telah dimiliki, sedang aktif dibaca, atau masuk ke dalam daftar rencana beli/*wishlist*).

Sistem dilengkapi dengan fitur validasi input, pencarian kata kunci secara instan (*real-time search*), penyaringan kategori status (*filtering*), operasi manipulasi data (CRUD), kalkulasi metrik ringkasan status buku, serta persistensi data lokal agar perubahan data tetap tersimpan saat peramban dimuat ulang.

---

### 2. Fitur Utama & Penerapan Konsep React

Aplikasi ini memenuhi seluruh kriteria teknis modul praktikum dengan rincian arsitektur sebagai berikut:

1. **State Management & Sinkronisasi (`useState`, `useEffect`):**
   - Mengelola state input formulir secara lokal, penanganan pesan kesalahan (*error messages*), serta kata kunci pencarian.
   - Menyinkronkan perubahan data koleksi buku secara otomatis ke media penyimpanan lokal.

2. **Custom Hooks:**
   - **`useLocalStorage` (`src/hooks/useLocalStorage.js`):** Mengabstraksi interaksi langsung dengan Browser Storage API sehingga data state React tersimpan secara persisten ke dalam `localStorage` dengan format JSON yang aman.
   - **`useBookStats` (`src/hooks/useBookStats.js`):** Menghitung kalkulasi metrik koleksi buku (total buku, jumlah buku dimiliki, sedang dibaca, dan rencana beli) menggunakan optimasi `useMemo` agar proses perhitungan ulang hanya berjalan ketika daftar buku mengalami perubahan.

3. **Global State dengan Context API (`src/context/BookContext.jsx`):**
   - Memusatkan data koleksi buku, state filter, fungsi penambahan (*create*), pengeditan (*update*), dan penghapusan (*delete*) tanpa perlu melakukan *prop drilling* ke komponen turunan.

4. **Navigasi Multi-View / Multi-Page:**
   - Memisahkan halaman utama pengelolaan buku (*Beranda*) dengan halaman ringkasan analitik (*Statistik*) dengan transisi tampilan yang reaktif.

5. **Komponen Reusable & Validasi Properti (`PropTypes`):**
   - Komponen antarmuka dipecah menjadi unit-unit independen:
     - `BookForm`: Komponen formulir input dan edit buku yang dilengkapi validasi field kosong.
     - `BookFilter`: Komponen bilah pencarian dan tombol filter kategori status buku.
     - `BookList`: Komponen penyaji kartu data buku beserta tombol aksi edit dan hapus.
   - Setiap komponen diproteksi dengan pengetikan `prop-types` untuk memastikan tipe data props yang dikirimkan selalu valid.

6. **Error Handling & Validasi Form:**
   - Memberikan umpan balik visual langsung berupa teks peringatan dan garis batas merah (*highlight border*) jika pengguna mengirimkan formulir dengan kolom judul atau nama penulis dalam keadaan kosong.

---

### 3. Struktur Berkas & Direktori Proyek

```text
Ilyasramadhan_123140016_pertemuan3/
├── public/
├── src/
│   ├── __tests__/
│   │   └── App.test.jsx
│   ├── components/
│   │   ├── BookFilter/
│   │   │   ├── BookFilter.css
│   │   │   └── BookFilter.jsx
│   │   ├── BookForm/
│   │   │   ├── BookForm.css
│   │   │   └── BookForm.jsx
│   │   └── BookList/
│   │       ├── BookList.css
│   │       └── BookList.jsx
│   ├── context/
│   │   └── BookContext.jsx
│   ├── hooks/
│   │   ├── useBookStats.js
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   └── Stats/
│   │       ├── Stats.css
│   │       └── Stats.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── setupTests.js
├── screenshot_beranda.png
├── screenshot_form.png
├── screenshot_stats.png
├── screenshot_testing.png
├── package.json
├── README.md
└── vite.config.js