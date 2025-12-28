// app/_layout.tsx
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ToastProvider } from "@/components/ui/Toast";
import { loadHistoryFromDisk } from "@/services/history";
import { useAppStore } from "@/lib/store";

// If you use a splash gate, keep it — just be sure to hide when ready.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Example: add fonts if you have them
    // "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  useEffect(() => {
    let active = true;
    loadHistoryFromDisk()
      .then((history) => {
        if (active) useAppStore.getState().setHistory(history);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!fontsLoaded) return null;

  // IMPORTANT: Root must render <Slot /> (no Tabs here)
  return (
    <ToastProvider>
      <Slot />
    </ToastProvider>
  );
}
