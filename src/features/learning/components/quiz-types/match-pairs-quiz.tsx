import { Text, View } from "react-native";
import type { QuizProps } from "@/features/learning/types/quiz";
import { Choice } from "./quiz-ui";

export function MatchPairsQuiz({ question, answer, disabled, onChange }: QuizProps) {
  const state = (answer ?? { pairs: {}, selected: null }) as { pairs: Record<string, string>; selected: string | null };
  const pairs = question.visualData?.pairs ?? [];
  const chooseRight = (right: string) => { if (!disabled && state.selected) onChange({ pairs: { ...state.pairs, [state.selected]: right }, selected: null }); };
  return <View style={{ flexDirection: "row", gap: 12 }}><View style={{ flex: 1, gap: 9 }}>{pairs.map((p) => <Choice key={p.left} label={p.left} selected={state.selected === p.left} onPress={() => !disabled && onChange({ ...state, selected: p.left })}><Text style={{ color: "#25205F", fontFamily: "Nunito_700Bold", textAlign: "center" }}>{p.left}</Text></Choice>)}</View><View style={{ flex: 1, gap: 9 }}>{[...pairs].reverse().map((p) => <Choice key={p.right} label={p.right} selected={Object.values(state.pairs).includes(p.right)} onPress={() => chooseRight(p.right)}><Text style={{ color: "#25205F", fontFamily: "Nunito_700Bold", textAlign: "center" }}>{p.right}</Text></Choice>)}</View></View>;
}
