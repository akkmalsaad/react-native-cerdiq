import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

const DESIGN_WIDTH = 853;
const DESIGN_HEIGHT = 1844;
const DESIGN_ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

type DesignBox = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

const inputTextStyle = {
  color: "#25204F",
  fontFamily: "Nunito_600SemiBold",
  fontSize: 16,
  paddingHorizontal: 12,
  paddingVertical: 0,
} as const;

export function SignUpScreen() {
  const { height, width } = useWindowDimensions();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const screenAspectRatio = width / height;
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
  const boxStyle = ({ bottom, left, right, top }: DesignBox) => ({
    height: designY(bottom) - designY(top),
    left: designX(left),
    position: "absolute" as const,
    top: designY(top),
    width: designX(right) - designX(left),
  });

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert("Maklumat belum lengkap", "Sila isi nama penuh, e-mel dan kata laluan.");
      return;
    }

    const authorizationRoute = `/authorization?email=${encodeURIComponent(email.trim())}&name=${encodeURIComponent(fullName.trim())}`;
    router.push(authorizationRoute as Href);
  };

  const handleSocialLogin = (provider: "Apple" | "Google") => {
    Alert.alert(
      `Teruskan dengan ${provider}`,
      "Sambungan Clerk diperlukan untuk melengkapkan log masuk sosial."
    );
  };

  return (
    <KeyboardAvoidingView behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <StatusBar hidden />
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ height, width }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View style={{ flex: 1 }}>
          <Image
            accessibilityLabel="Skrin pendaftaran akaun Cerdiq bersama Awi"
            contentFit="cover"
            source={require("../../../assets/images/sign-up-screen-clean.png")}
            style={{ height: "100%", width: "100%" }}
          />

          <TextInput
            accessibilityLabel="Nama penuh"
            autoCapitalize="words"
            autoComplete="name"
            onChangeText={setFullName}
            placeholder="Nama Penuh"
            placeholderTextColor="#A9ADC2"
            returnKeyType="next"
            style={[boxStyle({ left: 202, right: 704, top: 1018, bottom: 1074 }), inputTextStyle, { backgroundColor: "#FFFFFF" }]}
            value={fullName}
          />

          <TextInput
            accessibilityLabel="E-mel"
            autoCapitalize="none"
            autoComplete="email"
            inputMode="email"
            onChangeText={setEmail}
            placeholder="E-mel"
            placeholderTextColor="#A9ADC2"
            returnKeyType="next"
            style={[boxStyle({ left: 202, right: 704, top: 1099, bottom: 1155 }), inputTextStyle, { backgroundColor: "#FFFFFF" }]}
            value={email}
          />

          <TextInput
            accessibilityLabel="Kata laluan"
            autoCapitalize="none"
            autoComplete="new-password"
            onChangeText={setPassword}
            onSubmitEditing={handleRegister}
            placeholder="Kata Laluan"
            placeholderTextColor="#A9ADC2"
            returnKeyType="done"
            secureTextEntry={!passwordVisible}
            style={[boxStyle({ left: 202, right: 650, top: 1180, bottom: 1236 }), inputTextStyle, { backgroundColor: "#FFFFFF" }]}
            value={password}
          />

          <Pressable
            accessibilityLabel={passwordVisible ? "Sembunyikan kata laluan" : "Tunjukkan kata laluan"}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={boxStyle({ left: 648, right: 710, top: 1178, bottom: 1238 })}
          />

          <Pressable
            accessibilityLabel="Daftar"
            accessibilityRole="button"
            onPress={handleRegister}
            style={({ pressed }) => [
              boxStyle({ left: 131, right: 722, top: 1265, bottom: 1348 }),
              { opacity: pressed ? 0.22 : 1 },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan dengan Google"
            accessibilityRole="button"
            onPress={() => handleSocialLogin("Google")}
            style={({ pressed }) => [
              boxStyle({ left: 131, right: 722, top: 1428, bottom: 1516 }),
              { opacity: pressed ? 0.22 : 1 },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan dengan Apple"
            accessibilityRole="button"
            onPress={() => handleSocialLogin("Apple")}
            style={({ pressed }) => [
              boxStyle({ left: 131, right: 722, top: 1533, bottom: 1621 }),
              { opacity: pressed ? 0.22 : 1 },
            ]}
          />

          <Pressable
            accessibilityHint="Membuka skrin log masuk"
            accessibilityLabel="Log masuk"
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.push("/login")}
            style={({ pressed }) => [
              boxStyle({ left: 450, right: 590, top: 1644, bottom: 1692 }),
              { opacity: pressed ? 0.25 : 1 },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
