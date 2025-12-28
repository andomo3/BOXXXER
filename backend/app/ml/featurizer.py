def category_rules(name: str):
    name = name.lower()
    if "book" in name:
        return {"est_weight_kg": 1.0, "est_volume_l": 1.2, "fragile": False}
    if "glass" in name or "plate" in name or "vase" in name:
        return {"est_weight_kg": 0.5, "est_volume_l": 0.8, "fragile": True}
    if "clothes" in name or "shirt" in name:
        return {"est_weight_kg": 0.3, "est_volume_l": 3.0, "fragile": False}
    return {"est_weight_kg": 0.7, "est_volume_l": 1.5, "fragile": False}


