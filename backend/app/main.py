from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from .schemas import *
from .ml.vision_infer import run_vision
from .ml.text_struct_infer import infer_item_features
from .ml.optimizer import optimize as optimize_core


app = FastAPI(title="Boxxer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/vision", response_model=VisionResponse)
async def vision(room_image: UploadFile = File(...), note: str = Form(default="")):
    img_bytes = await room_image.read()
    dets = run_vision(img_bytes)
    return {"detected": dets}


@app.post("/optimize", response_model=OptimizationResult)
async def optimize_endpoint(payload: OptimizeRequest):
    enriched = []
    for it in payload.items:
        w = it.weight_kg
        v = it.volume_l
        f = it.fragile
        if (w <= 0) or (v <= 0) or (f is None):
            feat = infer_item_features(it.name, it.qty, it.fragile)
            w = w if w > 0 else feat["weight_kg"]
            v = v if v > 0 else feat["volume_l"]
            f = it.fragile if it.fragile is not None else feat["fragile"]
        enriched.append({
            "name": it.name,
            "qty": it.qty,
            "weight_kg": float(w),
            "volume_l": float(v),
            "fragile": bool(f),
        })
    result = optimize_core(enriched)
    return OptimizationResult(**result)
