import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing, Pressable, Text, useWindowDimensions, View } from "react-native";

import { ConfettiBurst } from "@/features/learning/components/confetti-burst";
import { generateNomborLesson } from "@/features/learning/questions/math/year1/nombor/generate-nombor-lesson";
import { QuestionRenderer, type QuestionRendererHandle } from "@/features/learning/questions/math/year1/nombor/question-renderer";

const learningScreen = require("../../../assets/images/Learning Screen.png");

type Feedback = "idle" | "correct" | "wrong";

export function NumberYear1Screen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { height, width } = useWindowDimensions();
  const quizContentRef = useRef<QuestionRendererHandle>(null);
  const [questions] = useState(() => generateNomborLesson({ questionCount: 10, difficulty: 1 }));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const currentQuestion = questions[questionIndex];
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (feedback === "wrong") {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { duration: 55, easing: Easing.linear, toValue: 8, useNativeDriver: true }),
        Animated.timing(shakeAnim, { duration: 55, easing: Easing.linear, toValue: -8, useNativeDriver: true }),
        Animated.timing(shakeAnim, { duration: 55, easing: Easing.linear, toValue: 6, useNativeDriver: true }),
        Animated.timing(shakeAnim, { duration: 55, easing: Easing.linear, toValue: -6, useNativeDriver: true }),
        Animated.timing(shakeAnim, { duration: 55, easing: Easing.linear, toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      shakeAnim.setValue(0);
    }
  }, [feedback, shakeAnim]);

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  const canvasWidth = Math.min(width, height * (942 / 1681));
  const canvasHeight = canvasWidth * (1681 / 942);
  const reset = () => { quizContentRef.current?.reset(); setFeedback("idle"); };
  const check = () => {
    if (!canSubmit) return;
    setFeedback(quizContentRef.current?.checkAnswer() ? "correct" : "wrong");
  };
  const continueLesson = () => {
    if (questionIndex === questions.length - 1) {
      router.replace("/next-screen" as Href);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setCanSubmit(false);
    setFeedback("idle");
  };
  const handleReadyChange = useCallback((ready: boolean) => setCanSubmit(ready), []);

  return (
    <View style={{ alignItems: "center", backgroundColor: "#1D087F", flex: 1, justifyContent: "center" }}>
      <StatusBar hidden />
      <View style={{ height: canvasHeight, transform: [{ translateY: -Math.max(24, canvasHeight * 0.035) }], width: canvasWidth }}>
        <Image accessibilityLabel="Skrin pembelajaran Nombor" contentFit="fill" source={learningScreen} style={{ height: "100%", width: "100%" }} />
        <View pointerEvents="none" style={{ experimental_backgroundImage: "linear-gradient(90deg, #210A91 0%, #160575 52%, #1B087E 100%)", height: "3.4%", left: 0, position: "absolute", top: 0, width: "100%" }} />

        <Pressable accessibilityLabel="Kembali" accessibilityRole="button" onPress={() => router.back()} style={{ height: "5.4%", left: "3%", position: "absolute", top: "3.7%", width: "9.2%" }} />
        <Pressable accessibilityLabel="Dengar soalan" accessibilityRole="button" onPress={() => Alert.alert("Baca soalan", currentQuestion.prompt)} style={{ height: "5%", left: "5.1%", position: "absolute", top: "32.3%", width: "9%" }} />

        <View pointerEvents="none" style={{ experimental_backgroundImage: "linear-gradient(180deg, rgba(30, 7, 132, 0) 0%, #210989 24%, #210989 76%, rgba(30, 7, 132, 0) 100%)", height: canvasHeight * 0.025 - 4, left: "16%", position: "absolute", top: "8.25%", width: "68%" }} />
        <View pointerEvents="none" style={{ experimental_backgroundImage: "linear-gradient(180deg, rgba(30, 7, 132, 0) 0%, #210989 24%, #210989 76%, rgba(30, 7, 132, 0) 100%)", height: canvasHeight * 0.035, left: "31%", position: "absolute", top: "11.35%", width: "38%" }} />
        <View pointerEvents="none" style={{ flexDirection: "row", gap: canvasWidth * 0.007, left: "19.5%", position: "absolute", top: "8.85%", width: "61%" }}>{questions.map((question, index) => <View key={question.id} style={{ backgroundColor: index < questionIndex ? "#70D31A" : index === questionIndex ? "#7B35E6" : "#E8E5F2", borderColor: index === questionIndex ? "white" : "transparent", borderRadius: 999, borderWidth: index === questionIndex ? 1.5 : 0, flex: 1, height: canvasWidth * 0.018 }} />)}</View>
        <View pointerEvents="none" style={{ alignItems: "center", left: "34%", position: "absolute", top: "12.15%", width: "32%" }}><Text style={{ color: "white", fontFamily: "Nunito_700Bold", fontSize: canvasWidth * 0.029 }}>{`Soalan ${questionIndex + 1} / ${questions.length}`}</Text></View>
        <View pointerEvents="none" style={{ alignItems: "center", backgroundColor: "white", height: "4.2%", justifyContent: "center", left: "15%", position: "absolute", top: "33.6%", width: "77%" }}><Text selectable style={{ color: "#17175A", fontFamily: "Nunito_800ExtraBold", fontSize: canvasWidth * 0.035, textAlign: "center" }}>{currentQuestion.prompt}</Text></View><View pointerEvents="none" style={{ backgroundColor: "white", left: "14.8%", minHeight: "5.2%", paddingTop: "0.4%", position: "absolute", top: "22.1%", width: "38%" }}><Text selectable style={{ color: "#17175A", fontFamily: "Nunito_600SemiBold", fontSize: canvasWidth * 0.025 + 2, lineHeight: canvasWidth * 0.035 + 2 }}>{currentQuestion.awiMessage}</Text></View><View pointerEvents="none" style={{ backgroundColor: "#F6F2FF", height: "5.2%", justifyContent: "center", left: "21.2%", position: "absolute", top: "87.2%", width: "34%" }}><Text selectable style={{ color: "#17175A", fontFamily: "Nunito_600SemiBold", fontSize: canvasWidth * 0.018 + 4, lineHeight: canvasWidth * 0.025 + 4 }}>{feedback === "wrong" ? currentQuestion.retryTip : currentQuestion.tip}</Text></View>

        <Animated.View style={{ backgroundColor: "white", height: "39.3%", left: "8.3%", position: "absolute", top: "38.3%", transform: [{ translateX: shakeAnim }], width: "83.6%" }}>
          <QuestionRenderer canvasWidth={canvasWidth} feedback={feedback} onReadyChange={handleReadyChange} question={currentQuestion} ref={quizContentRef} />
        </Animated.View>

        {feedback === "correct" ? (
          <View pointerEvents="none" style={{ left: "8.3%", position: "absolute", top: "56%", width: "83.6%" }}>
            <ConfettiBurst key={questionIndex} />
          </View>
        ) : null}

        <Pressable
          accessibilityLabel={feedback === "wrong" ? "Cuba lagi" : feedback === "correct" ? "Seterusnya" : "Semak jawapan"}
          accessibilityRole="button"
          disabled={feedback === "idle" && !canSubmit}
          onPress={feedback === "wrong" ? () => { quizContentRef.current?.retry(); setFeedback("idle"); } : feedback === "correct" ? continueLesson : check}
          style={({ pressed }) => ({ alignItems: "center", backgroundColor: feedback === "idle" && !canSubmit ? "#BDBBC4" : "#501BE0", borderRadius: 999, height: "4.7%", justifyContent: "center", left: "15.4%", opacity: pressed ? 0.8 : 1, position: "absolute", top: "78.2%", width: "68.8%" })}
        >
          <Text style={{ color: "white", fontFamily: "Nunito_800ExtraBold", fontSize: canvasWidth * 0.032, letterSpacing: 0.6 }}>{feedback === "wrong" ? "CUBA LAGI" : feedback === "correct" ? "SETERUSNYA     →" : "SEMAK JAWAPAN     →"}</Text>
        </Pressable>

        <View pointerEvents="none" style={{ backgroundColor: "white", height: "6.3%", left: "49.5%", position: "absolute", top: "93.7%", width: "42.8%" }} />
        <Pressable accessibilityLabel="Mulakan semula" accessibilityRole="button" onPress={reset} style={{ height: "4.8%", left: "7.8%", position: "absolute", top: "94.1%", width: "14.5%" }} />
      </View>
    </View>
  );
}
