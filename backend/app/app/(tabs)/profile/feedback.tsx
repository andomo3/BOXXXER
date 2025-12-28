import React, { useState } from "react";
import { ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import GTButton from "@/components/ui/GTButton";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ColorsGT from "@/config/colors";
import { spacing, radius } from "@/config/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Feedback() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;
  
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("general");

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert("Error", "Please enter your feedback before submitting.");
      return;
    }
    Alert.alert("Thank You!", "Your feedback has been submitted. We appreciate your input!", [
      { text: "OK", onPress: () => setFeedback("") }
    ]);
  };

  const categories = [
    { id: "general", label: "General Feedback", icon: "message-text" },
    { id: "bug", label: "Report Bug", icon: "bug" },
    { id: "feature", label: "Feature Request", icon: "lightbulb" },
    { id: "improvement", label: "Improvement Suggestion", icon: "chart-line" },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Feedback</ThemedText>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="email" size={28} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Share Your Thoughts</ThemedText>
        </View>
        <ThemedText style={styles.paragraph}>
          We'd love to hear from you! Your feedback helps us improve Boxxer and make it better for everyone.
        </ThemedText>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="label" size={24} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Category</ThemedText>
        </View>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              category === cat.id && { backgroundColor: ColorsGT.primary },
            ]}
            onPress={() => setCategory(cat.id)}
          >
            <MaterialCommunityIcons
              name={cat.icon as any}
              size={20}
              color={category === cat.id ? ColorsGT.white : ColorsGT.secondary}
            />
            <ThemedText
              style={[
                styles.categoryText,
                category === cat.id && { color: ColorsGT.white },
              ]}
            >
              {cat.label}
            </ThemedText>
            {category === cat.id && (
              <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.white} />
            )}
          </TouchableOpacity>
        ))}
      </Card>

      <Card style={styles.card}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Your Feedback</ThemedText>
        <TextInput
          placeholder="Tell us what you think, share ideas, or report issues..."
          placeholderTextColor={ColorsGT.mutedText}
          value={feedback}
          onChangeText={setFeedback}
          multiline
          numberOfLines={8}
          style={[styles.textInput, { color: palette.text, backgroundColor: palette.background }]}
        />
        <ThemedText dim style={styles.helpText}>
          Please be as detailed as possible. If reporting a bug, include steps to reproduce it.
        </ThemedText>
      </Card>

      <GTButton
        title="Submit Feedback"
        iconName="send"
        onPress={handleSubmit}
        fullWidth
        style={{ backgroundColor: ColorsGT.primary }}
        textStyle={{ color: ColorsGT.white }}
      />

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="star" size={24} color={ColorsGT.success} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Other Ways to Reach Us</ThemedText>
        </View>
        <TouchableOpacity style={styles.contactOption}>
          <MaterialCommunityIcons name="star-outline" size={20} color={ColorsGT.primary} />
          <View style={styles.contactInfo}>
            <ThemedText style={styles.contactLabel}>Rate Us</ThemedText>
            <ThemedText dim style={styles.contactDescription}>Love Boxxer? Leave us a review!</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={ColorsGT.mutedText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactOption}>
          <MaterialCommunityIcons name="email-outline" size={20} color={ColorsGT.secondary} />
          <View style={styles.contactInfo}>
            <ThemedText style={styles.contactLabel}>Email Support</ThemedText>
            <ThemedText dim style={styles.contactDescription}>support@boxxer.app</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={ColorsGT.mutedText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactOption}>
          <MaterialCommunityIcons name="github" size={20} color={ColorsGT.text} />
          <View style={styles.contactInfo}>
            <ThemedText style={styles.contactLabel}>GitHub</ThemedText>
            <ThemedText dim style={styles.contactDescription}>Contribute to the project</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={ColorsGT.mutedText} />
        </TouchableOpacity>
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
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: ColorsGT.border,
    marginBottom: spacing.sm,
  },
  categoryText: {
    flex: 1,
    fontWeight: "600",
  },
  textInput: {
    borderWidth: 1,
    borderColor: ColorsGT.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 150,
    textAlignVertical: "top",
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: 13,
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ColorsGT.border,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontWeight: "600",
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 13,
  },
});
