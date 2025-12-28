import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import GTButton from "@/components/ui/GTButton";
import { EmptyState } from "@/components/ui/StateViews";
import { useAppStore, type DraftItem } from "@/lib/store";
import { optimizePacking } from "@/services/optimizer";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing, radius, hitSlop } from "@/config/tokens";
import ColorsGT from "@/config/colors";
import { useToast } from "@/components/ui/Toast";

export default function Items() {
  const router = useRouter();
  const toast = useToast();
  const items = useAppStore((s) => s.draftItems);
  const setDraftItems = useAppStore((s) => s.setDraftItems);
  const clearDraftItems = useAppStore((s) => s.clearDraftItems);
  const setLatest = useAppStore((s) => s.setLatest);
  const pushHistory = useAppStore((s) => s.pushHistory);

  const [editingItem, setEditingItem] = useState<DraftItem | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);

  const openNewItem = () => {
    setEditingItem({
      id: String(Date.now()),
      name: "",
      qty: 1,
      weight_kg: 0,
      volume_l: 0,
      fragile: false,
    });
    setShowItemForm(true);
  };

  const saveItem = (item: DraftItem) => {
    if (!item.name.trim()) {
      toast.show("Item name is required.");
      return;
    }
    if (item.qty < 1) {
      toast.show("Quantity must be at least 1.");
      return;
    }
    const exists = items.find((i) => i.id === item.id);
    const next = exists ? items.map((i) => (i.id === item.id ? item : i)) : [...items, item];
    setDraftItems(next);
    setShowItemForm(false);
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setDraftItems(items.filter((i) => i.id !== id));
  };

  const runOptimization = () => {
    if (items.length === 0) {
      toast.show("Add at least one item to optimize.");
      return;
    }
    const { summary, boxes, boxDetails, efficiencyScore } = optimizePacking(items);
    const result = {
      id: String(Date.now()),
      createdAt: Date.now(),
      summary,
      boxes,
      boxDetails,
      efficiencyScore,
      source: "manual" as const,
    };
    setLatest(result);
    pushHistory(result);
    clearDraftItems();
    router.push("/(tabs)/pack/results");
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Items</ThemedText>
      <ThemedText dim>Review and edit your list before optimizing.</ThemedText>

      <Card style={styles.section}>
        <View style={styles.itemsHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Item List</ThemedText>
          <TouchableOpacity onPress={openNewItem} hitSlop={hitSlop} accessibilityLabel="Add item">
            <MaterialCommunityIcons name="plus-circle" size={26} color={ColorsGT.primary} />
          </TouchableOpacity>
        </View>

        {items.length === 0 ? (
          <EmptyState title="No items yet. Add your first item to begin." actionLabel="Add Item" onPress={openNewItem} />
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setEditingItem(item);
                setShowItemForm(true);
              }}
              style={styles.itemRow}
              activeOpacity={0.7}
              accessibilityLabel={`Edit ${item.name}`}
            >
              <View style={styles.itemInfo}>
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <View style={styles.itemDetails}>
                  <ThemedText dim style={styles.itemDetail}>Qty: {item.qty}</ThemedText>
                  <ThemedText dim style={styles.itemDetail}>•</ThemedText>
                  <ThemedText dim style={styles.itemDetail}>{item.weight_kg}kg</ThemedText>
                  <ThemedText dim style={styles.itemDetail}>•</ThemedText>
                  <ThemedText dim style={styles.itemDetail}>{item.volume_l}L</ThemedText>
                  {item.fragile && (
                    <>
                      <ThemedText dim style={styles.itemDetail}>•</ThemedText>
                      <MaterialCommunityIcons name="alert-circle" size={14} color={ColorsGT.danger} />
                      <ThemedText dim style={[styles.itemDetail, { color: ColorsGT.danger }]}>Fragile</ThemedText>
                    </>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                hitSlop={hitSlop}
                style={styles.iconButton}
                accessibilityLabel={`Delete ${item.name}`}
              >
                <MaterialCommunityIcons name="delete" size={22} color={ColorsGT.danger} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </Card>

      <GTButton
        title="Run Optimization"
        iconName="package-variant"
        onPress={runOptimization}
        accessibilityLabel="Run optimization"
        fullWidth
        style={styles.optimizeButton}
        textStyle={{ color: ColorsGT.white }}
      />

      <Modal visible={showItemForm} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Card style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              {editingItem && items.find((i) => i.id === editingItem.id) ? "Edit Item" : "Add Item"}
            </ThemedText>

            <TextInput
              placeholder="Item name"
              placeholderTextColor={ColorsGT.mutedText}
              value={editingItem?.name}
              onChangeText={(text) => setEditingItem({ ...editingItem!, name: text })}
              style={styles.input}
            />

            <TextInput
              placeholder="Quantity"
              placeholderTextColor={ColorsGT.mutedText}
              value={editingItem?.qty.toString()}
              onChangeText={(text) => setEditingItem({ ...editingItem!, qty: parseInt(text) || 0 })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Weight (kg)"
              placeholderTextColor={ColorsGT.mutedText}
              value={editingItem?.weight_kg.toString()}
              onChangeText={(text) => setEditingItem({ ...editingItem!, weight_kg: parseFloat(text) || 0 })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Volume (L)"
              placeholderTextColor={ColorsGT.mutedText}
              value={editingItem?.volume_l.toString()}
              onChangeText={(text) => setEditingItem({ ...editingItem!, volume_l: parseFloat(text) || 0 })}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.fragileRow}>
              <ThemedText>Fragile</ThemedText>
              <TouchableOpacity
                onPress={() => setEditingItem({ ...editingItem!, fragile: !editingItem?.fragile })}
                style={styles.fragileToggle}
                accessibilityLabel="Toggle fragile"
              >
                <MaterialCommunityIcons
                  name={editingItem?.fragile ? "check-circle" : "checkbox-blank-circle-outline"}
                  size={22}
                  color={editingItem?.fragile ? ColorsGT.primary : ColorsGT.mutedText}
                />
                <ThemedText dim style={styles.fragileText}>{editingItem?.fragile ? "Yes" : "No"}</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <GTButton
                title="Cancel"
                type="secondary"
                onPress={() => {
                  setShowItemForm(false);
                  setEditingItem(null);
                }}
                style={styles.modalButtonHalf}
              />
              <GTButton
                title="Save"
                onPress={() => editingItem && saveItem(editingItem)}
                style={[styles.modalButtonHalf, { backgroundColor: ColorsGT.primary }]}
                textStyle={{ color: ColorsGT.white }}
              />
            </View>
          </Card>
        </View>
      </Modal>
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
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: ColorsGT.secondary,
  },
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: ColorsGT.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: ColorsGT.text,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexWrap: "wrap",
  },
  itemDetail: {
    fontSize: 13,
  },
  optimizeButton: {
    backgroundColor: ColorsGT.success,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    paddingBottom: spacing.xxl,
  },
  modalTitle: {
    marginBottom: spacing.lg,
    color: ColorsGT.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: ColorsGT.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  fragileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  fragileToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 44,
    minWidth: 44,
  },
  fragileText: {
    marginLeft: spacing.xs,
  },
  modalButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  modalButtonHalf: {
    flex: 1,
  },
  iconButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
