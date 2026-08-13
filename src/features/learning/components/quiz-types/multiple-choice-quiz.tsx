import { Text, View } from "react-native";
import { BaseTenVisual } from "@/features/learning/components/base-ten-visual";
import { QuizAnswerBox, type QuizBoxState } from "@/features/learning/components/quiz-boxes";
import type { QuizProps } from "@/features/learning/types/quiz";
import { Pill, quizColors } from "./quiz-ui";

export function MultipleChoiceQuiz({ question, answer, disabled, feedback = "idle", onChange }: QuizProps) {
  return <View style={{ gap: 12 }}>
    {question.visualData?.tens !== undefined ? <BaseTenVisual tens={question.visualData.tens} ones={question.visualData.ones ?? 0} /> : null}
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {question.options?.map((option, index) => { const selected = answer === option.value; const state: QuizBoxState = selected && feedback === "correct" ? "correct" : selected && feedback === "wrong" ? "wrong" : selected ? "selected" : "default"; return <View key={option.id} style={{ width: "48%", flexGrow: 1 }}><QuizAnswerBox accessibilityLabel={`Pilihan ${option.label}`} disabled={disabled} selected={selected} state={state} onPress={() => onChange(option.value)} style={{ aspectRatio: 1, width: "100%" }}><View style={{ alignItems: "center", gap: 8 }}><Pill active={selected} text={String.fromCharCode(65 + index)} /><Text numberOfLines={2} style={{ color: state === "default" ? quizColors.navy : "white", fontFamily: "Nunito_800ExtraBold", fontSize: 22, textAlign: "center" }}>{option.label}</Text></View></QuizAnswerBox></View>; })}
    </View>
  </View>;
}
