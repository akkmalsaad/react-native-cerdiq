import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { colors } from "@/theme/tokens";

export default function LoginScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
      style={{ backgroundColor: colors.primary[50] }}
    >
      <View style={{ alignItems: "center", gap: 16 }}>
        <Text style={{ color: colors.primary[600], fontFamily: "Nunito_800ExtraBold", fontSize: 30 }}>
          Log Masuk
        </Text>
        <Text style={{ color: colors.navy[700], fontFamily: "Nunito_500Medium", fontSize: 16, textAlign: "center" }}>
          Halaman log masuk akan dibina di sini.
        </Text>
        <Pressable
          accessibilityLabel="Kembali ke halaman alu-aluan"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => ({
            backgroundColor: colors.primary[600],
            borderRadius: 999,
            opacity: pressed ? 0.85 : 1,
            paddingHorizontal: 24,
            paddingVertical: 12,
          })}
        >
          <Text style={{ color: colors.white, fontFamily: "Nunito_700Bold", fontSize: 16 }}>
            Kembali
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
