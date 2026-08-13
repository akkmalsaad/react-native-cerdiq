import { Image } from "expo-image";
import type { ReactNode } from "react";
import {
  Pressable,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native";

const boxImages = {
  default: require("../../../../assets/ui/quiz/answer-box-default.png"),
  selected: require("../../../../assets/ui/quiz/answer-box-selected.png"),
  correct: require("../../../../assets/ui/quiz/answer-box-correct.png"),
  wrong: require("../../../../assets/ui/quiz/answer-box-wrong.png"),
} as const;

export type QuizBoxState = keyof typeof boxImages;

type QuizQuestionBoxProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type QuizAnswerBoxProps = {
  accessibilityLabel: string;
  children: ReactNode;
  disabled?: boolean;
  onPress: () => void;
  selected?: boolean;
  state?: QuizBoxState;
  style?: StyleProp<ViewStyle>;
};

/** A non-interactive glossy prompt surface with content rendered over the PNG. */
export function QuizQuestionBox({ children, style }: QuizQuestionBoxProps) {
  return (
    <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
      <Image
        contentFit="fill"
        pointerEvents="none"
        source={boxImages.default}
        style={{ height: "100%", left: 0, position: "absolute", top: 0, width: "100%" }}
      />
      <View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: "10%", width: "100%" }}>
        {children}
      </View>
    </View>
  );
}

/** A fully tappable answer surface whose artwork reflects its quiz state. */
export function QuizAnswerBox({
  accessibilityLabel,
  children,
  disabled = false,
  onPress,
  selected = false,
  state = selected ? "selected" : "default",
  style,
}: QuizAnswerBoxProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        { alignItems: "center", justifyContent: "center", opacity: pressed ? 0.78 : 1 },
        style,
      ]}
    >
      <Image
        contentFit="contain"
        pointerEvents="none"
        source={boxImages[state]}
        style={{ height: "100%", left: 0, position: "absolute", top: 0, width: "100%" }}
      />
      <View pointerEvents="none" style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: "22%", paddingVertical: "18%" }}>
        {children}
      </View>
    </Pressable>
  );
}
