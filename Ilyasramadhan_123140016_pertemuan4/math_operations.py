"""
Modul Operasi Matematika Geometri & Konversi Suhu
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""

# Konstanta
PI = 3.14159


# --- 1. Fungsi Perhitungan Geometri ---

def luas_persegi(sisi: float) -> float:
    """Menghitung luas persegi (sisi x sisi)."""
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Menghitung keliling persegi (4 x sisi)."""
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung luas persegi panjang (panjang x lebar)."""
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung keliling persegi panjang (2 x (panjang + lebar))."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """Menghitung luas lingkaran (PI x r^2)."""
    return PI * (jari_jari ** 2)


def keliling_lingkaran(jari_jari: float) -> float:
    """Menghitung keliling lingkaran (2 x PI x r)."""
    return 2 * PI * jari_jari


# --- 2. Fungsi Konversi Temperatur Suhu ---

def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi temperatur dari Celsius ke Fahrenheit."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi temperatur dari Celsius ke Kelvin."""
    return celsius + 273.15