import { Pressable, Text, View } from "react-native";
import type { QuizProps } from "@/features/learning/types/quiz";
import { quizColors } from "./quiz-ui";

export function BuildAnswerQuiz({ question, answer, disabled, onChange }: QuizProps) {
  const value = String(answer ?? ""); const slots = question.visualData?.slots ?? 2;
  return <View style={{ gap: 8 }}><View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>{Array.from({ length: slots }, (_, i) => <View key={i} style={{ alignItems: "center", borderBottomColor: quizColors.purple, borderBottomWidth: 3, minHeight: 40, justifyContent: "center", width: 44 }}><Text style={{ color: quizColors.navy, fontFamily: "Nunito_800ExtraBold", fontSize: 25 }}>{value[i] ?? ""}</Text></View>)}</View><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>{Array.from({ length: 10 }, (_, n) => <Pressable key={n} onPress={() => !disabled && value.length < slots && onChange(value + n)} style={{ alignItems: "center", backgroundColor: "#EEE8FF", borderRadius: 11, height: 36, justifyContent: "center", width: "17%" }}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_800ExtraBold", fontSize: 17 }}>{n}</Text></Pressable>)}</View><Pressable onPress={() => !disabled && onChange(value.slice(0, -1))}><Text style={{ color: quizColors.purple, fontFamily: "Nunito_700Bold", fontSize: 12, textAlign: "center" }}>⌫ Padam</Text></Pressable></View>;
}
