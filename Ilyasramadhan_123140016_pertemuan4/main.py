"""
Program Utama Pemanggil Modul math_operations
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""

# Cara Impor 1: Impor seluruh modul
import math_operations

# Cara Impor 2: Impor fungsi dan konstanta spesifik
from math_operations import (
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
    PI
)


def main():
    print("=" * 55)
    print("        PENGUJIAN MODUL OPERASI MATEMATIKA        ")
    print("=" * 55)

    print(f"[Konstanta] Nilai PI = {PI}")
    print("-" * 55)

    # 1. Geometri Persegi (menggunakan import math_operations)
    sisi = 6.0
    print("[1] Geometri Persegi (Sisi = 6.0)")
    print(f"    - Luas     : {math_operations.luas_persegi(sisi):.2f}")
    print(f"    - Keliling : {math_operations.keliling_persegi(sisi):.2f}")

    # 2. Geometri Persegi Panjang (menggunakan import math_operations)
    p, l = 8.0, 4.0
    print("\n[2] Geometri Persegi Panjang (P = 8.0, L = 4.0)")
    print(f"    - Luas     : {math_operations.luas_persegi_panjang(p, l):.2f}")
    print(f"    - Keliling : {math_operations.keliling_persegi_panjang(p, l):.2f}")

    # 3. Geometri Lingkaran (menggunakan from math_operations import ...)
    r = 7.0
    print(f"\n[3] Geometri Lingkaran (Jari-jari = {r})")
    print(f"    - Luas     : {luas_lingkaran(r):.2f}")
    print(f"    - Keliling : {keliling_lingkaran(r):.2f}")

    # 4. Konversi Temperatur Suhu
    celsius = 30.0
    print(f"\n[4] Konversi Temperatur Suhu ({celsius:.1f} °C)")
    print(f"    - Fahrenheit : {celsius_ke_fahrenheit(celsius):.2f} °F")
    print(f"    - Kelvin     : {celsius_ke_kelvin(celsius):.2f} K")
    print("=" * 55)


if __name__ == "__main__":
    main()