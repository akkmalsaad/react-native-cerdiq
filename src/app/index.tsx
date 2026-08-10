import { useAuth, useUser } from "@clerk/expo";
import { Href, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { HomeScreen } from "@/features/home/home-screen";
import { colors } from "@/theme/tokens";

export default function IndexScreen() {
  const { isLoaded, isSignedIn } = useAuth();
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

  return <HomeScreen />;
}
