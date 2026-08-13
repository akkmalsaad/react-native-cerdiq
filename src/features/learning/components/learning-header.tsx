import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function LearningHeader({ title, xp }: { title: string; xp: number }) {
  return <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
    <Pressable accessibilityLabel="Kembali" accessibilityRole="button" onPress={() => router.back()} style={({ pressed }) => ({ alignItems: "center", backgroundColor: "white", borderRadius: 999, height: 52, justifyContent: "center", opacity: pressed ? 0.75 : 1, width: 52 })}><Text style={{ color: "#5422D6", fontFamily: "Nunito_800ExtraBold", fontSize: 35 }}>‹</Text></Pressable>
    <Text numberOfLines={1} style={{ color: "white", flex: 1, fontFamily: "Nunito_800ExtraBold", fontSize: 24, paddingHorizontal: 12, textAlign: "center" }}>{title}</Text>
    <View style={{ alignItems: "center", backgroundColor: "white", borderRadius: 999, flexDirection: "row", gap: 6, minHeight: 48, paddingHorizontal: 14 }}><Text style={{ fontSize: 23 }}>⭐</Text><Text style={{ color: "#17175A", fontFamily: "Nunito_800ExtraBold", fontSize: 17, fontVariant: ["tabular-nums"] }}>{xp}</Text></View>
  </View>;
}
