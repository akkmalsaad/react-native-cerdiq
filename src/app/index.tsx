import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Href, Redirect } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { colors } from "@/theme/tokens";

export default function IndexScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { isLoaded: userLoaded, user } = useUser();

  if (!isLoaded || (isSignedIn && !userLoaded)) {
    return (
      <View style={{ alignItems: "center", backgroundColor: colors.primary[50], flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary[600]} size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <OnboardingScreen />;
  }

  if (user?.unsafeMetadata.profileSetupComplete !== true) {
    return <Redirect href={"/create-profile" as Href} />;
  }

  return (
    <View style={{ alignItems: "center", backgroundColor: colors.primary[50], flex: 1, gap: 18, justifyContent: "center", padding: 24 }}>
      <Text style={{ color: colors.primary[600], fontFamily: "Nunito_800ExtraBold", fontSize: 32, textAlign: "center" }}>
        Selamat Datang{user?.firstName ? `, ${user.firstName}` : ""}!
      </Text>
      <Text style={{ color: colors.navy[700], fontFamily: "Nunito_500Medium", fontSize: 16, textAlign: "center" }}>
        Anda telah berjaya log masuk ke Cerdiq.
      </Text>
      <Pressable
        accessibilityLabel="Log keluar"
        accessibilityRole="button"
        onPress={() => void signOut({ redirectUrl: "/" })}
        style={({ pressed }) => ({
          backgroundColor: colors.primary[600],
          borderRadius: 999,
          opacity: pressed ? 0.85 : 1,
          paddingHorizontal: 28,
          paddingVertical: 13,
        })}
      >
        <Text style={{ color: colors.white, fontFamily: "Nunito_700Bold", fontSize: 16 }}>Log Keluar</Text>
      </Pressable>
    </View>
  );
}
