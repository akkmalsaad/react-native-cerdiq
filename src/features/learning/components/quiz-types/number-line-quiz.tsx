import { Pressable, Text, View } from "react-native";
import type { QuizProps } from "@/features/learning/types/quiz";
import { quizColors } from "./quiz-ui";

export function NumberLineQuiz({ question, answer, disabled, onChange }: QuizProps) {
  const { min = 0, max = 10, step = 1 } = question.visualData ?? {};
  const values = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);
  return <View style={{ paddingVertical: 18 }}><View style={{ backgroundColor: quizColors.purple, height: 4, left: 20, position: "absolute", right: 20, top: 38 }} /><View style={{ flexDirection: "row", justifyContent: "space-between" }}>{values.map((value) => { const selected = Number(answer) === value; return <Pressable accessibilityLabel={`Pilih ${value}`} key={value} onPress={() => !disabled && onChange(value)} style={{ alignItems: "center", gap: 8, minWidth: 32 }}><View style={{ backgroundColor: selected ? quizColors.green : "white", borderColor: quizColors.purple, borderRadius: 999, borderWidth: 3, height: selected ? 28 : 20, width: selected ? 28 : 20 }} /><Text style={{ color: quizColors.navy, fontFamily: "Nunito_700Bold", fontSize: values.length > 8 ? 11 : 14 }}>{value}</Text></Pressable>; })}</View></View>;
}
