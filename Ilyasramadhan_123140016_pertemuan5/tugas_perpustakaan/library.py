"""
Modul pengelolaan koleksi dan transaksi perpustakaan.
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""

from library_item import LibraryItem
from member import Member


class Library:
    """Class pengelola utama koleksi item perpustakaan."""

    def __init__(self, nama_perpustakaan: str):
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi: list[LibraryItem] = []  # Private attribute

    def tambah_item(self, item: LibraryItem) -> None:
        """Menambahkan objek turunan LibraryItem ke dalam koleksi."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Objek harus merupakan turunan dari LibraryItem.")
        self.__koleksi.append(item)
        print(f"[+] Berhasil menambahkan: {item.judul} (ID: {item.id_item})")

    def tampilkan_katalog(self, hanya_tersedia: bool = False) -> None:
        """Menampilkan daftar seluruh item atau hanya item yang tersedia."""
        print("\n" + "=" * 85)
        judul_katalog = (
            f"KATALOG ITEM TERSEDIA - {self.nama_perpustakaan.upper()}"
            if hanya_tersedia
            else f"SELURUH KATALOG KOLEKSI - {self.nama_perpustakaan.upper()}"
        )
        print(judul_katalog)
        print("=" * 85)

        items = [
            item for item in self.__koleksi
            if not hanya_tersedia or not item.is_dipinjam
        ]

        if not items:
            print("Tidak ada item yang ditemukan dalam katalog.")
        else:
            for idx, item in enumerate(items, start=1):
                # Polymorphism: memanggil get_detail() sesuai tipe objek (Book/Magazine)
                print(f"{idx}. {item.get_detail()}")
        print("=" * 85)

    def cari_item(self, kata_kunci: str) -> list[LibraryItem]:
        """Mencari item berdasarkan kecocokan ID atau sebagian judul (case-insensitive)."""
        keyword = kata_kunci.lower()
        return [
            item for item in self.__koleksi
            if keyword in item.id_item.lower() or keyword in item.judul.lower()
        ]

    def proses_pinjam(self, id_item: str, member: Member) -> None:
        """Memproses peminjaman item oleh member."""
        hasil = [item for item in self.__koleksi if item.id_item.lower() == id_item.lower()]
        if not hasil:
            print(f"[!] Item dengan ID '{id_item}' tidak ditemukan.")
            return

        item = hasil[0]
        if item.is_dipinjam:
            print(f"[!] Maaf, '{item.judul}' sedang dipinjam.")
        else:
            item.is_dipinjam = True
            member.pinjam_item(item)
            print(f"[✓] '{item.judul}' berhasil dipinjam oleh {member.nama}.")