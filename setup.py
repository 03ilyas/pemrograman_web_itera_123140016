from setuptools import find_packages, setup

requires = [
    "pyramid",
    "pyramid_tm",
    "sqlalchemy",
    "zope.sqlalchemy",
    "alembic",
    "psycopg2-binary",
    "waitress",
]

setup(
    name="pyramid_mahasiswa",
    version="0.1",
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires,
    entry_points={
        "paste.app_factory": [
            "main = pyramid_mahasiswa:main",
        ],
        "console_scripts": [
            "initialize_db = scripts.initialize_db:main",
        ],
    },
)