import { Image } from 'expo-image';
import {useRouter} from 'expo-router';
import { View, Platform, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'; 


import { HelloWave } from '@/components/HelloWave';
import ExpandableStep from '@/components/ExpandableStep'; 
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import colors from '@/config/colors';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import GTButton from '@/components/ui/GTButton';
import { spacing, radius } from '@/config/tokens';

export default function HomeScreen() {
  console.log("Index page loading");
  const router = useRouter();


  const handleScanPress = () => {
    //router.push('../scan'); // This matches app/(tabs)/scan.tsx
    router.push("/(tabs)/pack/scan");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: colors.primary, dark: colors.secondary }}
      headerImage={
        // <Image
        //   source={require('@/assets/images/partial-react-logo.png')}
        //   style={styles.reactLogo}
        // />
        <MaterialCommunityIcons name='cube-unfolded' size={200} color={colors.white}/>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: colors.primary }}>Welcome to Boxxer</ThemedText>
        <MaterialCommunityIcons name='cube-outline' size={32} color={colors.primary}/>
      </ThemedView>
      <ThemedText style={styles.sloganContainer}>        
        <ThemedText type="default" style={{ color: colors.mutedText}}> ~ College made easier</ThemedText>
      </ThemedText>

      {/* Step 1 */}
      <ExpandableStep
        title="Step 1: Scan your room"
        text="Use your camera to capture items you want to pack. You can scan shelves, desks, and open boxes. BOXXER will detect objects and read labels (OCR) to build an initial item list. Press cmd + m or cmd + d to open developer tools while testing."
      />


      {/* Step 2 */}
      <ExpandableStep
        title="Step 2: Add details for better recommendations"
        text="Review and edit the auto-detected list. Add quantities, dimensions, fragility, weight class, and any special constraints (e.g., keep together, don't stack). These details improve optimization and simulation accuracy."
      />

      {/* Step 3 */}
      <ExpandableStep
        title="Step 3: Get results & give feedback"
        text="Run the AI optimizer to receive box assignments, utilization, and a time & risk estimate from the simulation. After packing, mark issues (e.g., overflow, damage, extra time). Your feedback helps BOXXER learn and improve future recommendations."
      />


      <GTButton
        title= 'Scan Room'
        onPress = {handleScanPress}
        type= 'primary'
        iconName= 'camera'
        accessibilityLabel="Scan room"
      /> 
    </ParallaxScrollView>
  );
}


export function HelpLinkButton() {
  const router = useRouter();
  return (
    <GTButton
      title="Help"
      iconName="help-circle-outline"
      type="secondary"
      accessibilityLabel="Open help"
      // Either absolute (group-aware)
      onPress={() => router.push('/(tabs)/profile/help')}
      // ..or relative from  /(tabs)/pack/ to /(tabs)/profile/
      // onPress = {() => router.push('../../profile/help')}
    />
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  sloganContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  stepContainer: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderColor: colors.border,
    borderWidth: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },


});
