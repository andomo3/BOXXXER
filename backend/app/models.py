from typing import List

from pydantic import BaseModel, Field


class Item(BaseModel):
    name: str
    weight: float = 0.0
    fragile: bool = False
    volume: float = 0.0


class BoxPlan(BaseModel):
    size: str
    count: int
    usage: str


class OptimizationResult(BaseModel):
    summary: str
    boxes: List[BoxPlan]
    efficiencyScore: float = Field(..., ge=0.0, le=1.0)


