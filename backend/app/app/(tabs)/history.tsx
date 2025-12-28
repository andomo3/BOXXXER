import React from "react";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useAppStore } from "@/lib/store";
import Card from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateViews";
import { spacing, radius } from "@/config/tokens";
import ColorsGT from "@/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function History() {
  const router = useRouter();
  const history = useAppStore((s) => s.history);
  const setLatest = useAppStore((s) => s.setLatest);
  const removeHistory = useAppStore((s) => s.removeHistory);
  const clearHistory = useAppStore((s) => s.clearHistory);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>History</ThemedText>
        {history.length > 0 ? (
          <TouchableOpacity
            onPress={clearHistory}
            accessibilityLabel="Clear all history"
            style={styles.clearButton}
          >
            <MaterialCommunityIcons name="delete-sweep" size={22} color={ColorsGT.danger} />
            <ThemedText style={styles.clearText}>Clear</ThemedText>
          </TouchableOpacity>
        ) : null}
      </View>
      {history.length === 0 ? (
        <EmptyState title="No saved optimizations yet." actionLabel="Start a Plan" onPress={() => router.push("/(tabs)/pack/scan")} />
      ) : (
        history.map((h) => (
          <Pressable
            key={h.id}
            style={styles.cardPressable}
            onPress={() => {
              setLatest(h);
              router.push("/(tabs)/pack/results");
            }}
            accessibilityLabel={`Open result from ${new Date(h.createdAt).toLocaleDateString()}`}
          >
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <ThemedText type="subtitle">
                  {new Date(h.createdAt).toLocaleString()}
                </ThemedText>
                <TouchableOpacity
                  onPress={() => removeHistory(h.id)}
                  accessibilityLabel={`Delete history item from ${new Date(h.createdAt).toLocaleDateString()}`}
                  style={styles.iconButton}
                >
                  <MaterialCommunityIcons name="delete" size={20} color={ColorsGT.danger} />
                </TouchableOpacity>
              </View>
              <ThemedText numberOfLines={2} style={styles.summary}>{h.summary}</ThemedText>
              <ThemedText>
                Boxes: {h.boxes.reduce((a, b) => a + b.count, 0)} | Score: {(h.efficiencyScore * 100).toFixed(0)}%
              </ThemedText>
            </Card>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: ColorsGT.secondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 44,
    minWidth: 44,
  },
  clearText: {
    color: ColorsGT.danger,
    fontWeight: "600",
  },
  cardPressable: {
    minHeight: 64,
  },
  card: {
    borderRadius: radius.lg,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summary: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  iconButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
