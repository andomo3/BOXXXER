import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'boxxer',
  slug: 'boxxer',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'app',
  userInterfaceStyle: 'automatic',
  
  // This `extra` block is where we add our custom environment variables.
  extra: {
    // This line safely reads the backend URL from your .env file.
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    eas: {
      projectId: "83952fc1-83ad-4d13-94f3-ad7862f6df8e",
    },
  },
  
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.andomo3.boxxer",
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
