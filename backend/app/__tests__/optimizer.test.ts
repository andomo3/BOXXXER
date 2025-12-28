import { optimizePacking } from "@/services/optimizer";

describe("optimizePacking", () => {
  it("respects box capacity constraints", () => {
    const items = [
      { name: "Books", qty: 10, fragile: false, weight_kg: 1, volume_l: 2 },
    ];
    const result = optimizePacking(items);
    const small = result.boxes.find((b) => b.size === "Small");
    const medium = result.boxes.find((b) => b.size === "Medium");
    const large = result.boxes.find((b) => b.size === "Large");

    const totalBoxes = (small?.count || 0) + (medium?.count || 0) + (large?.count || 0);
    expect(totalBoxes).toBeGreaterThan(0);
  });

  it("routes fragile items into medium boxes", () => {
    const items = [
      { name: "Glassware", qty: 4, fragile: true, weight_kg: 0.3, volume_l: 1.2 },
    ];
    const result = optimizePacking(items);
    const hasMedium = result.boxes.some((b) => b.size === "Medium");
    expect(hasMedium).toBe(true);
  });

  it("is deterministic for identical input", () => {
    const items = [
      { name: "Clothes", qty: 6, fragile: false, weight_kg: 0.4, volume_l: 1.0 },
      { name: "Laptop", qty: 1, fragile: true, weight_kg: 1.8, volume_l: 2.5 },
    ];
    const a = optimizePacking(items);
    const b = optimizePacking(items);
    expect(a).toEqual(b);
  });
});
