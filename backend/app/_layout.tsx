import { Stack } from 'expo-router';

// This is the root layout for the entire app.
export default function RootLayout() {
  // It sets up a "stack" navigator.
  // The "(tabs)" screen, which holds your tab bar, is one of the screens in this stack.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}