import { Pressable, Text, View } from "react-native";
import type { ReactNode } from "react";

export const quizColors = { purple: "#5422D6", navy: "#17175A", pale: "#F7F4FF", border: "#E2DAFA", green: "#52C72F", red: "#E86A87" };

export function Choice({ children, selected, correct, wrong, onPress, label }: { children: ReactNode; selected?: boolean; correct?: boolean; wrong?: boolean; onPress: () => void; label: string }) {
  const color = correct ? quizColors.green : wrong ? quizColors.red : selected ? quizColors.purple : quizColors.border;
  return (
    <Pressable accessibilityLabel={label} accessibilityRole="button" onPress={onPress} style={({ pressed }) => ({
      alignItems: "center", backgroundColor: correct ? "#F0FBEA" : wrong ? "#FFF0F4" : selected ? "#F1ECFF" : "#FAF9FF",
      borderColor: color, borderCurve: "continuous", borderRadius: 18, borderWidth: selected || correct || wrong ? 2 : 1,
      minHeight: 48, justifyContent: "center", opacity: pressed ? 0.72 : 1, paddingHorizontal: 9, paddingVertical: 7,
    })}>{children}</Pressable>
  );
}

export function Pill({ text, active }: { text: string; active?: boolean }) {
  return <View style={{ backgroundColor: active ? "white" : "#EEE9FB", borderRadius: 999, paddingHorizontal: 13, paddingVertical: 7 }}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_800ExtraBold", fontSize: 15 }}>{text}</Text></View>;
}
