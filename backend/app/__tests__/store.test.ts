jest.mock("@/services/history", () => ({
  saveHistoryToDisk: jest.fn(),
}));

import { useAppStore, type Result } from "@/lib/store";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({ latest: undefined, history: [], draftItems: [] });
  });

  it("hydrates history and sets latest to most recent", () => {
    const history: Result[] = [
      { id: "1", createdAt: 1, summary: "First", boxes: [], efficiencyScore: 0.5, source: "manual" },
      { id: "2", createdAt: 2, summary: "Second", boxes: [], efficiencyScore: 0.6, source: "manual" },
    ];
    useAppStore.getState().setHistory(history);
    expect(useAppStore.getState().history).toHaveLength(2);
    expect(useAppStore.getState().latest?.id).toBe("1");
  });

  it("pushes new history entries to the front", () => {
    const result: Result = {
      id: "r1",
      createdAt: 10,
      summary: "Plan",
      boxes: [{ size: "Small", count: 1, usage: "Test" }],
      efficiencyScore: 0.8,
      source: "manual",
    };
    useAppStore.getState().pushHistory(result);
    const history = useAppStore.getState().history;
    expect(history[0].id).toBe("r1");
  });
});
