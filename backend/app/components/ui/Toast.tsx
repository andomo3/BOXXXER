import React, { createContext, useCallback, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { spacing, radius } from "@/config/tokens";

type Toast = { id: number; text: string };
const Ctx = createContext<{ show: (text: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Toast[]>([]);
  const show = useCallback((text: string) => {
    const id = Date.now();
    setQueue((q) => [...q, { id, text }]);
    setTimeout(() => setQueue((q) => q.filter((t) => t.id !== id)), 2500);
  }, []);
  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <View pointerEvents="none" style={styles.wrap}>
        {queue.map((t) => (
          <View key={t.id} style={styles.toast}><Text style={styles.txt}>{t.text}</Text></View>
        ))}
      </View>
    </Ctx.Provider>
  );
}

export function useToast() {
  const v = useContext(Ctx);
  if (!v) throw new Error("No ToastProvider");
  return v;
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", bottom: 32, left: 16, right: 16, gap: 8 },
  toast: { backgroundColor: "rgba(0,0,0,0.85)", padding: spacing.md, borderRadius: radius.lg },
  txt: { color: "white", textAlign: "center", fontWeight: "600" },
});


