"""
Modul definisi item perpustakaan menggunakan Abstract Class dan Inheritance.
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract base class untuk semua koleksi item di perpustakaan."""

    def __init__(self, id_item: str, judul: str, tahun_terbit: int):
        self._id_item = id_item          # Protected attribute
        self._judul = judul              # Protected attribute
        self._tahun_terbit = tahun_terbit
        self.__is_dipinjam = False       # Private attribute

    @property
    def id_item(self) -> str:
        """Getter untuk ID item."""
        return self._id_item

    @property
    def judul(self) -> str:
        """Getter untuk judul item."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Property decorator untuk mengecek status peminjaman item."""
        return self.__is_dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status: bool) -> None:
        """Setter untuk mengubah status peminjaman."""
        if not isinstance(status, bool):
            raise ValueError("Status peminjaman harus berupa boolean (True/False).")
        self.__is_dipinjam = status

    @abstractmethod
    def get_detail(self) -> str:
        """Method abstract untuk menampilkan informasi detail spesifik item."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Method abstract untuk menghitung denda keterlambatan."""
        pass


class Book(LibraryItem):
    """Subclass yang merepresentasikan koleksi Buku."""

    def __init__(self, id_item: str, judul: str, tahun_terbit: int, penulis: str, isbn: str):
        super().__init__(id_item, judul, tahun_terbit)
        self.penulis = penulis
        self.isbn = isbn

    def get_detail(self) -> str:
        """Implementasi polymorphism untuk detail buku."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[BUKU] ID: {self.id_item} | Judul: {self.judul} ({self._tahun_terbit}) | "
            f"Penulis: {self.penulis} | ISBN: {self.isbn} | Status: {status}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda buku Rp 2.000 per hari keterlambatan."""
        return max(0, hari_terlambat * 2000)


class Magazine(LibraryItem):
    """Subclass yang merepresentasikan koleksi Majalah."""

    def __init__(self, id_item: str, judul: str, tahun_terbit: int, edisi: str, penerbit: str):
        super().__init__(id_item, judul, tahun_terbit)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self) -> str:
        """Implementasi polymorphism untuk detail majalah."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[MAJALAH] ID: {self.id_item} | Judul: {self.judul} ({self._tahun_terbit}) | "
            f"Edisi: {self.edisi} | Penerbit: {self.penerbit} | Status: {status}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda majalah Rp 1.000 per hari keterlambatan."""
        return max(0, hari_terlambat * 1000)