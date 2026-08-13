import { Text, View } from "react-native";

export function LessonProgress({ current, total }: { current: number; total: number }) {
  return <View style={{ alignItems: "center", gap: 14 }}><View accessibilityLabel={`${current} daripada ${total} soalan`} style={{ flexDirection: "row", gap: 6, width: "74%" }}>{Array.from({ length: total }, (_, i) => <View key={i} style={{ backgroundColor: i < current ? "#72D500" : "rgba(255,255,255,0.62)", borderColor: "white", borderRadius: 999, borderWidth: i === current - 1 ? 2 : 0, flex: 1, height: 10 }} />)}</View><Text style={{ color: "white", fontFamily: "Nunito_700Bold", fontSize: 18, fontVariant: ["tabular-nums"] }}>Soalan {current} / {total}</Text></View>;
}
