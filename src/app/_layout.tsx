import {
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../global.css";

import { CerdiqTabBar } from "@/components/navigation/cerdiq-tab-bar";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to the project root .env file");
}

SplashScreen.preventAutoHideAsync();

const routesWithoutNavigation = new Set([
  "/authorization",
  "/create-profile",
  "/login",
  "/sign-up",
]);

function AppNavigation() {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const showNavigation = isLoaded && isSignedIn && !routesWithoutNavigation.has(pathname);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F7F3FF" },
        }}
      />
      {showNavigation ? (
        <View
          style={{
            bottom: Math.max(insets.bottom, 8),
            left: 14,
            position: "absolute",
            right: 14,
            zIndex: 100,
          }}
        >
          <CerdiqTabBar />
        </View>
      ) : null}
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito: Nunito_500Medium,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <StatusBar style="dark" backgroundColor="#F7F3FF" />

      <AppNavigation />
    </ClerkProvider>
  );
}
