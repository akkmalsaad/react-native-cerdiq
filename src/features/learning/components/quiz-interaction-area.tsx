import type { ReactNode } from "react";
import { View } from "react-native";

/** The only region whose interaction layout changes between quiz types. */
export function QuizInteractionArea({ children }: { children: ReactNode }) {
  return <View style={{ flexShrink: 1, minHeight: 0, overflow: "hidden", width: "100%" }}>{children}</View>;
}
