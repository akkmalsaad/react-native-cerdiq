import { useAuth, useSignIn, useSSO } from "@clerk/expo";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
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

type FocusedField = "email" | "password" | null;

const inputTextStyle = {
  color: "#25204F",
  fontFamily: "Nunito_600SemiBold",
  fontSize: 16,
  paddingHorizontal: 12,
  paddingVertical: 0,
} as const;

function clerkMessage(error: unknown) {
  if (typeof error === "object" && error && "errors" in error) {
    const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors;
    return errors?.[0]?.longMessage ?? errors?.[0]?.message ?? "Sila cuba lagi.";
  }
  return "Sila cuba lagi.";
}

export default function LoginScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

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

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/" />;

  const finishSignIn = async () => {
    if (signIn.status !== "complete") {
      Alert.alert("Pengesahan diperlukan", "Akaun ini memerlukan langkah pengesahan tambahan.");
      return;
    }
    await signIn.finalize({
      navigate: ({ session }) => {
        if (session?.currentTask) {
          Alert.alert("Tindakan diperlukan", "Sila lengkapkan tindakan keselamatan akaun anda.");
          return;
        }
        router.replace("/");
      },
    });
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Maklumat belum lengkap", "Masukkan e-mel dan kata laluan anda.");
      return;
    }
    const { error } = await signIn.password({ emailAddress: email.trim(), password });
    if (error) {
      Alert.alert("Log masuk tidak berjaya", clerkMessage(error));
      return;
    }
    await finishSignIn();
  };

  const handleSocial = async (strategy: "oauth_google" | "oauth_apple") => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      } else if (signUp?.status === "missing_requirements") {
        Alert.alert("Maklumat diperlukan", "Akaun sosial ini memerlukan maklumat tambahan sebelum boleh digunakan.");
      }
    } catch (error) {
      Alert.alert("Log masuk sosial tidak berjaya", clerkMessage(error));
    }
  };

  const busy = fetchStatus === "fetching";

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
            accessibilityLabel="Skrin log masuk Cerdiq bersama Awi"
            contentFit="cover"
            source={require("../../assets/images/Sign in Screen.png")}
            style={{ height: "100%", width: "100%" }}
          />

          <TextInput
            accessibilityLabel="E-mel"
            autoCapitalize="none"
            autoComplete="email"
            inputMode="email"
            onBlur={() => setFocusedField(null)}
            onChangeText={setEmail}
            onFocus={() => setFocusedField("email")}
            placeholder={focusedField === "email" ? "" : "E-mel"}
            placeholderTextColor="#A9ADC2"
            returnKeyType="next"
            style={[
              boxStyle({ left: 178, right: 710, top: 920, bottom: 983 }),
              inputTextStyle,
              { backgroundColor: "#FFFFFF" },
            ]}
            value={email}
          />

          <TextInput
            accessibilityLabel="Kata laluan"
            autoCapitalize="none"
            autoComplete="current-password"
            onBlur={() => setFocusedField(null)}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onSubmitEditing={() => void handleLogin()}
            placeholder={focusedField === "password" ? "" : "Kata Laluan"}
            placeholderTextColor="#A9ADC2"
            returnKeyType="done"
            secureTextEntry
            style={[
              boxStyle({ left: 178, right: 665, top: 1049, bottom: 1111 }),
              inputTextStyle,
              { backgroundColor: "#FFFFFF" },
            ]}
            value={password}
          />

          <Pressable
            accessibilityLabel="Log masuk"
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleLogin()}
            style={({ pressed }) => [
              boxStyle({ left: 97, right: 758, top: 1157, bottom: 1245 }),
              { alignItems: "center", justifyContent: "center", opacity: busy ? 0.7 : pressed ? 0.25 : 1 },
            ]}
          >
            {busy ? <ActivityIndicator color="#FFFFFF" /> : null}
          </Pressable>

          <Pressable
            accessibilityLabel="Teruskan dengan Google"
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleSocial("oauth_google")}
            style={({ pressed }) => [
              boxStyle({ left: 97, right: 758, top: 1331, bottom: 1415 }),
              { opacity: pressed ? 0.25 : 1 },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan dengan Apple"
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleSocial("oauth_apple")}
            style={({ pressed }) => [
              boxStyle({ left: 97, right: 758, top: 1449, bottom: 1534 }),
              { opacity: pressed ? 0.25 : 1 },
            ]}
          />

          <Pressable
            accessibilityHint="Membuka skrin pendaftaran akaun"
            accessibilityLabel="Daftar akaun"
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.push("/sign-up")}
            style={({ pressed }) => [
              boxStyle({ left: 463, right: 602, top: 1557, bottom: 1605 }),
              { opacity: pressed ? 0.25 : 1 },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
