# Tugas Praktikum Pertemuan 6 - RESTful API Manajemen Matakuliah

Aplikasi RESTful API CRUD data mata kuliah menggunakan Pyramid, SQLAlchemy, dan PostgreSQL (db_matakuliah).

## Identitas
- Nama: Ilyas Ramadhan
- NIM: 123140016
- Kelas: RB
- Mata Kuliah: PAW - Institut Teknologi Sumatera (ITERA)

## Struktur Proyek
- pyramid_mahasiswa/__init__.py - konfigurasi aplikasi Pyramid dan include modul (models, 
outes, iews)
- pyramid_mahasiswa/models/ - definisi model Matakuliah, Base, DBSession, dan includeme(config)
- pyramid_mahasiswa/routes.py - pendaftaran rute endpoint /api/matakuliah
- pyramid_mahasiswa/views/matakuliah.py - handler CRUD (GET, POST, PUT, DELETE) dan validasi (400, 404)
- scripts/initialize_db.py - skrip inisialisasi/seeding data awal mata kuliah
- development.ini - konfigurasi server (waitress port 6543) dan koneksi PostgreSQL

## Menjalankan Aplikasi
1. Aktifkan virtual environment: .\venv\Scripts\Activate.ps1
2. Seed data awal: python -m scripts.initialize_db development.ini
3. Jalankan server: pserve development.ini --reload

## Daftar Endpoint
- GET /api/matakuliah - ambil seluruh data mata kuliah (200)
- GET /api/matakuliah/{id} - ambil detail mata kuliah berdasarkan id (200, 404, 400)
- POST /api/matakuliah - tambah data mata kuliah baru via JSON (201, 400)
- PUT /api/matakuliah/{id} - perbarui data mata kuliah berdasarkan id (200, 404, 400)
- DELETE /api/matakuliah/{id} - hapus data mata kuliah berdasarkan id (200, 404, 400)