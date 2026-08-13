import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, Text, View } from "react-native";

import type {
  DragDropContentQuestion,
  LearningContentQuestion,
  MatchPairsContentQuestion,
  MultipleChoiceContentQuestion,
  QuizContentFeedback,
  QuizContentHandle,
} from "@/features/learning/quiz/quiz-content-types";

type QuizContentProps = {
  canvasWidth: number;
  feedback: QuizContentFeedback;
  onReadyChange: (ready: boolean) => void;
  question: LearningContentQuestion;
};

const purple = "#5621DD";
const navy = "#17175A";
const pale = "#FAF9FF";
const border = "#E1DAF8";
const green = "#43BF25";
const red = "#DE5578";

function MultipleChoiceContent({ canvasWidth, disabled, feedback, onSelect, question, selectedOptionId }: {
  canvasWidth: number;
  disabled: boolean;
  feedback: QuizContentFeedback;
  onSelect: (id: string) => void;
  question: MultipleChoiceContentQuestion;
  selectedOptionId: string | null;
}) {
  return <View style={{ flexDirection: "row", flexWrap: "wrap", gap: canvasWidth * 0.012, height: "100%" }}>
    {question.options.map((option, index) => {
      const selected = selectedOptionId === option.id;
      const correct = selected && feedback === "correct";
      const wrong = selected && feedback === "wrong";
      return <Pressable accessibilityLabel={`Pilihan ${String.fromCharCode(65 + index)}, ${option.label}`} accessibilityRole="radio" accessibilityState={{ checked: selected, disabled }} disabled={disabled} key={option.id} onPress={() => onSelect(option.id)} style={({ pressed }) => ({ alignItems: "center", backgroundColor: correct ? "#F0FBEA" : wrong ? "#FFF0F4" : selected ? "#F1ECFF" : pale, borderColor: correct ? green : wrong ? red : selected ? purple : border, borderCurve: "continuous", borderRadius: canvasWidth * 0.027, borderWidth: selected ? 2 : 1, flexDirection: "row", height: "46%", justifyContent: "space-around", opacity: pressed ? 0.8 : 1, paddingHorizontal: "5%", width: "49.2%" })}>
        <View style={{ alignItems: "center", backgroundColor: correct ? green : wrong ? red : purple, borderRadius: 999, height: canvasWidth * 0.06, justifyContent: "center", width: canvasWidth * 0.06 }}><Text style={{ color: "white", fontFamily: "Nunito_800ExtraBold", fontSize: canvasWidth * 0.032 }}>{String.fromCharCode(65 + index)}</Text></View>
        <Text selectable style={{ color: navy, fontFamily: "Nunito_800ExtraBold", fontSize: canvasWidth * 0.047 }}>{option.label}</Text>
      </Pressable>;
    })}
  </View>;
}

function MatchPairsContent({ activeLeftId, feedback, onLeft, onRight, question, userPairs }: {
  activeLeftId: string | null;
  feedback: QuizContentFeedback;
  onLeft: (id: string) => void;
  onRight: (id: string) => void;
  question: MatchPairsContentQuestion;
  userPairs: Record<string, string>;
}) {
  const rightItems = useMemo(() => [...question.pairs].reverse(), [question.id, question.pairs]);
  const correctPairs = Object.fromEntries(question.pairs.map((pair) => [pair.leftId, pair.rightId]));
  const pairedLeftIds = Object.keys(userPairs);
  const leftForRight = (rightId: string) => pairedLeftIds.find((leftId) => userPairs[leftId] === rightId);
  const pairPalette = [
    { background: "#F1ECFF", border: "#5621DD" },
    { background: "#EAF6FF", border: "#1688E8" },
    { background: "#FFF2E5", border: "#ED8120" },
  ];
  const pairStyle = (leftId?: string) => {
    if (!leftId) return { background: pale, border };
    if (feedback !== "idle") return correctPairs[leftId] === userPairs[leftId]
      ? { background: "#F0FBEA", border: green }
      : { background: "#FFF0F4", border: red };
    return pairPalette[question.pairs.findIndex((pair) => pair.leftId === leftId) % pairPalette.length];
  };
  return <View style={{ flexDirection: "row", gap: 12, paddingTop: 8 }}>
    <View style={{ flex: 1, gap: 9 }}>{question.pairs.map((pair) => { const paired = Boolean(userPairs[pair.leftId]); const colors = pairStyle(activeLeftId === pair.leftId || paired ? pair.leftId : undefined); return <Pressable accessibilityLabel={pair.leftLabel} key={pair.leftId} onPress={() => onLeft(pair.leftId)} style={{ alignItems: "center", backgroundColor: colors.background, borderColor: colors.border, borderRadius: 16, borderWidth: activeLeftId === pair.leftId || paired ? 2 : 1, justifyContent: "center", minHeight: 52, padding: 8 }}><Text selectable style={{ color: navy, fontFamily: "Nunito_700Bold" }}>{pair.leftLabel}</Text></Pressable>; })}</View>
    <View style={{ flex: 1, gap: 9 }}>{rightItems.map((pair) => { const leftId = leftForRight(pair.rightId); const colors = pairStyle(leftId); return <Pressable accessibilityLabel={pair.rightLabel} key={pair.rightId} onPress={() => onRight(pair.rightId)} style={{ alignItems: "center", backgroundColor: colors.background, borderColor: colors.border, borderRadius: 16, borderWidth: leftId ? 2 : 1, justifyContent: "center", minHeight: 52, padding: 8 }}><Text selectable style={{ color: navy, fontFamily: "Nunito_700Bold" }}>{pair.rightLabel}</Text></Pressable>; })}</View>
  </View>;
}

