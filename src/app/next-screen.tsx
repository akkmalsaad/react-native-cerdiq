import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";

const DESIGN_WIDTH = 853;
const DESIGN_HEIGHT = 1844;
const nextScreen = require("../../assets/images/Next Screen.png");

type Action = {
  accessibilityLabel: string;
  height: number;
  href: Href;
  left: number;
  navigation: "push" | "replace";
  top: number;
  width: number;
};

const actions: Action[] = [
  { accessibilityLabel: "Buka mata ganjaran", height: 84, href: "/rewards" as Href, left: 572, navigation: "push", top: 105, width: 157 },
  { accessibilityLabel: "Buka profil", height: 84, href: "/profile" as Href, left: 739, navigation: "push", top: 105, width: 84 },
  { accessibilityLabel: "Ulangi topik ini", height: 177, href: "/number-year-1" as Href, left: 67, navigation: "replace", top: 1471, width: 321 },
  { accessibilityLabel: "Ke topik seterusnya", height: 177, href: "/learning" as Href, left: 417, navigation: "replace", top: 1471, width: 368 },
];

export default function NextScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { width } = useWindowDimensions();
  const scale = width / DESIGN_WIDTH;
  const canvasHeight = DESIGN_HEIGHT * scale;

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return (
    <ScrollView
      bounces={false}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{ height: canvasHeight, width }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FCFBFF", flex: 1 }}
    >
      <StatusBar hidden />
      <View style={{ height: canvasHeight, width }}>
        <Image
          accessibilityLabel="Skrin tamat topik Nombor Hingga 100"
          contentFit="fill"
          source={nextScreen}
          style={{ height: canvasHeight, width }}
        />
        <View
          pointerEvents="none"
          style={{
            backgroundColor: "#FCFBFF",
            bottom: 0,
            left: 0,
            position: "absolute",
            top: 1680 * scale,
            width,
          }}
        />

        {actions.map((action) => (
          <Pressable
            accessibilityLabel={action.accessibilityLabel}
            accessibilityRole="button"
            key={action.accessibilityLabel}
            onPress={() => action.navigation === "push" ? router.push(action.href) : router.replace(action.href)}
            style={{
              height: action.height * scale,
              left: action.left * scale,
              position: "absolute",
              top: action.top * scale,
              width: action.width * scale,
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
