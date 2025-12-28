export type ItemInput = {
  name: string;
  qty: number;
  weight_kg: number;
  volume_l: number;
  fragile: boolean;
};

export type BoxPlan = { size: string; count: number; usage: string };

export type PackedItem = {
  name: string;
  qty: number;
  fragile: boolean;
  weight_kg: number;
  volume_l: number;
  dimensions_cm: { length: number; width: number; height: number };
};

export type BoxDetail = {
  id: string;
  size: "Small" | "Medium" | "Large";
  usage: string;
  items: PackedItem[];
  packingOrder: string[];
};

export type OptimizeOutput = {
  summary: string;
  boxes: BoxPlan[];
  boxDetails: BoxDetail[];
  efficiencyScore: number;
};

const BOXES = {
  small: { volume: 12, weight: 10, usage: "Books and dense items" },
  medium: { volume: 24, weight: 18, usage: "Fragile items with padding" },
  large: { volume: 45, weight: 23, usage: "Bulky, lightweight items" },
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function boxCount(volume: number, weight: number, capacity: { volume: number; weight: number }) {
  if (volume <= 0 && weight <= 0) return 0;
  return Math.max(Math.ceil(volume / capacity.volume), Math.ceil(weight / capacity.weight));
}

function classifyItem(item: ItemInput) {
  if (item.fragile) return "medium";
  if (item.weight_kg >= 8 || item.volume_l >= 20) return "large";
  if (item.weight_kg >= 4 || item.volume_l >= 10) return "medium";
  return "small";
}

function estimateDimensions(volume_l: number) {
  const volumeCm3 = Math.max(0.1, volume_l) * 1000;
  const base = Math.cbrt(volumeCm3);
  const length = base * 1.2;
  const width = base;
  const height = base * 0.8;
  const round = (v: number) => Math.round(v * 10) / 10;
  return { length: round(length), width: round(width), height: round(height) };
}

function buildBoxDetails(items: ItemInput[], counts: { small: number; medium: number; large: number }) {
  const boxGroups: Record<"small" | "medium" | "large", BoxDetail[]> = {
    small: [],
    medium: [],
    large: [],
  };

  (["small", "medium", "large"] as const).forEach((sizeKey) => {
    const total = counts[sizeKey];
    for (let i = 0; i < total; i += 1) {
      boxGroups[sizeKey].push({
        id: `${sizeKey}-${i + 1}`,
        size: sizeKey === "small" ? "Small" : sizeKey === "medium" ? "Medium" : "Large",
        usage: BOXES[sizeKey].usage,
        items: [],
        packingOrder: [],
      });
    }
  });

  const unitItems = items.flatMap((item) => {
    const qty = Math.max(0, item.qty || 0);
    return Array.from({ length: qty }).map(() => ({
      ...item,
      dimensions_cm: estimateDimensions(item.volume_l || 0.1),
    }));
  });

  const grouped = unitItems.reduce<Record<"small" | "medium" | "large", PackedItem[]>>(
    (acc, item) => {
      const size = classifyItem(item as ItemInput);
      acc[size].push({
        name: item.name,
        qty: 1,
        fragile: item.fragile,
        weight_kg: item.weight_kg,
        volume_l: item.volume_l,
        dimensions_cm: item.dimensions_cm,
      });
      return acc;
    },
    { small: [], medium: [], large: [] }
  );

  (["small", "medium", "large"] as const).forEach((sizeKey) => {
    const boxes = boxGroups[sizeKey];
    if (boxes.length === 0) return;
    const itemsForSize = grouped[sizeKey];
    itemsForSize.forEach((item, index) => {
      const box = boxes[index % boxes.length];
      const existing = box.items.find((i) => i.name === item.name && i.fragile === item.fragile);
      if (existing) {
        existing.qty += 1;
      } else {
        box.items.push({ ...item });
      }
    });

    boxes.forEach((box) => {
      const ordered = [...box.items].sort((a, b) => {
        if (a.fragile !== b.fragile) return a.fragile ? 1 : -1;
        return b.weight_kg - a.weight_kg;
      });
      box.packingOrder = ordered.map((i) => `${i.name} x${i.qty}`);
    });
  });

  return [...boxGroups.small, ...boxGroups.medium, ...boxGroups.large];
}

export function optimizePacking(items: ItemInput[], note?: string): OptimizeOutput {
  const buckets = {
    small: { volume: 0, weight: 0 },
    medium: { volume: 0, weight: 0 },
    large: { volume: 0, weight: 0 },
  };

  let totalItems = 0;
  let totalVolume = 0;
  let totalWeight = 0;

  for (const item of items) {
    const qty = Math.max(0, item.qty || 0);
    const volume = Math.max(0, item.volume_l || 0) * qty;
    const weight = Math.max(0, item.weight_kg || 0) * qty;
    const size = classifyItem(item);

    buckets[size].volume += volume;
    buckets[size].weight += weight;
    totalItems += qty;
    totalVolume += volume;
    totalWeight += weight;
  }

  const smallCount = boxCount(buckets.small.volume, buckets.small.weight, BOXES.small);
  const mediumCount = boxCount(buckets.medium.volume, buckets.medium.weight, BOXES.medium);
  const largeCount = boxCount(buckets.large.volume, buckets.large.weight, BOXES.large);

  const boxes: BoxPlan[] = [];
  if (smallCount > 0) boxes.push({ size: "Small", count: smallCount, usage: BOXES.small.usage });
  if (mediumCount > 0) boxes.push({ size: "Medium", count: mediumCount, usage: BOXES.medium.usage });
  if (largeCount > 0) boxes.push({ size: "Large", count: largeCount, usage: BOXES.large.usage });

  const boxDetails = buildBoxDetails(items, {
    small: smallCount,
    medium: mediumCount,
    large: largeCount,
  });

  const totalBoxes = smallCount + mediumCount + largeCount;
  const totalCapacityVolume = smallCount * BOXES.small.volume + mediumCount * BOXES.medium.volume + largeCount * BOXES.large.volume;
  const totalCapacityWeight = smallCount * BOXES.small.weight + mediumCount * BOXES.medium.weight + largeCount * BOXES.large.weight;

  const volumeUtil = totalCapacityVolume > 0 ? totalVolume / totalCapacityVolume : 0;
  const weightUtil = totalCapacityWeight > 0 ? totalWeight / totalCapacityWeight : 0;
  const efficiencyScore = clamp((volumeUtil + weightUtil) / 2, 0, 1);

  const sizeParts = [];
  if (smallCount > 0) sizeParts.push(`${smallCount} small`);
  if (mediumCount > 0) sizeParts.push(`${mediumCount} medium`);
  if (largeCount > 0) sizeParts.push(`${largeCount} large`);
  const sizeSummary = sizeParts.length > 0 ? ` (${sizeParts.join(", ")})` : "";
  const summaryBase = `Packed ${totalItems} item${totalItems === 1 ? "" : "s"} into ${totalBoxes} box${totalBoxes === 1 ? "" : "es"}${sizeSummary}.`;
  const summary = note ? `${summaryBase} Note: ${note}` : summaryBase;

  return { summary, boxes, boxDetails, efficiencyScore };
}
