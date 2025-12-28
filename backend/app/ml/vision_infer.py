from typing import Any
try:
    import onnxruntime as ort  # type: ignore
except Exception:  # pragma: no cover
    ort = None  # type: ignore
try:
    import numpy as np  # type: ignore
except Exception:  # pragma: no cover
    np = None  # type: ignore
try:
    import cv2  # type: ignore
except Exception:  # pragma: no cover
    cv2 = None  # type: ignore
from pathlib import Path
from .featurizer import category_rules


def _load_labels() -> list[str]:
    labels_path = Path(__file__).with_name("weights").joinpath("room_labels.txt")
    if labels_path.exists():
        return [l.strip() for l in labels_path.read_text().splitlines() if l.strip()]
    return []


LABELS = _load_labels()


class VisionModel:
    def __init__(self, model_path: str):
        if ort is None:
            raise ImportError(
                "onnxruntime is not installed. Install it (e.g., pip install onnxruntime or onnxruntime-directml on Windows)"
            )
        if np is None:
            raise ImportError(
                "numpy is not installed. Install it (e.g., pip install numpy==1.26.4)"
            )
        if cv2 is None:
            raise ImportError(
                "opencv-python-headless is not installed. Install it (e.g., pip install opencv-python-headless)"
            )
        providers = ["CPUExecutionProvider"]
        self.sess = ort.InferenceSession(model_path, providers=providers)
        in0 = self.sess.get_inputs()[0]
        self.input_name = in0.name
        self.input_shape = in0.shape
        self.img_h, self.img_w = self.input_shape[-2], self.input_shape[-1]

    def _pre(self, img_bgr: Any) -> Any:
        if cv2 is None:
            raise ImportError(
                "opencv-python-headless is not installed. Install it (e.g., pip install opencv-python-headless)"
            )
        if np is None:
            raise ImportError(
                "numpy is not installed. Install it (e.g., pip install numpy==1.26.4)"
            )
        assert np is not None
        img = cv2.resize(img_bgr, (self.img_w, self.img_h))
        img = img[:, :, ::-1].astype(np.float32) / 255.0
        img = np.transpose(img, (2, 0, 1))[None, ...]
        return img

    def _post(self, raw: Any) -> list[dict]:
        preds = raw[0]
        dets: list[dict] = []
        for row in preds[0]:
            obj = float(row[4])
            if np is None:
                raise ImportError(
                    "numpy is not installed. Install it (e.g., pip install numpy==1.26.4)"
                )
            assert np is not None
            cls_id = int(np.argmax(row[5:]))
            conf = obj * float(row[5 + cls_id])
            if conf < 0.35:
                continue
            x, y, w, h = row[:4]
            name = LABELS[cls_id] if 0 <= cls_id < len(LABELS) else f"cls_{cls_id}"
            props = category_rules(name)
            dets.append(
                {
                    "name": name,
                    "conf": conf,
                    "bbox": [float(x), float(y), float(x + w), float(y + h)],
                    "est_weight_kg": props["est_weight_kg"],
                    "est_volume_l": props["est_volume_l"],
                    "fragile": props["fragile"],
                }
            )
        return dets

    def infer(self, img_bgr: Any) -> list[dict]:
        x = self._pre(img_bgr)
        out = self.sess.run(None, {self.input_name: x})
        return self._post(out)


_model = None


def get_vision_model():
    global _model
    if _model is None:
        mp = Path(__file__).with_name("weights").joinpath("yolo_room.onnx")
        _model = VisionModel(str(mp))
    return _model


def run_vision(img_bytes: bytes) -> list[dict]:
    if np is None:
        raise ImportError("numpy is not installed. Install it (e.g., pip install numpy==1.26.4)")
    if cv2 is None:
        raise ImportError("opencv-python-headless is not installed. Install it (e.g., pip install opencv-python-headless)")
    arr = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    return get_vision_model().infer(img)


