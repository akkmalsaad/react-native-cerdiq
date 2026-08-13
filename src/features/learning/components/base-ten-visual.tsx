import { memo } from "react";
import { View } from "react-native";

export const BaseTenRod = memo(function BaseTenRod({ tiny = false }: { tiny?: boolean }) {
  return <View accessibilityLabel="Satu batang Puluh, 10 blok" style={{ borderRadius: 4, gap: tiny ? 0.3 : 0.7, overflow: "hidden" }}>{Array.from({ length: 10 }, (_, i) => <View key={i} style={{ backgroundColor: i % 2 ? "#72CD08" : "#81DD0B", borderColor: "#58A900", borderWidth: 0.4, height: tiny ? 4 : 8, width: tiny ? 8 : 18 }} />)}</View>;
});

export const UnitCube = memo(function UnitCube({ tiny = false }: { tiny?: boolean }) { return <View style={{ backgroundColor: "#FFAD00", borderBottomColor: "#E88B00", borderBottomWidth: tiny ? 1 : 2, borderCurve: "continuous", borderRadius: 3, height: tiny ? 8 : 16, width: tiny ? 8 : 16 }} />; });

export const BaseTenVisual = memo(function BaseTenVisual({ tens, ones, tiny = false }: { tens: number; ones: number; tiny?: boolean }) {
  return <View accessibilityLabel={`${tens} puluh dan ${ones} sa`} style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: tiny ? 5 : 12, justifyContent: "center", paddingVertical: tiny ? 3 : 6 }}>
    <View style={{ flexDirection: "row", gap: tiny ? 2 : 5 }}>{Array.from({ length: tens }, (_, i) => <BaseTenRod key={i} tiny={tiny} />)}</View>
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: tiny ? 2 : 5, maxWidth: tiny ? 28 : 64 }}>{Array.from({ length: ones }, (_, i) => <UnitCube key={i} tiny={tiny} />)}</View>
  </View>;
});
