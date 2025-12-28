import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ColorsGT from "@/config/colors";
import { spacing, radius, hitSlop } from "@/config/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Settings() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;
  
  const [notifications, setNotifications] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="bell" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Notifications</ThemedText>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Get alerts for new features and tips</ThemedText>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: ColorsGT.border, true: ColorsGT.primary }}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="camera" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Camera & Detection</ThemedText>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Auto-Detect Objects</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Automatically detect items after taking photo</ThemedText>
          </View>
          <Switch
            value={autoDetect}
            onValueChange={setAutoDetect}
            trackColor={{ false: ColorsGT.border, true: ColorsGT.primary }}
          />
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Image Quality</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Medium (recommended)</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={ColorsGT.mutedText} />
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="database" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Data & Storage</ThemedText>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Save History</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Keep your packing plans locally</ThemedText>
          </View>
          <Switch
            value={saveHistory}
            onValueChange={setSaveHistory}
            trackColor={{ false: ColorsGT.border, true: ColorsGT.primary }}
          />
        </View>
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => Alert.alert("Clear Cache", "This will delete all cached images and temporary data.")}
        >
          <View style={styles.settingInfo}>
            <ThemedText style={[styles.settingLabel, { color: ColorsGT.danger }]}>Clear Cache</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Free up storage space</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={ColorsGT.mutedText} />
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="chart-line" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Privacy & Analytics</ThemedText>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Usage Analytics</ThemedText>
            <ThemedText dim style={styles.settingDescription}>Help improve the app (anonymous)</ThemedText>
          </View>
          <Switch
            value={analytics}
            onValueChange={setAnalytics}
            trackColor={{ false: ColorsGT.border, true: ColorsGT.primary }}
          />
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Privacy Policy</ThemedText>
            <ThemedText dim style={styles.settingDescription}>View how we protect your data</ThemedText>
          </View>
          <MaterialCommunityIcons name="open-in-new" size={20} color={ColorsGT.secondary} />
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="information" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>About</ThemedText>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Version</ThemedText>
            <ThemedText dim style={styles.settingDescription}>1.0.0</ThemedText>
          </View>
        </View>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Terms of Service</ThemedText>
          </View>
          <MaterialCommunityIcons name="open-in-new" size={20} color={ColorsGT.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText style={styles.settingLabel}>Open Source Licenses</ThemedText>
          </View>
          <MaterialCommunityIcons name="open-in-new" size={20} color={ColorsGT.secondary} />
        </TouchableOpacity>
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert("Sign Out", "This feature is coming soon!")}>
        <MaterialCommunityIcons name="logout" size={24} color={ColorsGT.white} />
        <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
      </TouchableOpacity>
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
    paddingBottom: spacing.xxl,
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ColorsGT.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  settingLabel: {
    fontWeight: "600",
    marginBottom: 2,
    color: ColorsGT.text,
  },
  settingDescription: {
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: ColorsGT.danger,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  logoutText: {
    color: ColorsGT.white,
    fontWeight: "600",
  },
});
