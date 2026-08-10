import { useAuth, useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
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
const AGES = [7, 8, 9, 10, 11, 12] as const;

type Gender = "female" | "male";
type Standard = 1 | 2 | 3 | 4 | 5 | 6;

type ChildProfile = {
  age: (typeof AGES)[number];
  createdAt: string;
  gender: Gender;
  id: string;
  name: string;
  parentId: string;
  standard: Standard;
};

type DesignBox = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

function profileMessage(error: unknown) {
  if (typeof error === "object" && error && "errors" in error) {
    const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors;
    return errors?.[0]?.longMessage ?? errors?.[0]?.message ?? "Sila cuba lagi.";
  }
  return "Sila cuba lagi.";
}

export function CreateProfileScreen() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const { height, width } = useWindowDimensions();
  const [name, setName] = useState("");
  const [age, setAge] = useState<(typeof AGES)[number] | null>(null);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [gender, setGender] = useState<Gender | null>(null);
  const [saving, setSaving] = useState(false);

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

  if (!authLoaded || !userLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;
  if (!user) return null;
  if (user.unsafeMetadata.profileSetupComplete === true) return <Redirect href="/" />;

  const handleContinue = async () => {
    if (!name.trim() || !age || !gender) {
      Alert.alert("Profil belum lengkap", "Masukkan nama, pilih umur dan jantina untuk teruskan.");
      return;
    }

    setSaving(true);
    try {
      const childProfile: ChildProfile = {
        age,
        createdAt: new Date().toISOString(),
        gender,
        id: `child-${Date.now()}`,
        name: name.trim(),
        parentId: user.id,
        standard: (age - 6) as Standard,
      };
      const savedProfiles = Array.isArray(user.unsafeMetadata.childProfiles)
        ? user.unsafeMetadata.childProfiles
        : [];

      await user.updateMetadata({
        unsafeMetadata: {
          activeChildProfileId: childProfile.id,
          childProfile,
          childProfiles: [...savedProfiles, childProfile],
          profileSetupComplete: true,
        },
      });
      router.replace("/");
    } catch (error) {
      Alert.alert("Profil tidak dapat disimpan", profileMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleAgeDropdownToggle = () => {
    Keyboard.dismiss();
    setIsAgeDropdownOpen((isOpen) => !isOpen);
  };

  const handleAgeSelect = (selectedAge: (typeof AGES)[number]) => {
    setAge(selectedAge);
    setIsAgeDropdownOpen(false);
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
            accessibilityLabel="Skrin cipta profil Cerdiq bersama Awi"
            contentFit="cover"
            source={isAgeDropdownOpen
              ? require("../../../assets/images/create profile.png")
              : require("../../../assets/images/create-profile-closed.png")}
            style={{ height: "100%", width: "100%" }}
          />

          <TextInput
            accessibilityLabel="Nama anak"
            autoCapitalize="words"
            autoComplete="name"
            onChangeText={setName}
            placeholder="Masukkan nama penuh kamu"
            placeholderTextColor="#A9A3DA"
            returnKeyType="done"
            style={[
              boxStyle(isAgeDropdownOpen
                ? { left: 196, right: 704, top: 895, bottom: 940 }
                : { left: 196, right: 704, top: 905, bottom: 950 }),
              {
                backgroundColor: "#FFFFFF",
                color: "#25204F",
                fontFamily: "Nunito_600SemiBold",
                fontSize: 16,
                paddingHorizontal: 12,
                paddingVertical: 0,
              },
            ]}
            value={name}
          />

          {age ? (
            <Text
              accessibilityLabel={`Umur dipilih ${age} tahun`}
              style={[
                boxStyle(isAgeDropdownOpen
                  ? { left: 198, right: 650, top: 1018, bottom: 1065 }
                  : { left: 198, right: 650, top: 1038, bottom: 1085 }),
                {
                  backgroundColor: "#FFFFFF",
                  color: "#26216F",
                  fontFamily: "Nunito_600SemiBold",
                  fontSize: 16,
                  includeFontPadding: false,
                  paddingHorizontal: 12,
                  textAlignVertical: "center",
                },
              ]}
            >
              {age} Tahun
            </Text>
          ) : null}

          <Pressable
            accessibilityLabel="Pilih umur"
            accessibilityRole="button"
            accessibilityState={{ expanded: isAgeDropdownOpen }}
            onPress={handleAgeDropdownToggle}
            style={[
              boxStyle(isAgeDropdownOpen
                ? { left: 121, right: 724, top: 1005, bottom: 1076 }
                : { left: 121, right: 724, top: 1026, bottom: 1098 }),
              { zIndex: 1 },
            ]}
          />

          {isAgeDropdownOpen
            ? AGES.map((ageOption, index) => {
                const top = 1082 + index * 44;
                return (
                  <Pressable
                    accessibilityLabel={`Pilih umur ${ageOption} tahun`}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: age === ageOption }}
                    key={ageOption}
                    onPress={() => handleAgeSelect(ageOption)}
                    style={({ pressed }) => [
                      boxStyle({ left: 164, right: 710, top, bottom: top + 42 }),
                      {
                        backgroundColor: age === ageOption ? "rgba(108, 50, 217, 0.10)" : "transparent",
                        borderRadius: 8,
                        opacity: pressed ? 0.45 : 1,
                        zIndex: 1,
                      },
                    ]}
                  />
                );
              })
            : null}

          <Pressable
            accessibilityLabel="Lelaki"
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === "male" }}
            onPress={() => setGender("male")}
            style={({ pressed }) => [
              boxStyle(isAgeDropdownOpen
                ? { left: 138, right: 416, top: 1400, bottom: 1539 }
                : { left: 127, right: 418, top: 1173, bottom: 1330 }),
              {
                borderColor: gender === "male" ? "#6C32D9" : "transparent",
                borderRadius: 24,
                borderWidth: 3,
                opacity: pressed ? 0.55 : 1,
              },
            ]}
          />

          <Pressable
            accessibilityLabel="Perempuan"
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === "female" }}
            onPress={() => setGender("female")}
            style={({ pressed }) => [
              boxStyle(isAgeDropdownOpen
                ? { left: 436, right: 714, top: 1400, bottom: 1539 }
                : { left: 434, right: 718, top: 1173, bottom: 1330 }),
              {
                borderColor: gender === "female" ? "#6C32D9" : "transparent",
                borderRadius: 24,
                borderWidth: 3,
                opacity: pressed ? 0.55 : 1,
              },
            ]}
          />

          <Pressable
            accessibilityLabel="Teruskan ke halaman utama"
            accessibilityRole="button"
            disabled={saving}
            onPress={() => void handleContinue()}
            style={({ pressed }) => [
              boxStyle(isAgeDropdownOpen
                ? { left: 120, right: 733, top: 1557, bottom: 1639 }
                : { left: 121, right: 728, top: 1355, bottom: 1431 }),
              {
                alignItems: "center",
                justifyContent: "center",
                opacity: saving ? 0.72 : pressed ? 0.3 : 1,
              },
            ]}
          >
            {saving ? <ActivityIndicator color="#FFFFFF" /> : null}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
