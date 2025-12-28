from pydantic import BaseModel, Field
from typing import List, Optional


class Item(BaseModel):
    name: str
    qty: int = 1
    weight_kg: float = 0.0
    volume_l: float = 0.0
    fragile: bool = False
    category: Optional[str] = None


class OptimizeRequest(BaseModel):
    note: Optional[str] = None
    items: List[Item] = Field(default_factory=list)


class BoxPlan(BaseModel):
    size: str
    count: int
    usage: str


class OptimizationResult(BaseModel):
    summary: str
    boxes: List[BoxPlan]
    efficiencyScore: float


class VisionDetection(BaseModel):
    name: str
    conf: float
    bbox: list[float]  # [x1,y1,x2,y2]
    est_weight_kg: float = 0.0
    est_volume_l: float = 0.0
    fragile: bool = False


class VisionRequest(BaseModel):
    note: Optional[str] = None


class VisionResponse(BaseModel):
    detected: List[VisionDetection]


