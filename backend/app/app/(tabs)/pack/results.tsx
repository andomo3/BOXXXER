import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import GTButton from "@/components/ui/GTButton";
import { useRouter } from "expo-router";
import { useAppStore } from "@/lib/store";
import Card from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateViews";
import { spacing } from "@/config/tokens";
import ColorsGT from "@/config/colors";

export default function Results() {
  const router = useRouter();
  const latest = useAppStore((s) => s.latest);
  const history = useAppStore((s) => s.history);
  const pushHistory = useAppStore((s) => s.pushHistory);

  if (!latest) {
    return (
      <View style={styles.emptyWrap}>
        <ThemedText type="title" style={styles.title}>No Results Yet</ThemedText>
        <EmptyState title="Try building an item list to generate a plan." actionLabel="Go to Scan" onPress={() => router.push("/(tabs)/pack/scan")} />
      </View>
    );
  }

  const isSaved = history.some((h) => h.id === latest.id);
  const boxDetails = latest.boxDetails ?? [];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Recommended Plan</ThemedText>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Summary</ThemedText>
        <ThemedText>{latest.summary}</ThemedText>
      </Card>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Box Plan</ThemedText>
        {boxDetails.length === 0 ? (
          latest.boxes.length === 0 ? (
            <ThemedText dim>No boxes generated.</ThemedText>
          ) : (
            latest.boxes.map((b, i) => (
              <View key={`${b.size}-${i}`} style={styles.boxBlock}>
                <View style={styles.boxHeader}>
                  <ThemedText style={styles.boxSize}>{b.size} Boxes</ThemedText>
                  <ThemedText dim>{b.usage}</ThemedText>
                </View>
                <ThemedText>{b.count} total</ThemedText>
              </View>
            ))
          )
        ) : (
          boxDetails.map((box) => (
            <View key={box.id} style={styles.boxBlock}>
              <View style={styles.boxHeader}>
                <ThemedText style={styles.boxSize}>{box.size} Box</ThemedText>
                <ThemedText dim>{box.usage}</ThemedText>
              </View>
              <View style={styles.itemList}>
                {box.items.map((item) => (
                  <ThemedText key={`${box.id}-${item.name}`} style={styles.itemLine}>
                    {item.name} x{item.qty}
                  </ThemedText>
                ))}
              </View>
              <GTButton
                title="View Details"
                type="secondary"
                iconName="information-outline"
                onPress={() => router.push({ pathname: "/(tabs)/pack/box-details", params: { boxId: box.id } })}
                accessibilityLabel={`View details for ${box.size} box`}
              />
            </View>
          ))
        )}
      </Card>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Efficiency</ThemedText>
        <ThemedText style={styles.scoreText}>{(latest.efficiencyScore * 100).toFixed(0)}%</ThemedText>
        <ThemedText dim>Based on volume and weight utilization.</ThemedText>
      </Card>

      <View style={styles.actions}>
        <GTButton
          title={isSaved ? "Saved to History" : "Save to History"}
          iconName="content-save"
          type={isSaved ? "disabled" : "primary"}
          onPress={() => {
            if (!isSaved) pushHistory(latest);
          }}
          disabled={isSaved}
          accessibilityLabel="Save to history"
        />
        <GTButton
          title="Start New Plan"
          iconName="plus"
          type="secondary"
          onPress={() => router.push("/(tabs)/pack/scan")}
          accessibilityLabel="Start new plan"
        />
      </View>
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
  emptyWrap: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: ColorsGT.secondary,
  },
  boxSize: {
    fontWeight: "600",
  },
  boxBlock: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ColorsGT.border,
  },
  boxHeader: {
    marginBottom: spacing.sm,
  },
  itemList: {
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  itemLine: {
    fontSize: 14,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "700",
    color: ColorsGT.success,
    marginBottom: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
});
