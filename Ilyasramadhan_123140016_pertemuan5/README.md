# Laporan Praktikum Pemrograman Web - Pertemuan 5
## Sistem Manajemen Perpustakaan Sederhana (OOP Python)

---

### Identitas Mahasiswa
- **Nama Lengkap:** Ilyas Ramadhan
- **NIM:** 123140016
- **Kelas Praktikum:** RB
- **Program Studi:** Teknik Informatika
- **Institusi:** Institut Teknologi Sumatera (ITERA)

---

### Deskripsi Program & Penerapan 4 Pilar OOP

Sistem **Manajemen Perpustakaan Sederhana** dibangun menggunakan paradigma *Object-Oriented Programming* (OOP) di Python untuk mengelola koleksi buku dan majalah, status ketersediaan peminjaman, serta pencarian katalog.

Penerapan 4 pilar utama OOP dalam proyek ini meliputi:
1. **Class & Object:** Memodelkan entitas dunia nyata ke dalam class `LibraryItem`, `Book`, `Magazine`, `Member`, dan `Library`.
2. **Inheritance & Abstract Class:** Class `LibraryItem` didefinisikan sebagai *Abstract Base Class* (`ABC`) dengan method abstrak `get_detail()` dan `hitung_denda()`. Class `Book` dan `Magazine` mewarisi atribut serta perilaku dasar dari `LibraryItem`.
3. **Encapsulation & Properties:** Melindungi data sensitif menggunakan *access modifiers* (`_id_item`, `_judul` sebagai protected, serta `__is_dipinjam` pada `LibraryItem` dan `__koleksi` pada `Library` sebagai private). Akses status peminjaman dikontrol secara aman menggunakan `@property` dan `@is_dipinjam.setter`.
4. **Polymorphism:** Method `get_detail()` dan `hitung_denda()` di-*override* pada masing-masing subclass (`Book` memiliki tarif denda Rp 2.000/hari, sedangkan `Magazine` Rp 1.000/hari), sehingga saat dipanggil secara seragam di katalog perpustakaan, output menyesuaikan tipe objek masing-masing.

---

### Struktur Berkas Direktori

```text
Ilyasramadhan_123140016_pertemuan5/
├── latihan/
│   └── ... (berkas latihan praktikum)
├── tugas_perpustakaan/
│   ├── library_item.py
│   ├── member.py
│   ├── library.py
│   └── main.py
├── screenshot_output.png
├── README.md
└── .gitignore
### Panduan Menjalankan Program


1. Buka terminal dan arahkan ke direktori tugas:
   ```bash
   cd Ilyasramadhan_123140016_pertemuan5/tugas_perpustakaan

2. Jalankan skrip utama:
   ```bash
   python main.py
