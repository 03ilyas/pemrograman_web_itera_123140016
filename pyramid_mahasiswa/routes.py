def includeme(config):
    config.add_route("get_matakuliah_list", "/api/matakuliah", request_method="GET")
    config.add_route("create_matakuliah", "/api/matakuliah", request_method="POST")
    config.add_route("get_matakuliah_detail", "/api/matakuliah/{id}", request_method="GET")
    config.add_route("update_matakuliah", "/api/matakuliah/{id}", request_method="PUT")
    config.add_route("delete_matakuliah", "/api/matakuliah/{id}", request_method="DELETE")