import { useAuth, useSignUp, useSSO } from "@clerk/expo";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
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

type FocusedField = "email" | "fullName" | "password" | null;

const VERIFICATION_CODE_LENGTH = 6;

const inputTextStyle = {
  color: "#25204F",
  fontFamily: "Nunito_600SemiBold",
  fontSize: 16,
  paddingHorizontal: 12,
  paddingVertical: 0,
} as const;

export function SignUpScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const { height, width } = useWindowDimensions();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationVisible, setVerificationVisible] = useState(false);
  const verificationInputRef = useRef<TextInput>(null);

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

  const showVerificationModal = () => {
    Keyboard.dismiss();
    setVerificationCode("");
    setVerificationVisible(true);
  };

  if (!isLoaded) return null;
  if (isSignedIn) return <Redirect href="/" />;

  const getErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error && "errors" in error) {
      const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors;
      return errors?.[0]?.longMessage ?? errors?.[0]?.message ?? "Sila cuba lagi.";
    }
    return "Sila cuba lagi.";
  };

  const splitName = () => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") || parts[0] || "" };
  };

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert("Maklumat belum lengkap", "Masukkan nama penuh, e-mel dan kata laluan anda.");
      return;
    }

    const { error } = await signUp.password({ emailAddress: email.trim(), password });
    if (error) {
      Alert.alert("Pendaftaran tidak berjaya", getErrorMessage(error));
      return;
    }

    const { error: nameError } = await signUp.update(splitName());
    if (nameError) {
      Alert.alert("Nama tidak dapat disimpan", getErrorMessage(nameError));
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      Alert.alert("Kod tidak dapat dihantar", getErrorMessage(sendError));
      return;
    }
    showVerificationModal();
  };

  const verifyCode = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      Alert.alert("Kod tidak sah", getErrorMessage(error));
      return;
    }
    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session }) => {
          if (session?.currentTask) {
            Alert.alert("Tindakan diperlukan", "Sila lengkapkan tindakan keselamatan akaun anda.");
            return;
          }
          setVerificationVisible(false);
          router.replace("/");
        },
      });
    }
  };

  const handleVerificationCodeChange = (value: string) => {
    const numericCode = value.replace(/\D/g, "").slice(0, VERIFICATION_CODE_LENGTH);
    setVerificationCode(numericCode);

    if (numericCode.length === VERIFICATION_CODE_LENGTH) {
      Keyboard.dismiss();
      void verifyCode(numericCode);
    }
  };

  const handleSocial = async (strategy: "oauth_google" | "oauth_apple") => {
    try {
      const { createdSessionId, setActive, signUp: socialSignUp } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      } else if (socialSignUp?.status === "missing_requirements") {
        Alert.alert("Maklumat diperlukan", "Akaun sosial ini memerlukan maklumat tambahan sebelum boleh digunakan.");
      }
    } catch (error) {
      Alert.alert("Pendaftaran sosial tidak berjaya", getErrorMessage(error));
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
            accessibilityLabel="Skrin pendaftaran akaun Cerdiq bersama Awi"
            contentFit="cover"
            source={require("../../../assets/images/sign-up-screen-clean.png")}
            style={{ height: "100%", width: "100%" }}
          />

          <TextInput
            accessibilityLabel="Nama penuh"
            autoCapitalize="words"
            autoComplete="name"
            onBlur={() => setFocusedField(null)}
            onChangeText={setFullName}
            onFocus={() => setFocusedField("fullName")}
            placeholder={focusedField === "fullName" ? "" : "Nama Penuh"}
            placeholderTextColor="#A9ADC2"
            returnKeyType="next"
            style={[
              boxStyle({ left: 202, right: 704, top: 1018, bottom: 1074 }),
              inputTextStyle,
              { backgroundColor: "#FFFFFF" },
            ]}
            value={fullName}
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
              boxStyle({ left: 202, right: 704, top: 1099, bottom: 1155 }),
              inputTextStyle,
              { backgroundColor: "#FFFFFF" },
            ]}
            value={email}
          />

          <TextInput
            accessibilityLabel="Kata laluan"
            autoCapitalize="none"
            autoComplete="new-password"
            onBlur={() => setFocusedField(null)}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onSubmitEditing={() => void handleRegister()}
            placeholder={focusedField === "password" ? "" : "Kata Laluan"}
            placeholderTextColor="#A9ADC2"
            returnKeyType="done"
            secureTextEntry={!passwordVisible}
            style={[
              boxStyle({ left: 202, right: 650, top: 1180, bottom: 1236 }),
              inputTextStyle,
              { backgroundColor: "#FFFFFF" },
            ]}
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
            disabled={busy}
            onPress={() => void handleRegister()}
            style={({ pressed }) => [
              boxStyle({ left: 131, right: 722, top: 1265, bottom: 1348 }),
              { opacity: busy ? 0.65 : pressed ? 0.22 : 1 },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan dengan Google"
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleSocial("oauth_google")}
            style={({ pressed }) => [
              boxStyle({ left: 131, right: 722, top: 1428, bottom: 1516 }),
              { opacity: pressed ? 0.22 : 1 },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan dengan Apple"
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleSocial("oauth_apple")}
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

          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setVerificationVisible(false)}
        presentationStyle="overFullScreen"
        transparent
        visible={verificationVisible}
      >
        <KeyboardAvoidingView
          behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Pressable
            accessibilityLabel="Tutup pengesahan"
            onPress={() => setVerificationVisible(false)}
            style={{
              alignItems: "center",
              backgroundColor: "rgba(28, 20, 54, 0.48)",
              flex: 1,
              justifyContent: "center",
              padding: 24,
            }}
          >
            <Pressable
              accessibilityRole="none"
              onPress={() => verificationInputRef.current?.focus()}
              style={{
                backgroundColor: "#FFFFFF",
                borderCurve: "continuous",
                borderRadius: 28,
                boxShadow: "0 18px 45px rgba(45, 22, 90, 0.24)",
                gap: 14,
                maxWidth: 420,
                padding: 24,
                width: "100%",
              }}
            >
              <View style={{ alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#F2EAFE",
                    borderRadius: 999,
                    height: 56,
                    justifyContent: "center",
                    width: 56,
                  }}
                >
                  <Text style={{ fontSize: 27 }}>✉️</Text>
                </View>

                <Text
                  selectable
                  style={{
                    color: "#5421C7",
                    fontFamily: "Nunito_800ExtraBold",
                    fontSize: 24,
                    textAlign: "center",
                  }}
                >
                  Semak E-mel Anda
                </Text>

                <Text
                  selectable
                  style={{
                    color: "#4D5270",
                    fontFamily: "Nunito_500Medium",
                    fontSize: 15,
                    lineHeight: 22,
                    textAlign: "center",
                  }}
                >
                  Kami telah menghantar kod pengesahan 6 digit ke e-mel anda. Masukkan kod tersebut di bawah.
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 6, justifyContent: "center", position: "relative" }}>
                {Array.from({ length: VERIFICATION_CODE_LENGTH }, (_, index) => (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                      backgroundColor: index === verificationCode.length ? "#F8F4FF" : "#FFFFFF",
                      borderColor: index === verificationCode.length ? "#7137DC" : "#DED8EA",
                      borderCurve: "continuous",
                      borderRadius: 12,
                      borderWidth: 1.5,
                      height: 54,
                      justifyContent: "center",
                      width: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "#29214E",
                        fontFamily: "Nunito_700Bold",
                        fontSize: 22,
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {verificationCode[index] ?? ""}
                    </Text>
                  </View>
                ))}

                <TextInput
                  ref={verificationInputRef}
                  accessibilityLabel="Kod pengesahan 6 digit"
                  autoComplete="one-time-code"
                  autoFocus
                  caretHidden
                  inputMode="numeric"
                  keyboardType="number-pad"
                  maxLength={VERIFICATION_CODE_LENGTH}
                  onChangeText={handleVerificationCodeChange}
                  style={{
                    bottom: 0,
                    color: "transparent",
                    left: 0,
                    opacity: 0.01,
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                  textContentType="oneTimeCode"
                  value={verificationCode}
                />
              </View>

              <Text
                selectable
                style={{
                  color: "#8A8FA8",
                  fontFamily: "Nunito_500Medium",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Masukkan digit terakhir untuk terus ke halaman utama.
              </Text>

              <Pressable
                accessibilityLabel="Hantar semula kod pengesahan"
                accessibilityRole="button"
                disabled={busy}
                onPress={async () => {
                  const { error } = await signUp.verifications.sendEmailCode();
                  if (error) Alert.alert("Kod tidak dapat dihantar", getErrorMessage(error));
                }}
                style={{ paddingVertical: 4 }}
              >
                <Text style={{ color: "#7137DC", fontFamily: "Nunito_700Bold", fontSize: 14, textAlign: "center" }}>
                  Hantar Semula Kod
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}
