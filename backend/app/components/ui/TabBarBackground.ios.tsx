import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = { style?: ViewStyle };

export function useBottomTabOverflow(): number {
  const { bottom } = useSafeAreaInsets();
  return Math.max(bottom, 0);
}

export default function TabBarBackground({ style }: Props) {
  return <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]} />;
}
