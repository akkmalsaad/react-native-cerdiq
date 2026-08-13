import { Pressable, Text } from "react-native";

export function NextQuestionButton({ disabled, onPress }: { disabled: boolean; onPress: () => void }) {
  return <Pressable accessibilityLabel="Soalan seterusnya" accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => ({ alignItems: "center", backgroundColor: disabled ? "#C8C6CC" : "#5422D6", borderRadius: 999, flex: 1, minHeight: 42, justifyContent: "center", opacity: pressed ? 0.78 : 1, paddingHorizontal: 12 })}><Text style={{ color: "white", fontFamily: "Nunito_800ExtraBold", fontSize: 14 }}>SETERUSNYA  {disabled ? "🔒" : "→"}</Text></Pressable>;
}
