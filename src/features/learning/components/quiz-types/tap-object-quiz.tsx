import { Text, View } from "react-native";
import { BaseTenVisual } from "@/features/learning/components/base-ten-visual";
import type { QuizProps } from "@/features/learning/types/quiz";
import { Choice } from "./quiz-ui";

export function TapObjectQuiz({ question, answer, disabled, feedback = "idle", onChange }: QuizProps) {
  return <View style={{ flexDirection: "row", gap: 6 }}>{question.options?.map((option) => { const selected = answer === option.value; const quantity = option.quantity ?? Number(option.value); return <View key={option.id} style={{ flex: 1 }}><Choice label={`${quantity} objek`} selected={selected} correct={selected && feedback === "correct"} wrong={selected && feedback === "wrong"} onPress={() => !disabled && onChange(option.value)}><BaseTenVisual tens={Math.floor(quantity / 10)} ones={quantity % 10} tiny /></Choice></View>; })}</View>;
}
