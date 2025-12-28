import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import GTButton from "@/components/ui/GTButton";
import { spacing } from "@/config/tokens";

export function EmptyState({ title, actionLabel, onPress }: { title: string; actionLabel?: string; onPress?: () => void }) {
  return (
    <View style={{ alignItems: "center", gap: spacing.md, padding: spacing.lg }}>
      <ThemedText darkColor="#9BA1A6" lightColor="#687076">{title}</ThemedText>
      {actionLabel && onPress ? <GTButton title={actionLabel} iconName="plus" onPress={onPress} /> : null}
    </View>
  );
}

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <View style={{ alignItems: "center", gap: spacing.sm, padding: spacing.lg }}>
      <ActivityIndicator />
      <ThemedText darkColor="#9BA1A6" lightColor="#687076">{label}</ThemedText>
    </View>
  );
}

export function ErrorState({ message, retry }: { message: string; retry?: () => void }) {
  return (
    <View style={{ alignItems: "center", gap: spacing.md, padding: spacing.lg }}>
      <ThemedText darkColor="#FCA5A5" lightColor="#B00020">{message}</ThemedText>
      {retry ? <GTButton title="Retry" iconName="refresh" onPress={retry} /> : null}
    </View>
  );
}


