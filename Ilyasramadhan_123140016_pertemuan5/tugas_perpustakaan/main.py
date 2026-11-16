"""
Program Utama Pengujian Sistem Manajemen Perpustakaan Sederhana
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""

from library_item import Book, Magazine
from member import Member
from library import Library


def main():
    perpus = Library("Perpustakaan Teknik Informatika ITERA")

    print("--- 1. MENAMBAHKAN KOLEKSI KE PERPUSTAKAAN ---")
    buku1 = Book("B001", "Clean Code", 2008, "Robert C. Martin", "978-0132350884")
    buku2 = Book("B002", "Python Crash Course", 2019, "Eric Matthes", "978-1593279288")
    majalah1 = Magazine("M001", "National Geographic Indonesia", 2026, "Edisi November", "Grid Network")
    majalah2 = Magazine("M002", "InfoKomputer", 2026, "Vol. 40 No. 10", "Gramedia")

    perpus.tambah_item(buku1)
    perpus.tambah_item(buku2)
    perpus.tambah_item(majalah1)
    perpus.tambah_item(majalah2)

    # Menampilkan seluruh katalog awal
    perpus.tampilkan_katalog()

    print("\n--- 2. SIMULASI PEMINJAMAN & PERUBAHAN STATUS ---")
    anggota1 = Member("MBR-016", "Ilyas Ramadhan")
    perpus.proses_pinjam("B001", anggota1)
    perpus.proses_pinjam("M001", anggota1)
    print(f"Status Anggota: {anggota1.get_info_member()}")

    # Menampilkan hanya katalog item yang masih tersedia
    perpus.tampilkan_katalog(hanya_tersedia=True)

    print("\n--- 3. PENCARIAN ITEM BERDASARKAN JUDUL / ID ---")
    for query in ["Python", "M002", "Algoritma"]:
        print(f"Mencari kata kunci: '{query}'")
        hasil_cari = perpus.cari_item(query)
        if hasil_cari:
            for item in hasil_cari:
                print(f"   -> Ditemukan: {item.get_detail()}")
        else:
            print("   -> Item tidak ditemukan.")

    print("\n--- 4. SIMULASI POLYMORPHISM PERHITUNGAN DENDA (3 HARI TERLAMBAT) ---")
    print(f"Denda Buku '{buku1.judul}'      : Rp {buku1.hitung_denda(3):,}")
    print(f"Denda Majalah '{majalah1.judul}' : Rp {majalah1.hitung_denda(3):,}")


if __name__ == "__main__":
    main()