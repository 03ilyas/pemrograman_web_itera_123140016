"""
Program Penghitung BMI (Body Mass Index) Sederhana
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""


def hitung_bmi(berat: float, tinggi: float) -> float:
    """Menghitung nilai BMI berdasarkan berat (kg) dan tinggi (m)."""
    return berat / (tinggi * tinggi)


def tentukan_kategori_bmi(bmi: float) -> str:
    """Menentukan kategori status berat badan berdasarkan nilai BMI."""
    if bmi < 18.5:
        return "Berat badan kurang"
    elif 18.5 <= bmi < 25.0:
        return "Berat badan normal"
    elif 25.0 <= bmi < 30.0:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    print("=" * 45)
    print("      PROGRAM PENGHITUNG BMI SEDERHANA       ")
    print("=" * 45)

    try:
        berat = float(input("Masukkan berat badan (kg) : "))
        tinggi = float(input("Masukkan tinggi badan (m)  : "))

        if berat <= 0 or tinggi <= 0:
            print("[Error] Berat dan tinggi badan harus bernilai positif!")
            return

        nilai_bmi = hitung_bmi(berat, tinggi)
        kategori = tentukan_kategori_bmi(nilai_bmi)

        print("-" * 45)
        print(f"Nilai BMI Anda : {nilai_bmi:.2f}")
        print(f"Kategori       : {kategori}")
        print("=" * 45)

    except ValueError:
        print("[Error] Masukkan data berupa angka yang valid!")


if __name__ == "__main__":
    main()