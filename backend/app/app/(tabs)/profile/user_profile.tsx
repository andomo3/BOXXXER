// app/(tabs)/profile/user_profile.tsx
import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import GTButton from "@/components/ui/GTButton";
import Card from "@/components/ui/Card";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ColorsGT from "@/config/colors";
import { spacing, radius, hitSlop } from "@/config/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MenuItem = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  href: string;
  color: string;
};

const menuItems: MenuItem[] = [
  { title: "Settings", icon: "cog", href: "./settings", color: ColorsGT.secondary },
  { title: "Help", icon: "help-circle", href: "./help", color: ColorsGT.primary },
  { title: "Feedback", icon: "message-text", href: "./feedback", color: ColorsGT.success },
  { title: "Templates", icon: "file-document-edit", href: "./templates", color: ColorsGT.secondary },
  { title: "Saved Boxes", icon: "package-variant", href: "./boxes", color: ColorsGT.success },
];

export default function UserProfile() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: ColorsGT.primary }]}>
            <MaterialCommunityIcons name="bee" size={79} color={ColorsGT.white} />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText type="title" style={styles.name}>Buzzzzz</ThemedText>
            <ThemedText dim style={styles.email}>user@boxxer.app</ThemedText>
          </View>
        </View>
      </Card>

      {/* <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="chart-line" size={24} color={ColorsGT.primary} />
          <View style={styles.statInfo}>
            <ThemedText style={styles.statValue}>12</ThemedText>
            <ThemedText dim style={styles.statLabel}>Optimizations</ThemedText>
          </View>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="file-document" size={24} color={ColorsGT.secondary} />
          <View style={styles.statInfo}>
            <ThemedText style={styles.statValue}>3</ThemedText>
            <ThemedText dim style={styles.statLabel}>Templates</ThemedText>
          </View>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="box" size={24} color={ColorsGT.success} />
          <View style={styles.statInfo}>
            <ThemedText style={styles.statValue}>127</ThemedText>
            <ThemedText dim style={styles.statLabel}>Items Packed</ThemedText>
          </View>
        </View>
      </View> */}

      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Links</ThemedText>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href as any}>
            <View style={[styles.menuItem, { borderColor: ColorsGT.border }]}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
                <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
              </View>
              <ThemedText style={styles.menuText}>{item.title}</ThemedText>
            </View>
          </Link>
        ))}
      </View>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="information" size={24} color={ColorsGT.primary} />
          <ThemedText type="subtitle" style={styles.cardTitle}>About Boxxer</ThemedText>
        </View>
        <ThemedText style={styles.paragraph}>
          Boxxer is an intelligent packing assistant that uses AI to help you organize and pack your belongings efficiently. Whether you're moving to a new home or storing items, we make packing easy.
        </ThemedText>
        <View style={styles.versionInfo}>
          <ThemedText dim>Version 1.0.0</ThemedText>
          <ThemedText dim>•</ThemedText>
          {/* <ThemedText dim>Georgia Tech</ThemedText> */}
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
  profileCard: {
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    marginBottom: spacing.xs,
    color: ColorsGT.text,
  },
  email: {
    fontSize: 14,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: ColorsGT.white,
    borderWidth: 1,
    borderColor: ColorsGT.border,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: ColorsGT.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: ColorsGT.secondary,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  menuItem: {
    width: "100%",
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: ColorsGT.white,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontWeight: "600",
    color: ColorsGT.text,
  },
  card: {
    marginTop: spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardTitle: {
    color: ColorsGT.secondary,
  },
  paragraph: {
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  versionInfo: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
});

