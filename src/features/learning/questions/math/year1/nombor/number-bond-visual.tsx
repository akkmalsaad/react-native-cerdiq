import { Text, View, type DimensionValue } from "react-native";

export function NumberBondVisual({ knownPart, missingPosition, total, width }: { knownPart: number; missingPosition: "left" | "right"; total: number; width: number }) {
  const circle = width * 0.105;
  return <View accessibilityLabel={`Ikatan nombor ${total}`} style={{ height: width * 0.24, width: width * 0.35 }}>
    <View style={{ backgroundColor: "#17175A", height: 2, left: "31%", position: "absolute", top: "39%", transform: [{ rotate: "-27deg" }], width: "38%" }} />
    <View style={{ backgroundColor: "#17175A", height: 2, left: "31%", position: "absolute", top: "62%", transform: [{ rotate: "27deg" }], width: "38%" }} />
    <Circle color="#FFC515" label={String(total)} left="9%" size={circle} top="36%" />
    <Circle color="#D8EEFF" label={missingPosition === "left" ? "?" : String(knownPart)} left="67%" size={circle} top="3%" />
    <Circle color="#FFDCEC" label={missingPosition === "right" ? "?" : String(knownPart)} left="67%" size={circle} top="60%" />
  </View>;
}

function Circle({ color, label, left, size, top }: { color: string; label: string; left: DimensionValue; size: number; top: DimensionValue }) {
  return <View style={{ alignItems: "center", backgroundColor: color, borderColor: "#17175A", borderRadius: 999, borderWidth: 1.5, height: size, justifyContent: "center", left, position: "absolute", top, width: size }}><Text style={{ color: "#17175A", fontFamily: "Nunito_800ExtraBold", fontSize: size * 0.43 }}>{label}</Text></View>;
}
