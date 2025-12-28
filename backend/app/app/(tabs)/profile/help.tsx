import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ColorsGT from "@/config/colors";
import { spacing, radius, hitSlop } from "@/config/tokens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I scan a room with the camera?",
    answer: "Tap 'Take Photo' to capture a room image. Then tap 'Detect Objects' to automatically identify items in the photo. You can review and edit the detected items before optimizing.",
  },
  {
    question: "Can I manually add items instead of using the camera?",
    answer: "Yes! Tap the '+' button in the Items section to manually add items. Enter the name, quantity, weight, volume, and mark if fragile.",
  },
  {
    question: "What box sizes are available?",
    answer: "We support Small (12L, 10kg), Medium (24L, 18kg), and Large (45L, 23kg) boxes. The optimizer automatically selects the best combination for your items.",
  },
  {
    question: "How does the AI detection work?",
    answer: "Our vision AI uses advanced object detection to identify items in photos. It estimates weight, volume, and fragility based on category. You can always adjust these values manually.",
  },
  {
    question: "Can I save packing plans for later?",
    answer: "Yes! All your optimization results are saved in History. You can also create Templates from frequently used packing configurations.",
  },
  {
    question: "What if an item is marked as fragile?",
    answer: "Fragile items are automatically placed in Medium boxes with padding. They're isolated from heavy items to prevent damage during transport.",
  },
  {
    question: "How accurate are the AI estimates?",
    answer: "Estimates are based on common item categories. For best results, verify and adjust weight/volume values after detection, especially for unusual items.",
  },
  {
    question: "Can I edit detected items?",
    answer: "Absolutely! Tap any item in the list to edit its details. You can modify the name, quantity, weight, volume, and fragile status.",
  },
];

export default function Help() {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>Help & Support</ThemedText>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="book-open" size={28} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Getting Started</ThemedText>
        </View>
        <ThemedText style={styles.paragraph}>
          Welcome to Boxxer! This intelligent packing assistant helps you organize your belongings efficiently using AI-powered object detection and optimization.
        </ThemedText>
        <View style={styles.step}>
          <ThemedText style={styles.stepNumber}>1</ThemedText>
          <ThemedText style={styles.stepText}>Take or select a photo of your room</ThemedText>
        </View>
        <View style={styles.step}>
          <ThemedText style={styles.stepNumber}>2</ThemedText>
          <ThemedText style={styles.stepText}>Tap 'Detect Objects' to identify items</ThemedText>
        </View>
        <View style={styles.step}>
          <ThemedText style={styles.stepNumber}>3</ThemedText>
          <ThemedText style={styles.stepText}>Review and edit item details</ThemedText>
        </View>
        <View style={styles.step}>
          <ThemedText style={styles.stepNumber}>4</ThemedText>
          <ThemedText style={styles.stepText}>Get your optimized packing plan</ThemedText>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="help-circle" size={28} color={ColorsGT.primary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Frequently Asked Questions</ThemedText>
        </View>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <View style={styles.faqQuestion}>
              <MaterialCommunityIcons name="help-circle-outline" size={20} color={ColorsGT.secondary} />
              <ThemedText style={styles.questionText}>{faq.question}</ThemedText>
            </View>
            <ThemedText dim style={styles.answerText}>{faq.answer}</ThemedText>
            {index < faqs.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="lightbulb" size={28} color={ColorsGT.success} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Tips & Best Practices</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Take clear, well-lit photos for best detection accuracy</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Verify fragile items are correctly marked for safe packing</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Save successful packing plans as templates for future moves</ThemedText>
        </View>
        <View style={styles.tip}>
          <MaterialCommunityIcons name="check-circle" size={20} color={ColorsGT.success} />
          <ThemedText style={styles.tipText}>Heavier items are automatically placed at the bottom</ThemedText>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="mail" size={28} color={ColorsGT.secondary} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Need More Help?</ThemedText>
        </View>
        <TouchableOpacity style={styles.contactButton} hitSlop={hitSlop}>
          <MaterialCommunityIcons name="email" size={24} color={ColorsGT.white} />
          <ThemedText style={styles.contactButtonText}>Email Support</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.contactButton, styles.contactButtonSecondary]} hitSlop={hitSlop}>
          <MaterialCommunityIcons name="web" size={24} color={ColorsGT.secondary} />
          <ThemedText style={styles.contactButtonTextSecondary}>Visit Documentation</ThemedText>
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
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ColorsGT.primary,
    color: ColorsGT.white,
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "700",
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    lineHeight: 22,
  },
  faqItem: {
    marginBottom: spacing.md,
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  questionText: {
    flex: 1,
    fontWeight: "600",
    lineHeight: 22,
  },
  answerText: {
    marginLeft: 28,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: ColorsGT.border,
    marginTop: spacing.md,
  },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tipText: {
    flex: 1,
    lineHeight: 22,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: ColorsGT.secondary,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  contactButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: ColorsGT.secondary,
  },
  contactButtonText: {
    color: ColorsGT.white,
    fontWeight: "600",
  },
  contactButtonTextSecondary: {
    color: ColorsGT.secondary,
    fontWeight: "600",
  },
});
