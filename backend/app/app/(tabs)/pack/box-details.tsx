import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import GTButton from "@/components/ui/GTButton";
import { EmptyState } from "@/components/ui/StateViews";
import { useAppStore } from "@/lib/store";
import { spacing } from "@/config/tokens";
import ColorsGT from "@/config/colors";

export default function BoxDetails() {
  const router = useRouter();
  const { boxId } = useLocalSearchParams<{ boxId?: string }>();
  const latest = useAppStore((s) => s.latest);

  const box = latest?.boxDetails?.find((b) => b.id === boxId);

  if (!box) {
    return (
      <View style={styles.emptyWrap}>
        <ThemedText type="title" style={styles.title}>Box Details</ThemedText>
        <EmptyState title="Box details not found." actionLabel="Back to Results" onPress={() => router.push("/(tabs)/pack/results")} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>{box.size} Box Details</ThemedText>
      <ThemedText dim>{box.usage}</ThemedText>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Items Packed</ThemedText>
        {box.items.map((item) => (
          <View key={`${box.id}-${item.name}`} style={styles.itemBlock}>
            <ThemedText style={styles.itemName}>
              {item.name} x{item.qty}
            </ThemedText>
            <ThemedText dim>
              Weight: {item.weight_kg} kg | Volume: {item.volume_l} L
            </ThemedText>
            <ThemedText dim>
              Dimensions: {item.dimensions_cm.length} x {item.dimensions_cm.width} x {item.dimensions_cm.height} cm
            </ThemedText>
            {item.fragile ? <ThemedText dim style={styles.fragile}>Fragile</ThemedText> : null}
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Optimal Packing Order</ThemedText>
        {box.packingOrder.map((step, index) => (
          <ThemedText key={`${box.id}-step-${index}`}>
            {index + 1}. {step}
          </ThemedText>
        ))}
      </Card>

      <GTButton
        title="Back to Results"
        type="secondary"
        iconName="arrow-left"
        onPress={() => router.push("/(tabs)/pack/results")}
        accessibilityLabel="Back to results"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    color: ColorsGT.secondary,
  },
  card: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: ColorsGT.secondary,
  },
  itemBlock: {
    marginBottom: spacing.md,
  },
  itemName: {
    fontWeight: "600",
  },
  fragile: {
    color: ColorsGT.danger,
    marginTop: spacing.xs,
  },
  emptyWrap: {
    flex: 1,
    padding: spacing.lg,
  },
});
