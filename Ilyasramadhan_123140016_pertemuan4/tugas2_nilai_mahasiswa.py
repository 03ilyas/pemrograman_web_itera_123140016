"""
Program Pengelolaan Data Nilai Mahasiswa
Nama : Ilyas Ramadhan
NIM  : 123140016
Kelas: RB
"""


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """Menghitung nilai akhir dengan bobot 30% UTS + 40% UAS + 30% Tugas."""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """Menentukan grade A-E berdasarkan interval nilai akhir."""
    if nilai_akhir >= 80:
        return "A"
    elif 70 <= nilai_akhir < 80:
        return "B"
    elif 60 <= nilai_akhir < 70:
        return "C"
    elif 50 <= nilai_akhir < 60:
        return "D"
    else:
        return "E"


def main():
    daftar_mahasiswa = [
        {"nama": "Ilyas Ramadhan", "nim": "123140016", "nilai_uts": 88, "nilai_uas": 92, "nilai_tugas": 85},
        {"nama": "Rizky Patriawan", "nim": "123140017", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 80},
        {"nama": "Ahmad Mulia", "nim": "123140018", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 72},
        {"nama": "Taufiqur Rahman", "nim": "123140019", "nilai_uts": 55, "nilai_uas": 58, "nilai_tugas": 60},
        {"nama": "Budi Santoso", "nim": "123140020", "nilai_uts": 45, "nilai_uas": 40, "nilai_tugas": 50},
    ]

    for mhs in daftar_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        mhs["nilai_akhir"] = nilai_akhir
        mhs["grade"] = tentukan_grade(nilai_akhir)

    print("=" * 68)
    print("                    DAFTAR NILAI AKHIR MAHASISWA                    ")
    print("=" * 68)
    print(f"{'No':<4} | {'NIM':<10} | {'Nama Mahasiswa':<18} | {'Nilai Akhir':<11} | {'Grade':<5}")
    print("-" * 68)

    for idx, mhs in enumerate(daftar_mahasiswa, start=1):
        print(f"{idx:<4} | {mhs['nim']:<10} | {mhs['nama']:<18} | {mhs['nilai_akhir']:<11.2f} | {mhs['grade']:<5}")
    print("=" * 68)

    tertinggi = max(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])
    terendah = min(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])

    print("\nInformasi Ekstrem Nilai Akhir:")
    print(f"- Nilai Tertinggi : {tertinggi['nama']} ({tertinggi['nim']}) - {tertinggi['nilai_akhir']:.2f} [{tertinggi['grade']}]")
    print(f"- Nilai Terendah  : {terendah['nama']} ({terendah['nim']}) - {terendah['nilai_akhir']:.2f} [{terendah['grade']}]")
    print("-" * 68)


if __name__ == "__main__":
    main()