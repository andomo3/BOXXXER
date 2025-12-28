from typing import List

from ..models import Item, BoxPlan, OptimizationResult


def _classify_box_size(volume: float) -> str:
    if volume <= 10:
        return "Small"
    if volume <= 30:
        return "Medium"
    return "Large"


def compute_mock_plan(items: List[Item], note: str = "") -> OptimizationResult:
    if not items:
        boxes = [
            BoxPlan(size="Medium", count=2, usage="General items"),
            BoxPlan(size="Small", count=2, usage="Books and dense items"),
        ]
        return OptimizationResult(
            summary="No items provided; suggested a basic moving kit.",
            boxes=boxes,
            efficiencyScore=0.75,
        )

    fragile_count = sum(1 for i in items if i.fragile)
    heavy_count = sum(1 for i in items if i.weight >= 5.0)
    total_volume = sum(i.volume for i in items)

    # Simple rule-based allocation
    boxes: List[BoxPlan] = []
    if fragile_count:
        boxes.append(
            BoxPlan(size="Medium", count=max(1, fragile_count // 3 + (1 if fragile_count % 3 else 0)), usage="Fragile items with padding")
        )
    if heavy_count:
        boxes.append(
            BoxPlan(size="Small", count=max(1, heavy_count // 4 + (1 if heavy_count % 4 else 0)), usage="Heavy/dense items at bottom")
        )

    # Remaining by volume
    remaining_volume = max(0.0, total_volume - fragile_count * 8 - heavy_count * 5)
    if remaining_volume:
        size = _classify_box_size(remaining_volume / 3 if remaining_volume > 0 else 0)
        boxes.append(BoxPlan(size=size, count=max(1, int(remaining_volume // 20) + 1), usage="Clothes and misc"))

    efficiency = min(0.95, 0.6 + (0.1 if not fragile_count else 0) + (0.1 if heavy_count < len(items) / 2 else 0))

    summary_parts = [
        "Place heavy items at the bottom.",
        "Separate fragile items into padded medium boxes." if fragile_count else "",
        "Fill gaps with soft items for cushioning.",
    ]
    summary = " ".join(s for s in summary_parts if s)
    if note:
        summary += f" Note: {note.strip()}"

    return OptimizationResult(summary=summary, boxes=boxes or [BoxPlan(size="Medium", count=1, usage="General items")], efficiencyScore=efficiency)


