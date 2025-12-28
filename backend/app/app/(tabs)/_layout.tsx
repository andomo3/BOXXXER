// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/config/colors";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // ← use this

export default function TabsLayout() {
  const scheme = useColorScheme();
  //const palette = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarBackground: () => <TabBarBackground />,
      }}
    >
      <Tabs.Screen
        name="pack/index"
        options={{
          title: "Pack",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cube" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/user_profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />

      {/* Hidden routes stay the same */}
      <Tabs.Screen name="pack/scan" options={{ href: null }} />
      <Tabs.Screen name="pack/results" options={{ href: null }} />
      <Tabs.Screen name="pack/optimize" options={{ href: null }} />
      <Tabs.Screen name="pack/items" options={{ href: null }} />
      <Tabs.Screen name="pack/box-details" options={{ href: null }} />
      <Tabs.Screen name="pack/simulation" options={{ href: null }} />
      <Tabs.Screen name="profile/settings" options={{ href: null }} />
      <Tabs.Screen name="profile/help" options={{ href: null }} />
      <Tabs.Screen name="profile/feedback" options={{ href: null }} />
      <Tabs.Screen name="profile/templates" options={{ href: null }} />
      <Tabs.Screen name="profile/boxes" options={{ href: null }} />
    </Tabs>
  );
}
