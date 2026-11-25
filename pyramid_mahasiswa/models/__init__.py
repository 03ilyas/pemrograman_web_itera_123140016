from sqlalchemy import engine_from_config

from .matakuliah import Matakuliah  # noqa: F401
from .meta import Base, DBSession  # noqa: F401


def includeme(config):
    settings = config.get_settings()
    engine = engine_from_config(settings, "sqlalchemy.")
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config.add_request_method(lambda request: DBSession, "dbsession", reify=True)
