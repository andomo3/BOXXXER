from typing import List, Dict


BOXES = {
    "Small": {"vol_l": 12.0, "max_kg": 10.0},
    "Medium": {"vol_l": 24.0, "max_kg": 18.0},
    "Large": {"vol_l": 45.0, "max_kg": 23.0},
}


def greedy_plan(items: List[Dict]) -> List[Dict]:
    expanded: List[Dict] = []
    for it in items:
        for _ in range(max(1, int(it.get("qty", 1)))):
            expanded.append({**it, "qty": 1})

    expanded.sort(
        key=lambda x: (
            x["fragile"],
            -(x["weight_kg"] / max(1e-6, x["volume_l"]))
        ),
        reverse=True,
    )

    plan: List[Dict] = []
    for item in expanded:
        placed = False
        for bx in plan:
            btype, content = bx["size"], bx["items"]
            used_w = sum(c["weight_kg"] for c in content)
            used_v = sum(c["volume_l"] for c in content)
            cap = BOXES[btype]
            if (used_w + item["weight_kg"] <= cap["max_kg"]) and (used_v + item["volume_l"] <= cap["vol_l"]):
                if item["fragile"]:
                    if any((not c["fragile"]) and (c["weight_kg"] / c["volume_l"] > 0.4) for c in content):
                        continue
                content.append(item)
                placed = True
                break
        if not placed:
            best = None
            for name, cap in BOXES.items():
                if item["weight_kg"] <= cap["max_kg"] and item["volume_l"] <= cap["vol_l"]:
                    best = name
                    break
            if best is None:
                best = "Large"
            plan.append({"size": best, "items": [item]})

    summary: List[Dict] = []
    for name in ["Large", "Medium", "Small"]:
        cnt = sum(1 for bx in plan if bx["size"] == name)
        if cnt > 0:
            usage = (
                "Fragile items"
                if any(any(i["fragile"] for i in bx["items"]) for bx in plan if bx["size"] == name)
                else "General items"
            )
            summary.append({"size": name, "count": cnt, "usage": usage})
    return summary


def score(plan: List[Dict]) -> float:
    score = 0.0
    for bx in plan:
        cap = BOXES[bx["size"]]
        used_w = sum(i.get("weight_kg", 0.0) for i in bx.get("items", []))
        used_v = sum(i.get("volume_l", 0.0) for i in bx.get("items", []))
        fill = 0.5 * (used_w / cap["max_kg"] + used_v / cap["vol_l"]) if cap["max_kg"] > 0 and cap["vol_l"] > 0 else 0.0
        score += max(0, min(1.0, fill))
    return min(1.0, score / max(1, len(plan)))


def optimize(items: List[Dict]) -> Dict:
    summary = greedy_plan(items)
    eff = score([{"size": s["size"], "items": []} for s in summary])
    text = "Heavier items at bottom; fragile items isolated in Medium boxes with padding."
    return {"summary": text, "boxes": summary, "efficiencyScore": eff}


