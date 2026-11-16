"""
Modul data anggota perpustakaan.
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""


class Member:
    """Class untuk merepresentasikan anggota perpustakaan."""

    def __init__(self, id_member: str, nama: str):
        self.__id_member = id_member
        self.__nama = nama
        self.__daftar_pinjaman = []

    @property
    def id_member(self) -> str:
        return self.__id_member

    @property
    def nama(self) -> str:
        return self.__nama

    def pinjam_item(self, item) -> None:
        """Mencatat item yang dipinjam anggota."""
        self.__daftar_pinjaman.append(item)

    def kembalikan_item(self, item) -> None:
        """Menghapus item dari daftar pinjaman saat dikembalikan."""
        if item in self.__daftar_pinjaman:
            self.__daftar_pinjaman.remove(item)

    def get_info_member(self) -> str:
        """Menampilkan ringkasan profil dan jumlah pinjaman anggota."""
        return f"Member [{self.__id_member}] {self.__nama} - Meminjam {len(self.__daftar_pinjaman)} item"