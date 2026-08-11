import { Text, View } from "react-native";

export function CountBlocks({ count, width }: { count: number; width: number }) {
  const tens = Math.floor(count / 10);
  const ones = count % 10;
  if (count > 20) return <View accessibilityLabel={`${count} blok`} style={{ alignItems: "center", gap: 8 }}><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>{Array.from({ length: tens }, (_, index) => <View key={`ten-${index}`} style={{ alignItems: "center", backgroundColor: "#77D83D", borderColor: "#399C24", borderRadius: 5, borderWidth: 1, height: width * 0.13, justifyContent: "center", width: width * 0.032 }}><Text style={{ color: "#246D19", fontFamily: "Nunito_800ExtraBold", fontSize: width * 0.018 }}>10</Text></View>)}</View><View style={{ flexDirection: "row", gap: 5 }}>{Array.from({ length: ones }, (_, index) => <Block key={`one-${index}`} size={width * 0.045} />)}</View></View>;
  return <View accessibilityLabel={`${count} blok`} style={{ flexDirection: "row", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: width * 0.62 }}>{Array.from({ length: count }, (_, index) => <Block key={index} size={width * 0.055} />)}</View>;
}

function Block({ size }: { size: number }) {
  return <View style={{ alignItems: "center", backgroundColor: "#70D83C", borderColor: "#3DA425", borderCurve: "continuous", borderRadius: 6, borderWidth: 1.5, height: size, justifyContent: "center", width: size }}><View style={{ backgroundColor: "#A6ED77", borderRadius: 2, height: "28%", opacity: 0.75, width: "55%" }} /></View>;
}
