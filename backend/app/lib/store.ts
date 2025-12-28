import { create } from "zustand";
import { saveHistoryToDisk } from "@/services/history";
import type { BoxDetail, BoxPlan } from "@/services/optimizer";

export type Result = {
  id: string;
  createdAt: number;
  summary: string;
  boxes: BoxPlan[];
  boxDetails?: BoxDetail[];
  efficiencyScore: number;
  source?: "scan" | "manual";
};

export type DraftItem = {
  id: string;
  name: string;
  qty: number;
  weight_kg: number;
  volume_l: number;
  fragile: boolean;
};

type Store = {
  latest?: Result;
  history: Result[];
  draftItems: DraftItem[];
  setLatest: (r: Result) => void;
  setHistory: (history: Result[]) => void;
  setDraftItems: (items: DraftItem[]) => void;
  clearDraftItems: () => void;
  pushHistory: (r: Result) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
};

export const useAppStore = create<Store>()((set) => ({
  latest: undefined,
  history: [],
  draftItems: [],
  setLatest: (r) => set({ latest: r }),
  setHistory: (history) => set({ history, latest: history[0] }),
  setDraftItems: (items) => set({ draftItems: items }),
  clearDraftItems: () => set({ draftItems: [] }),
  pushHistory: (r) =>
    set((s) => {
      const next = [r, ...s.history];
      // Save *after* state updates and without importing the store in history.ts
      queueMicrotask(() => {
        // fire-and-forget; handle errors inside saveHistoryToDisk if desired
        void saveHistoryToDisk(next);
      });
      return { history: next };
    }),
  removeHistory: (id) =>
    set((s) => {
      const next = s.history.filter((h) => h.id !== id);
      queueMicrotask(() => {
        void saveHistoryToDisk(next);
      });
      return { history: next, latest: s.latest?.id === id ? undefined : s.latest };
    }),
  clearHistory: () =>
    set(() => {
      const next: Result[] = [];
      queueMicrotask(() => {
        void saveHistoryToDisk(next);
      });
      return { history: next, latest: undefined };
    }),
}));
