import sys
import transaction
from pyramid.paster import bootstrap, setup_logging
from pyramid_mahasiswa.models import Matakuliah


def main(argv=sys.argv):
    if len(argv) < 2:
        print(f"Penggunaan: {argv[0]} <config_uri> (contoh: initialize_db development.ini)")
        sys.exit(1)

    config_uri = argv[1]
    setup_logging(config_uri)
    env = bootstrap(config_uri)

    data_awal = [
        {"kode_mk": "IF2110", "nama_mk": "Pengembangan Aplikasi Web", "sks": 3, "semester": 5},
        {"kode_mk": "IF3140", "nama_mk": "Basis Data", "sks": 4, "semester": 3},
        {"kode_mk": "IF4041", "nama_mk": "Pengolahan Citra Digital", "sks": 3, "semester": 5},
    ]

    try:
        with transaction.manager:
            dbsession = env["request"].dbsession
            for item in data_awal:
                ada = dbsession.query(Matakuliah).filter_by(kode_mk=item["kode_mk"]).first()
                if not ada:
                    dbsession.add(
                        Matakuliah(
                            kode_mk=item["kode_mk"],
                            nama_mk=item["nama_mk"],
                            sks=item["sks"],
                            semester=item["semester"],
                        )
                    )
        print("Seeding data mata kuliah berhasil.")
    finally:
        env["closer"]()


if __name__ == "__main__":
    main()