function DraggableDigit({ disabled, label, onDrop }: { disabled: boolean; label: string; onDrop: (side: "left" | "right") => void }) {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => !disabled && Math.abs(gesture.dy) > 3,
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy < -24) onDrop(gesture.dx < 0 ? "left" : "right");
      Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
    },
  }), [disabled, onDrop, position]);
  return <Animated.View {...panResponder.panHandlers} style={{ transform: position.getTranslateTransform() }}><View style={{ alignItems: "center", backgroundColor: "#EEE8FF", borderColor: purple, borderRadius: 14, borderWidth: 2, height: 54, justifyContent: "center", width: 64 }}><Text style={{ color: purple, fontFamily: "Nunito_800ExtraBold", fontSize: 25 }}>{label}</Text></View></Animated.View>;
}

function DragDropContent({ feedback, onPlace, onRemove, placements, question }: { feedback: QuizContentFeedback; onPlace: (targetId: string, itemId: string) => void; onRemove: (targetId: string) => void; placements: Record<string, string>; question: DragDropContentQuestion }) {
  const used = new Set(Object.values(placements));
  return <View style={{ gap: 18, paddingTop: 8 }}>
    <View style={{ flexDirection: "row", gap: 12 }}>{question.targets.map((target) => { const itemId = placements[target.id]; const correct = feedback !== "idle" && question.correctPlacements[target.id] === itemId; const wrong = feedback === "wrong" && itemId && !correct; return <Pressable accessibilityHint={itemId ? "Ketuk untuk alihkan digit ini" : undefined} accessibilityLabel={`${target.label}: ${itemId ?? "kosong"}`} disabled={feedback !== "idle" || !itemId} key={target.id} onPress={() => onRemove(target.id)} style={{ alignItems: "center", borderColor: correct ? green : wrong ? red : itemId ? purple : "#BFAEF2", borderRadius: 16, borderStyle: "dashed", borderWidth: 2, flex: 1, gap: 4, justifyContent: "center", minHeight: 82 }}><Text style={{ color: purple, fontFamily: "Nunito_800ExtraBold", fontSize: 13 }}>{target.label}</Text><Text style={{ color: navy, fontFamily: "Nunito_800ExtraBold", fontSize: 27 }}>{itemId ?? "LETAK"}</Text></Pressable>; })}</View>
    <Text style={{ color: "#77749A", fontFamily: "Nunito_600SemiBold", fontSize: 12, textAlign: "center" }}>Seret digit ke ruang Puluh atau Sa.</Text>
    <View style={{ flexDirection: "row", gap: 18, justifyContent: "center" }}>{question.items.filter((item) => !used.has(item.id)).map((item) => <DraggableDigit disabled={feedback !== "idle"} key={item.id} label={item.label} onDrop={(side) => onPlace(side === "left" ? question.targets[0].id : question.targets[1].id, item.id)} />)}</View>
  </View>;
}

export const QuizContent = forwardRef<QuizContentHandle, QuizContentProps>(function QuizContent({ canvasWidth, feedback, onReadyChange, question }, ref) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [userPairs, setUserPairs] = useState<Record<string, string>>({});
  const [placements, setPlacements] = useState<Record<string, string>>({});

  const resetAll = () => { setSelectedOptionId(null); setActiveLeftId(null); setUserPairs({}); setPlacements({}); };
  useEffect(resetAll, [question.id]);
  const ready = question.type === "multiple-choice" ? selectedOptionId !== null : question.type === "match-pairs" ? Object.keys(userPairs).length === question.pairs.length : Object.keys(placements).length === question.targets.length;
  useEffect(() => onReadyChange(ready), [onReadyChange, ready]);

  useImperativeHandle(ref, () => ({
    checkAnswer: () => {
      if (question.type === "multiple-choice") return selectedOptionId === question.correctOptionId;
      if (question.type === "match-pairs") return question.pairs.every((pair) => userPairs[pair.leftId] === pair.rightId);
      return question.targets.every((target) => placements[target.id] === question.correctPlacements[target.id]);
    },
    reset: resetAll,
    retry: () => {
      if (question.type === "match-pairs") setUserPairs((current) => Object.fromEntries(Object.entries(current).filter(([leftId, rightId]) => question.pairs.some((pair) => pair.leftId === leftId && pair.rightId === rightId))));
      else if (question.type === "drag-drop") setPlacements((current) => Object.fromEntries(Object.entries(current).filter(([targetId, itemId]) => question.correctPlacements[targetId] === itemId)));
      else setSelectedOptionId(null);
      setActiveLeftId(null);
    },
  }), [placements, question, selectedOptionId, userPairs]);

  if (question.type === "multiple-choice") return <MultipleChoiceContent canvasWidth={canvasWidth} disabled={feedback !== "idle"} feedback={feedback} onSelect={setSelectedOptionId} question={question} selectedOptionId={selectedOptionId} />;
  if (question.type === "match-pairs") return <MatchPairsContent activeLeftId={activeLeftId} feedback={feedback} onLeft={setActiveLeftId} onRight={(rightId) => { if (!activeLeftId || feedback !== "idle") return; setUserPairs((current) => ({ ...Object.fromEntries(Object.entries(current).filter(([, value]) => value !== rightId)), [activeLeftId]: rightId })); setActiveLeftId(null); }} question={question} userPairs={userPairs} />;
  return <DragDropContent feedback={feedback} onPlace={(targetId, itemId) => { if (feedback !== "idle") return; setPlacements((current) => ({ ...Object.fromEntries(Object.entries(current).filter(([, value]) => value !== itemId)), [targetId]: itemId })); }} onRemove={(targetId) => setPlacements((current) => Object.fromEntries(Object.entries(current).filter(([id]) => id !== targetId)))} placements={placements} question={question} />;
});
