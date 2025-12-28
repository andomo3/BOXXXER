from sentence_transformers import SentenceTransformer
import numpy as np
import xgboost as xgb
from pathlib import Path


_embedder = SentenceTransformer("all-MiniLM-L6-v2")
_weight_reg = None
_vol_reg = None


def _load_xgb():
    global _weight_reg, _vol_reg
    wpath = Path(__file__).with_name("weights").joinpath("weight_xgb.json")
    vpath = Path(__file__).with_name("weights").joinpath("volume_xgb.json")
    if wpath.exists():
        _weight_reg = xgb.XGBRegressor()
        _weight_reg.load_model(str(wpath))
    if vpath.exists():
        _vol_reg = xgb.XGBRegressor()
        _vol_reg.load_model(str(vpath))


_load_xgb()


def infer_item_features(name: str, qty: int, fragile: bool | None) -> dict:
    emb = _embedder.encode(name, normalize_embeddings=True)
    is_book = int("book" in name.lower())
    is_glass = int("glass" in name.lower() or "plate" in name.lower())
    base = np.concatenate([emb, [qty, is_book, is_glass]], axis=0).astype(np.float32)

    weight = float(_weight_reg.predict(base[None, :])[0]) if _weight_reg else (1.0 if is_book else 0.5)
    volume = float(_vol_reg.predict(base[None, :])[0]) if _vol_reg else (1.2 if is_book else 1.0)
    is_fragile = bool(fragile) if fragile is not None else bool(is_glass)

    return {"weight_kg": weight, "volume_l": volume, "fragile": is_fragile}


