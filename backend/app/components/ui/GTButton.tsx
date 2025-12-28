import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

type ButtonType = "primary" | "secondary" | "danger" | "success" | "disabled";
type Size = "sm" | "md" | "lg";
type MaterialCommunityIconName =
  React.ComponentProps<typeof MaterialCommunityIcons>["name"];

interface GTButtonProps {
  title?: string;
  onPress?: (e: GestureResponderEvent) => void;
  type?: ButtonType;
  size?: Size;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: MaterialCommunityIconName;
  rightIconName?: MaterialCommunityIconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean; // for <Link asChild> ... </Link> usage
  accessibilityLabel?: string;
  accessibilityHint?: string;
  children?: React.ReactNode;
}

export default function GTButton({
  title,
  onPress,
  type = "primary",
  size = "md",
  style,
  textStyle,
  iconName,
  rightIconName,
  disabled: disabledProp,
  loading = false,
  fullWidth = false,
  asChild = false,
  accessibilityLabel,
  accessibilityHint,
  children,
}: GTButtonProps) {
  const scheme = useColorScheme();
  const palette = scheme === "dark" ? Colors.dark : Colors.light;

  // Color system for buttons (mapped from your Colors palette)
  const COLOR = getButtonColors(palette, type);
  const disabled = disabledProp || type === "disabled" || loading;

  const sizeStyles = SIZE_STYLES[size];

  const baseButtonStyle: ViewStyle = {
    ...styles.button,
    paddingVertical: sizeStyles.py,
    paddingHorizontal: sizeStyles.px,
    borderRadius: sizeStyles.radius,
    backgroundColor: COLOR.bg,
    borderColor: COLOR.border,
    borderWidth: COLOR.border ? StyleSheet.hairlineWidth : 0,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : undefined,
  };

  const content = children ? (
    // If you pass children (e.g., <Link> with asChild), we render them directly
    <View style={[styles.content, sizeStyles.gap > 0 ? { columnGap: sizeStyles.gap } : undefined]}>
      {children}
    </View>
  ) : (
    <View style={[styles.content, sizeStyles.gap > 0 ? { columnGap: sizeStyles.gap } : undefined]}>
      {iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          size={sizeStyles.icon}
          color={COLOR.fg}
          style={styles.iconLeft}
        />
      ) : null}
      <Text
        style={[
          styles.buttonText,
          { color: COLOR.fg, fontSize: sizeStyles.fontSize, lineHeight: sizeStyles.fontSize * 1.25 },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {rightIconName ? (
        <MaterialCommunityIcons
          name={rightIconName}
          size={sizeStyles.icon}
          color={COLOR.fg}
          style={styles.iconRight}
        />
      ) : null}
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[baseButtonStyle, style, COLOR.shadow && { ...COLOR.shadow }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      // IMPORTANT: asChild usage works because Link (with asChild) will clone this touchable
      // and take over onPress. We don’t need any special logic here.
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLOR.fg} />
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}

/* -------------------- helpers & styles -------------------- */

function getButtonColors(
  palette: typeof Colors.light,
  type: ButtonType
): {
  bg: string;
  fg: string;
  border?: string;
  shadow?: ViewStyle;
} {
  const white = "#FFFFFF";
  const black = "#000000";

  const contrastText = (bg: string) => {
    // simple luminance check for contrast
    const [r, g, b] = hexToRgb(bg);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? black : white;
  };

  switch (type) {
    case "primary": {
      const bg = palette.tint;
      return {
        bg,
        fg: contrastText(bg),
        shadow: shadowStyle("#000000"),
      };
    }
    case "secondary": {
      // subtle outline button using icon grey
      const border = palette.tabIconDefault;
      return {
        bg: "transparent",
        fg: palette.text,
        border,
        shadow: undefined,
      };
    }
    case "success": {
      const bg = "#2E7D32";
      return { bg, fg: contrastText(bg), shadow: shadowStyle("#000000") };
    }
    case "danger": {
      const bg = "#B00020";
      return { bg, fg: contrastText(bg), shadow: shadowStyle("#000000") };
    }
    case "disabled":
    default: {
      const bg = palette.tabIconDefault;
      return { bg, fg: contrastText(bg), shadow: undefined };
    }
  }
}

const SIZE_STYLES: Record<
  Size,
  { px: number; py: number; radius: number; fontSize: number; icon: number; gap: number }
> = {
  sm: { px: 12, py: 8, radius: 8, fontSize: 14, icon: 16, gap: 6 },
  md: { px: 16, py: 12, radius: 10, fontSize: 16, icon: 20, gap: 8 },
  lg: { px: 20, py: 14, radius: 12, fontSize: 18, icon: 22, gap: 10 },
};

function hexToRgb(hex: string): [number, number, number] {
  const n = hex.replace("#", "");
  const v = n.length === 3
    ? n.split("").map((c) => parseInt(c + c, 16))
    : [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
  return v as [number, number, number];
}

function shadowStyle(color: string): ViewStyle {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  };
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
