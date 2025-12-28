import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { radius, spacing, shadow } from "@/config/tokens";

export default function Card({ style, children, ...rest }: ViewProps) {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      {...rest}
      style={[
        styles.card,
        { backgroundColor: palette.background },
        shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.06)",
  },
});


