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

type Template = {
  id: string;
  name: string;
  itemCount: number;
  createdAt: string;
  category: string;
};

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Apartment Living Room",
    itemCount: 24,
    createdAt: "2 weeks ago",
    category: "living-room",
  },
  {
    id: "2",
    name: "Kitchen Essentials",
    itemCount: 18,
    createdAt: "1 month ago",
    category: "kitchen",
  },
  {
    id: "3",
    name: "Home Office Setup",
    itemCount: 12,
    createdAt: "3 months ago",
    category: "office",
  },
];

export default function Templates() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;
  const templates: Template[] = []; // Start empty for demo

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Templates</ThemedText>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="file-document-edit" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>What are Templates?</ThemedText>
        </View>
        <ThemedText style={styles.paragraph}>
          Templates let you save and reuse packing configurations for rooms you pack frequently. Create a template after optimizing a room to use it again later.
        </ThemedText>
      </Card>

      {templates.length === 0 ? (
        <EmptyState
          title="No templates yet"
          actionLabel="Create from History"
          onPress={() => Alert.alert("Create Template", "This feature is coming soon!")}
        />
      ) : (
        templates.map((template) => (
          <Card key={template.id} style={styles.templateCard}>
            <View style={styles.templateHeader}>
              <View style={styles.templateIcon}>
                <MaterialCommunityIcons name="file-document" size={24} color={ColorsGT.primary} />
              </View>
              <View style={styles.templateInfo}>
                <ThemedText style={styles.templateName}>{template.name}</ThemedText>
                <ThemedText dim style={styles.templateMeta}>
                  {template.itemCount} items • {template.createdAt}
                </ThemedText>
              </View>
            </View>
            <View style={styles.templateActions}>
              <TouchableOpacity
                style={styles.actionButton}
                hitSlop={hitSlop}
                onPress={() => Alert.alert("Use Template", "Template would be applied here")}
              >
                <MaterialCommunityIcons name="download" size={20} color={ColorsGT.secondary} />
                <ThemedText style={styles.actionText}>Use</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                hitSlop={hitSlop}
                onPress={() => Alert.alert("Edit Template", "Template editor would open here")}
              >
                <MaterialCommunityIcons name="pencil" size={20} color={ColorsGT.secondary} />
                <ThemedText style={styles.actionText}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                hitSlop={hitSlop}
                onPress={() => Alert.alert("Delete Template", "Template would be deleted")}
              >
                <MaterialCommunityIcons name="delete" size={20} color={ColorsGT.danger} />
                <ThemedText style={[styles.actionText, { color: ColorsGT.danger }]}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </Card>
        ))
      )}

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="lightbulb" size={24} color={ColorsGT.success} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Tips</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Create templates for rooms you pack often</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Templates help maintain consistency across moves</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Edit templates as your needs change</ThemedText>
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
  templateCard: {
    marginBottom: spacing.md,
  },
  templateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ColorsGT.primary + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: ColorsGT.text,
  },
  templateMeta: {
    fontSize: 13,
  },
  templateActions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: ColorsGT.border,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
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
