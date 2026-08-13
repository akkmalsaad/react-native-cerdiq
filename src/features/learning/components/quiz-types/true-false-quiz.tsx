import { Text, View } from "react-native";
import { QuizAnswerBox, type QuizBoxState } from "@/features/learning/components/quiz-boxes";
import type { QuizProps } from "@/features/learning/types/quiz";
import { quizColors } from "./quiz-ui";

export function TrueFalseQuiz({ answer, disabled, feedback = "idle", onChange }: QuizProps) {
  return <View style={{ flexDirection: "row", gap: 12 }}>{([true, false] as const).map((value) => { const selected = answer === value; const state: QuizBoxState = selected && feedback === "correct" ? "correct" : selected && feedback === "wrong" ? "wrong" : selected ? "selected" : "default"; const label = value ? "Betul" : "Salah"; return <View key={label} style={{ flex: 1 }}><QuizAnswerBox accessibilityLabel={label} disabled={disabled} onPress={() => onChange(value)} selected={selected} state={state} style={{ aspectRatio: 1, width: "100%" }}><Text style={{ color: state === "default" ? quizColors.navy : "white", fontFamily: "Nunito_800ExtraBold", fontSize: 20, textAlign: "center" }}>{value ? "✓ BETUL" : "✕ SALAH"}</Text></QuizAnswerBox></View>; })}</View>;
}
