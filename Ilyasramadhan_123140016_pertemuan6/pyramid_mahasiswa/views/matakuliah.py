import transaction
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models.matakuliah import Matakuliah
from ..models.meta import DBSession


def _serialize(mk):
    return {
        "id": mk.id,
        "kode_mk": mk.kode_mk,
        "nama_mk": mk.nama_mk,
        "sks": mk.sks,
        "semester": mk.semester,
    }


def _parse_id(request):
    raw_id = request.matchdict.get("id")
    try:
        return int(raw_id)
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "ID mata kuliah harus berupa angka."})


def _parse_json_body(request):
    try:
        data = request.json_body
    except ValueError:
        raise HTTPBadRequest(json_body={"error": "Body request harus berupa JSON valid."})
    if not isinstance(data, dict):
        raise HTTPBadRequest(json_body={"error": "Payload JSON harus berupa objek."})
    return data


@view_config(route_name="get_matakuliah_list", renderer="json")
def get_matakuliah_list(request):
    items = DBSession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    request.response.status = 200
    return {"data": [_serialize(mk) for mk in items]}


@view_config(route_name="get_matakuliah_detail", renderer="json")
def get_matakuliah_detail(request):
    mk_id = _parse_id(request)
    mk = DBSession.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
    if mk is None:
        raise HTTPNotFound(json_body={"error": f"Mata kuliah dengan id={mk_id} tidak ditemukan."})
    request.response.status = 200
    return {"data": _serialize(mk)}


@view_config(route_name="create_matakuliah", renderer="json")
def create_matakuliah(request):
    data = _parse_json_body(request)
    kode_mk = (data.get("kode_mk") or "").strip()
    nama_mk = (data.get("nama_mk") or "").strip()
    sks = data.get("sks")
    semester = data.get("semester")

    if not kode_mk or not nama_mk or sks is None or semester is None:
        raise HTTPBadRequest(
            json_body={"error": "Field kode_mk, nama_mk, sks, dan semester wajib diisi."}
        )

    try:
        sks_int = int(sks)
        semester_int = int(semester)
    except (TypeError, ValueError):
        raise HTTPBadRequest(json_body={"error": "Field sks dan semester harus berupa angka."})

    mk = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=nama_mk,
        sks=sks_int,
        semester=semester_int,
    )
    try:
        with transaction.manager:
            DBSession.add(mk)
            DBSession.flush()
            result = _serialize(mk)
    except IntegrityError:
        raise HTTPBadRequest(json_body={"error": f"Kode mata kuliah '{kode_mk}' sudah terdaftar."})

    request.response.status = 201
    return {"message": "Mata kuliah berhasil ditambahkan.", "data": result}


@view_config(route_name="update_matakuliah", renderer="json")
def update_matakuliah(request):
    mk_id = _parse_id(request)
    data = _parse_json_body(request)

    mk = DBSession.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
    if mk is None:
        raise HTTPNotFound(json_body={"error": f"Mata kuliah dengan id={mk_id} tidak ditemukan."})

    if "kode_mk" in data and data["kode_mk"] is not None:
        kode_mk = str(data["kode_mk"]).strip()
        if not kode_mk:
            raise HTTPBadRequest(json_body={"error": "Field kode_mk tidak boleh kosong."})
        mk.kode_mk = kode_mk

    if "nama_mk" in data and data["nama_mk"] is not None:
        nama_mk = str(data["nama_mk"]).strip()
        if not nama_mk:
            raise HTTPBadRequest(json_body={"error": "Field nama_mk tidak boleh kosong."})
        mk.nama_mk = nama_mk

    if "sks" in data and data["sks"] is not None:
        try:
            mk.sks = int(data["sks"])
        except (TypeError, ValueError):
            raise HTTPBadRequest(json_body={"error": "Field sks harus berupa angka."})

    if "semester" in data and data["semester"] is not None:
        try:
            mk.semester = int(data["semester"])
        except (TypeError, ValueError):
            raise HTTPBadRequest(json_body={"error": "Field semester harus berupa angka."})

    try:
        with transaction.manager:
            DBSession.add(mk)
            DBSession.flush()
            result = _serialize(mk)
    except IntegrityError:
        raise HTTPBadRequest(json_body={"error": "Kode mata kuliah duplikat."})

    request.response.status = 200
    return {"message": "Mata kuliah berhasil diperbarui.", "data": result}


@view_config(route_name="delete_matakuliah", renderer="json")
def delete_matakuliah(request):
    mk_id = _parse_id(request)
    mk = DBSession.query(Matakuliah).filter(Matakuliah.id == mk_id).first()
    if mk is None:
        raise HTTPNotFound(json_body={"error": f"Mata kuliah dengan id={mk_id} tidak ditemukan."})

    with transaction.manager:
        DBSession.delete(mk)

    request.response.status = 200
    return {"message": f"Mata kuliah dengan id={mk_id} berhasil dihapus."}