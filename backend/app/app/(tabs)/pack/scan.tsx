import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import GTButton from "@/components/ui/GTButton";
import { ROOM_TEMPLATES } from "@/config/templates";
import { useAppStore } from "@/lib/store";
import ColorsGT from "@/config/colors";
import { Colors } from "@/constants/Colors";
import { spacing, radius } from "@/config/tokens";
import { useColorScheme } from "react-native";

export default function Scan() {
  const router = useRouter();
  const setDraftItems = useAppStore((s) => s.setDraftItems);
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;

  const handleTemplate = (templateId: string) => {
    const template = ROOM_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;
    const draft = template.items.map((item, index) => ({
      ...item,
      id: `${templateId}-${Date.now()}-${index}`,
    }));
    setDraftItems(draft);
    router.push("/(tabs)/pack/items");
  };

  const handleManual = () => {
    setDraftItems([]);
    router.push("/(tabs)/pack/items");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Scan & Pack</ThemedText>
      <ThemedText dim style={styles.subtitle}>Pick a starter template or build a custom list.</ThemedText>

      <Card style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Room Templates</ThemedText>
        <View style={styles.templateList}>
          {ROOM_TEMPLATES.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.templateCard, { backgroundColor: palette.background }]}
              onPress={() => handleTemplate(t.id)}
              accessibilityLabel={`Use ${t.title} template`}
            >
              <ThemedText style={styles.templateTitle}>{t.title}</ThemedText>
              <ThemedText dim>{t.description}</ThemedText>
              <ThemedText dim style={styles.templateMeta}>
                {t.items.length} items
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Card style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Prefer manual entry?</ThemedText>
        <ThemedText dim style={styles.subtitle}>Start with a blank list and add items yourself.</ThemedText>
        <GTButton
          title="Continue Manually"
          iconName="pencil"
          onPress={handleManual}
          accessibilityLabel="Continue manually"
          style={styles.manualButton}
        />
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
    color: ColorsGT.secondary,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: ColorsGT.secondary,
  },
  templateList: {
    gap: spacing.sm,
  },
  templateCard: {
    borderWidth: 1,
    borderColor: ColorsGT.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 64,
  },
  templateTitle: {
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  templateMeta: {
    marginTop: spacing.xs,
  },
  manualButton: {
    marginTop: spacing.md,
  },
});
