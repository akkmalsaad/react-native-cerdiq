import { Pressable, Text, View } from "react-native";
import type { QuizProps } from "@/features/learning/types/quiz";
import { Choice, quizColors } from "./quiz-ui";

export function SortOrderQuiz({ question, answer, disabled, onChange }: QuizProps) {
  const order = (answer ?? []) as string[];
  const remaining = question.options?.filter((o) => !order.includes(String(o.value))) ?? [];
  return <View style={{ gap: 16 }}><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>{Array.from({ length: question.options?.length ?? 0 }, (_, i) => <View key={i} style={{ minWidth: 58, flex: 1 }}><Choice label={`Kedudukan ${i + 1}`} selected={Boolean(order[i])} onPress={() => !disabled && order[i] && onChange(order.filter((_, x) => x !== i))}><Text style={{ color: quizColors.navy, fontFamily: "Nunito_800ExtraBold", fontSize: 21 }}>{order[i] ?? "___"}</Text></Choice></View>)}</View><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, justifyContent: "center" }}>{remaining.map((o) => <Pressable key={o.id} onPress={() => !disabled && onChange([...order, String(o.value)])} style={{ backgroundColor: "#EEE8FF", borderRadius: 14, padding: 14 }}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_800ExtraBold", fontSize: 20 }}>{o.label}</Text></Pressable>)}</View></View>;
}
