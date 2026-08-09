import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";

const DESIGN_WIDTH = 852;
const DESIGN_HEIGHT = 1846;
const DESIGN_ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

export function OnboardingScreen() {
  const { height, width } = useWindowDimensions();
  const screenAspectRatio = width / height;

  // Match expo-image's `cover` crop so the hit targets stay aligned with the
  // controls painted into the supplied design on every portrait screen.
  const renderedWidth = screenAspectRatio > DESIGN_ASPECT_RATIO
    ? width
    : height * DESIGN_ASPECT_RATIO;
  const renderedHeight = screenAspectRatio > DESIGN_ASPECT_RATIO
    ? width / DESIGN_ASPECT_RATIO
    : height;
  const horizontalCrop = (renderedWidth - width) / 2;
  const verticalCrop = (renderedHeight - height) / 2;

  const designX = (value: number) => (value / DESIGN_WIDTH) * renderedWidth - horizontalCrop;
  const designY = (value: number) => (value / DESIGN_HEIGHT) * renderedHeight - verticalCrop;

  return (
    <ScrollView
      bounces={false}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{ height, width }}
      scrollEnabled={false}
    >
      <View style={{ flex: 1 }}>
        <Image
          accessibilityLabel="Skrin alu-aluan Cerdiq bersama Awi"
          contentFit="cover"
          source={require("../../../assets/images/onboarding-screen-clean.png")}
          style={{ height: "100%", width: "100%" }}
        />

        <Pressable
          accessibilityHint="Memulakan perjalanan pembelajaran Cerdiq"
          accessibilityLabel="Mula sekarang"
          accessibilityRole="button"
          hitSlop={4}
          onPress={() => router.push("/sign-up" as Href)}
          style={({ pressed }) => ({
            height: designY(1711) - designY(1605),
            left: designX(177),
            opacity: pressed ? 0.2 : 1,
            position: "absolute",
            top: designY(1605),
            width: designX(687) - designX(177),
          })}
        />

        <Pressable
          accessibilityHint="Membuka halaman log masuk"
          accessibilityLabel="Saya sudah ada akaun"
          accessibilityRole="link"
          hitSlop={10}
          onPress={() => router.push("/login")}
          style={({ pressed }) => ({
            height: designY(1785) - designY(1735),
            left: designX(275),
            opacity: pressed ? 0.2 : 1,
            position: "absolute",
            top: designY(1735),
            width: designX(610) - designX(275),
          })}
        />
      </View>
    </ScrollView>
  );
}
