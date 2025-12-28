import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateViews";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ColorsGT from "@/config/colors";
import { spacing, radius, hitSlop } from "@/config/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type BoxType = {
  id: string;
  name: string;
  volume: number;
  maxWeight: number;
  color: string;
};

const defaultBoxes: BoxType[] = [
  {
    id: "small",
    name: "Small Box",
    volume: 12,
    maxWeight: 10,
    color: ColorsGT.primary,
  },
  {
    id: "medium",
    name: "Medium Box",
    volume: 24,
    maxWeight: 18,
    color: ColorsGT.secondary,
  },
  {
    id: "large",
    name: "Large Box",
    volume: 45,
    maxWeight: 23,
    color: ColorsGT.success,
  },
];

export default function Boxes() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;
  const customBoxes: BoxType[] = []; // Start empty

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Box Sizes</ThemedText>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="package-variant" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Default Boxes</ThemedText>
        </View>
        <ThemedText style={styles.paragraph}>
          These are the standard box sizes used by the optimizer. You can also create custom box sizes to match your available containers.
        </ThemedText>
      </Card>

      {defaultBoxes.map((box) => (
        <Card key={box.id} style={styles.boxCard}>
          <View style={styles.boxHeader}>
            <View style={[styles.boxColor, { backgroundColor: box.color }]} />
            <View style={styles.boxInfo}>
              <ThemedText style={styles.boxName}>{box.name}</ThemedText>
              <View style={styles.boxSpecs}>
                <View style={styles.spec}>
                  <MaterialCommunityIcons name="cube-outline" size={16} color={ColorsGT.mutedText} />
                  <ThemedText dim style={styles.specText}>{box.volume}L</ThemedText>
                </View>
                <View style={styles.spec}>
                  <MaterialCommunityIcons name="weight" size={16} color={ColorsGT.mutedText} />
                  <ThemedText dim style={styles.specText}>{box.maxWeight}kg max</ThemedText>
                </View>
              </View>
            </View>
            <MaterialCommunityIcons name="information-outline" size={20} color={ColorsGT.secondary} />
          </View>
        </Card>
      ))}

      {customBoxes.length > 0 && (
        <>
          <View style={styles.sectionDivider}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Custom Boxes</ThemedText>
            <TouchableOpacity hitSlop={hitSlop} onPress={() => Alert.alert("Add Custom Box", "Feature coming soon")}>
              <MaterialCommunityIcons name="plus-circle" size={24} color={ColorsGT.primary} />
            </TouchableOpacity>
          </View>
          {customBoxes.map((box) => (
            <Card key={box.id} style={styles.boxCard}>
              <View style={styles.boxHeader}>
                <View style={[styles.boxColor, { backgroundColor: box.color }]} />
                <View style={styles.boxInfo}>
                  <ThemedText style={styles.boxName}>{box.name}</ThemedText>
                  <View style={styles.boxSpecs}>
                    <View style={styles.spec}>
                      <MaterialCommunityIcons name="cube-outline" size={16} color={ColorsGT.mutedText} />
                      <ThemedText dim style={styles.specText}>{box.volume}L</ThemedText>
                    </View>
                    <View style={styles.spec}>
                      <MaterialCommunityIcons name="weight" size={16} color={ColorsGT.mutedText} />
                      <ThemedText dim style={styles.specText}>{box.maxWeight}kg max</ThemedText>
                    </View>
                  </View>
                </View>
                <TouchableOpacity hitSlop={hitSlop}>
                  <MaterialCommunityIcons name="delete" size={20} color={ColorsGT.danger} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </>
      )}

      {customBoxes.length === 0 && (
        <Card style={styles.card}>
          <View style={styles.addCustomContainer}>
            <MaterialCommunityIcons name="plus-circle-outline" size={48} color={ColorsGT.mutedText} />
            <ThemedText dim style={styles.addCustomText}>No custom boxes yet</ThemedText>
            <ThemedText dim style={styles.addCustomSubtext}>Create custom sizes for special containers</ThemedText>
          </View>
        </Card>
      )}

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="help-circle" size={24} color={ColorsGT.success} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Box Selection Tips</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Small boxes are great for heavy, dense items</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Medium boxes work well for fragile items with padding</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Large boxes are ideal for lightweight, bulky items</ThemedText>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
    color: ColorsGT.secondary,
  },
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: ColorsGT.secondary,
  },
  paragraph: {
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  boxCard: {
    marginBottom: spacing.md,
  },
  boxHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  boxColor: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
  },
  boxInfo: {
    flex: 1,
  },
  boxName: {
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: ColorsGT.text,
  },
  boxSpecs: {
    flexDirection: "row",
    gap: spacing.md,
  },
  spec: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  specText: {
    fontSize: 13,
  },
  sectionDivider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  addCustomContainer: {
    alignItems: "center",
    padding: spacing.xl,
  },
  addCustomText: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    fontWeight: "600",
  },
  addCustomSubtext: {
    fontSize: 13,
  },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tipText: {
    flex: 1,
    lineHeight: 22,
  },
});
