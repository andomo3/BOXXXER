// services/history.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Result } from "@/lib/store"; // type-only import; no runtime cycle

const KEY = "@boxxer_history";
const SCHEMA_VERSION = 1;

type HistoryEnvelope = {
  version: number;
  data: Result[];
};

export async function loadHistoryFromDisk(): Promise<Result[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Legacy v0 format (array only)
      return parsed as Result[];
    }
    if (parsed && typeof parsed === "object") {
      const envelope = parsed as HistoryEnvelope;
      if (Array.isArray(envelope.data)) {
        return envelope.data;
      }
    }
  } catch {
    // Fall through to empty
  }
  return [];
}

export async function saveHistoryToDisk(history: Result[]) {
  const payload: HistoryEnvelope = { version: SCHEMA_VERSION, data: history };
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // Ignore write errors for offline MVP stability
  }
}
