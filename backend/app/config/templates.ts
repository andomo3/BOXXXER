import type { ItemInput } from "@/services/optimizer";

type RoomTemplate = {
  id: string;
  title: string;
  description: string;
  items: ItemInput[];
};

export const ROOM_TEMPLATES: RoomTemplate[] = [
  {
    id: "bedroom",
    title: "Bedroom",
    description: "Clothes, books, electronics",
    items: [
      { name: "T-shirts", qty: 12, fragile: false, weight_kg: 0.2, volume_l: 1.0 },
      { name: "Jeans", qty: 6, fragile: false, weight_kg: 0.6, volume_l: 1.2 },
      { name: "Books", qty: 8, fragile: false, weight_kg: 0.7, volume_l: 0.9 },
      { name: "Laptop", qty: 1, fragile: true, weight_kg: 1.6, volume_l: 2.5 },
      { name: "Shoes", qty: 3, fragile: false, weight_kg: 0.9, volume_l: 3.0 },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Fragile, heavy cookware and glass",
    items: [
      { name: "Plates", qty: 10, fragile: true, weight_kg: 0.4, volume_l: 0.6 },
      { name: "Glasses", qty: 8, fragile: true, weight_kg: 0.2, volume_l: 0.4 },
      { name: "Pots & pans", qty: 4, fragile: false, weight_kg: 2.0, volume_l: 3.0 },
      { name: "Cutlery set", qty: 1, fragile: false, weight_kg: 1.2, volume_l: 1.0 },
      { name: "Small appliances", qty: 2, fragile: true, weight_kg: 3.0, volume_l: 6.0 },
    ],
  },
  {
    id: "office",
    title: "Office",
    description: "Desk gear and paper files",
    items: [
      { name: "Monitor", qty: 1, fragile: true, weight_kg: 4.5, volume_l: 18.0 },
      { name: "Keyboard & mouse", qty: 1, fragile: false, weight_kg: 0.8, volume_l: 2.0 },
      { name: "Books & binders", qty: 6, fragile: false, weight_kg: 1.0, volume_l: 1.2 },
      { name: "Desk lamp", qty: 1, fragile: true, weight_kg: 1.4, volume_l: 3.0 },
      { name: "Cables & chargers", qty: 1, fragile: false, weight_kg: 0.5, volume_l: 1.0 },
    ],
  },
  {
    id: "dorm_move",
    title: "Dorm Move",
    description: "Compact student essentials",
    items: [
      { name: "Bedding set", qty: 1, fragile: false, weight_kg: 2.0, volume_l: 12.0 },
      { name: "Hoodies & jackets", qty: 4, fragile: false, weight_kg: 0.7, volume_l: 2.0 },
      { name: "Desk fan", qty: 1, fragile: true, weight_kg: 1.2, volume_l: 4.0 },
      { name: "School supplies", qty: 1, fragile: false, weight_kg: 1.5, volume_l: 3.0 },
      { name: "Toiletries", qty: 1, fragile: false, weight_kg: 1.0, volume_l: 2.5 },
    ],
  },
  {
    id: "weekend_trip",
    title: "Weekend Trip",
    description: "Light travel and essentials",
    items: [
      { name: "Outfits", qty: 3, fragile: false, weight_kg: 0.5, volume_l: 1.5 },
      { name: "Shoes", qty: 1, fragile: false, weight_kg: 1.0, volume_l: 3.0 },
      { name: "Toiletry bag", qty: 1, fragile: false, weight_kg: 0.6, volume_l: 1.5 },
      { name: "Electronics pouch", qty: 1, fragile: true, weight_kg: 0.8, volume_l: 1.2 },
      { name: "Water bottle", qty: 1, fragile: false, weight_kg: 0.7, volume_l: 1.0 },
    ],
  },
];
