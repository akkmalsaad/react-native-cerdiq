import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { QuizAnswerBox, type QuizBoxState } from "@/features/learning/components/quiz-boxes";
import { Choice as FloatingChoice, quizColors } from "@/features/learning/components/quiz-types/quiz-ui";
import type { QuizContentFeedback } from "@/features/learning/quiz/quiz-content-types";
import { validateAnswer } from "./validate-answer";
import { CompareIconGroups } from "./compare-icon-groups";
import { CountBlocks } from "./count-blocks";
import { NumberBondVisual } from "./number-bond-visual";
import type { MathQuestion } from "./types";

export type QuestionRendererHandle = { checkAnswer: () => boolean; reset: () => void; retry: () => void };

export const QuestionRenderer = forwardRef<QuestionRendererHandle, { canvasWidth: number; feedback: QuizContentFeedback; onReadyChange: (ready: boolean) => void; question: MathQuestion }>(function QuestionRenderer({ canvasWidth, feedback, onReadyChange, question }, ref) {
  const [answer, setAnswer] = useState<number | string | number[] | null>(null);
  useEffect(() => setAnswer(null), [question.id]);
  useEffect(() => onReadyChange(answer !== null && (!Array.isArray(answer) || answer.length === (question.answer as number[]).length)), [answer, onReadyChange, question.answer]);
  useImperativeHandle(ref, () => ({ checkAnswer: () => validateAnswer(question, answer).correct, reset: () => setAnswer(null), retry: () => setAnswer(null) }), [answer, question]);

  const displayOptions = useMemo(() => {
    if (question.options) return question.options;
    const correct = Number(question.answer);
    const values = new Set([correct]);
    for (let distance = 1; values.size < 4; distance += 1) {
      if (correct - distance >= 0) values.add(correct - distance);
      if (values.size < 4) values.add(correct + distance);
    }
    return [...values].sort((a, b) => ((question.signature.charCodeAt(0) + a) % 5) - ((question.signature.charCodeAt(0) + b) % 5));
  }, [question]);

  const choose = (value: number | string) => { if (feedback === "idle") setAnswer(value); };
  const ordered = Array.isArray(answer) ? answer : [];
  const displayNumbers = question.visualData?.numbers ?? [];
  return <View style={{ alignItems: "center", flex: 1, gap: canvasWidth * 0.018, justifyContent: "center", paddingHorizontal: "4%" }}>
    {question.type === "number_bond" ? <NumberBondVisual knownPart={question.visualData!.knownPart!} missingPosition={question.visualData!.missingPosition!} total={question.visualData!.total!} width={canvasWidth} /> : null}
    {question.type === "visual_count" ? <CountBlocks count={question.visualData!.count!} width={canvasWidth} /> : null}
    {question.type === "missing_number" ? <View style={{ flexDirection: "row", gap: 8 }}>{displayNumbers.map((value, index) => <NumberTile key={index} label={index === question.visualData?.missingIndex ? "?" : String(value)} width={canvasWidth} />)}</View> : null}
    {question.type === "number_spelling" ? <NumberTile label={String(question.visualData!.number!)} large width={canvasWidth} /> : null}
    {question.type === "compare_icons" ? <CompareIconGroups icon={question.visualData!.iconType!} leftCount={question.visualData!.leftCount!} rightCount={question.visualData!.rightCount!} width={canvasWidth} /> : null}
    {question.type === "ordering" ? <><View style={{ flexDirection: "row", gap: 7 }}>{Array.from({ length: (question.options?.length ?? 0) }, (_, index) => <NumberTile key={index} label={ordered[index] === undefined ? "__" : String(ordered[index])} width={canvasWidth} />)}</View><View style={{ flexDirection: "row", gap: 7 }}>{(question.options as number[]).filter((value) => !ordered.includes(value)).map((value) => <Choice key={value} label={String(value)} selected={false} width={canvasWidth} onPress={() => feedback === "idle" && setAnswer([...ordered, value])} />)}</View>{ordered.length ? <Pressable onPress={() => feedback === "idle" && setAnswer(ordered.slice(0, -1))}><Text style={{ color: "#5621DD", fontFamily: "Nunito_700Bold" }}>Padam pilihan terakhir</Text></Pressable> : null}</> : null}
    {question.type === "number_spelling" ? <View style={{ flexDirection: "row", flexWrap: "wrap", gap: canvasWidth * 0.02, justifyContent: "center", width: "100%" }}>{(question.options as string[]).map((value) => { const selected = answer === value; const isCorrectPick = selected && feedback === "correct"; const isWrongPick = selected && feedback === "wrong"; return <FloatingChoice key={value} correct={isCorrectPick} label={value} selected={selected} wrong={isWrongPick} onPress={() => choose(value)}><Text style={{ color: isCorrectPick ? quizColors.green : isWrongPick ? quizColors.red : selected ? quizColors.purple : quizColors.navy, fontFamily: "Nunito_800ExtraBold", fontSize: canvasWidth * 0.034, textAlign: "center" }}>{value}</Text></FloatingChoice>; })}</View> : null}
    {question.type !== "ordering" && question.type !== "number_spelling" ? <View style={{ flexDirection: "row", flexWrap: "wrap", gap: canvasWidth * 0.012, justifyContent: "center", width: "100%" }}>{displayOptions.map((value) => <Choice key={value} label={String(value)} selected={answer === value} feedback={feedback} correct={String(value) === String(question.answer)} width={canvasWidth} onPress={() => choose(value)} />)}</View> : null}
  </View>;
});

function NumberTile({ label, large = false, width }: { label: string; large?: boolean; width: number }) { return <View style={{ alignItems: "center", backgroundColor: label === "?" ? "#F1ECFF" : "#FAF9FF", borderColor: "#BFAEF2", borderRadius: width * (large ? 0.024 : 0.018), borderWidth: 1.5, height: width * (large ? 0.13 : 0.09), justifyContent: "center", width: width * (large ? 0.24 : 0.1) }}><Text style={{ color: "#17175A", fontFamily: "Nunito_800ExtraBold", fontSize: width * (large ? 0.06 : 0.038) }}>{label}</Text></View>; }
function Choice({ correct, feedback = "idle", label, onPress, selected, width }: { correct?: boolean; feedback?: QuizContentFeedback; label: string; onPress: () => void; selected: boolean; width: number }) {
  const state: QuizBoxState = selected && feedback === "correct" && correct ? "correct" : selected && feedback === "wrong" ? "wrong" : selected ? "selected" : "default";
  return <QuizAnswerBox accessibilityLabel={label} onPress={onPress} selected={selected} state={state} style={{ height: width * 0.15, width: width * 0.17 }}><Text style={{ color: state === "default" ? "#17175A" : "white", fontFamily: "Nunito_800ExtraBold", fontSize: width * 0.038, textAlign: "center" }}>{label}</Text></QuizAnswerBox>;
}
