import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import type { QuizProps } from "@/features/learning/types/quiz";
import { quizColors } from "./quiz-ui";

export function DragDropQuiz({ question, answer, disabled, onChange }: QuizProps) {
  const placements = (answer ?? {}) as Record<string, string>;
  const [selected, setSelected] = useState<string | null>(null);
  const used = new Set(Object.values(placements));
  const available = question.options?.filter((o) => !used.has(String(o.value))) ?? [];
  const place = (zoneId: string) => {
    if (disabled) return;
    const value = selected ?? (available[0] ? String(available[0].value) : null);
    if (value) { onChange({ ...placements, [zoneId]: value }); setSelected(null); }
  };
  return <View style={{ gap: 8 }}>
    <View style={{ flexDirection: "row", gap: 8 }}>{question.visualData?.zones?.map((zone) => <Pressable accessibilityLabel={`Tempat ${zone.label}`} key={zone.id} onPress={() => place(zone.id)} style={{ alignItems: "center", borderColor: placements[zone.id] ? quizColors.green : "#BFAEF2", borderRadius: 14, borderStyle: "dashed", borderWidth: 2, flex: 1, gap: 3, minHeight: 67, justifyContent: "center" }}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_800ExtraBold", fontSize: 12 }}>{zone.label}</Text><Text style={{ color: quizColors.navy, fontFamily: "Nunito_800ExtraBold", fontSize: 22 }}>{placements[zone.id] ?? "LETAK"}</Text></Pressable>)}</View>
    <Text numberOfLines={1} style={{ color: "#77749A", fontFamily: "Nunito_600SemiBold", fontSize: 11, textAlign: "center" }}>Pilih kad, kemudian ketuk ruang sasaran.</Text>
    <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>{available.map((option) => <Pressable accessibilityLabel={`Pilih kad ${option.label}`} key={option.id} onPress={() => setSelected(String(option.value))} style={{ backgroundColor: selected === String(option.value) ? quizColors.purple : "#EEE8FF", borderRadius: 13, minWidth: 54, padding: 10 }}><Text style={{ color: selected === String(option.value) ? "white" : quizColors.purple, fontFamily: "Nunito_800ExtraBold", fontSize: 20, textAlign: "center" }}>{option.label}</Text></Pressable>)}</View>
    {Object.keys(placements).length ? <Pressable onPress={() => !disabled && onChange({})}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_700Bold", fontSize: 12, textAlign: "center" }}>↻ Susun semula</Text></Pressable> : null}
  </View>;
}
