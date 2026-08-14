import { View } from "react-native";

import type { CompareIconType } from "./types";

/** Placeholder shapes until dedicated icon art exists for each type — swap CompareIcon's
 * body for an Image (require per CompareIconType) when assets are supplied. */
const ICON_STYLES: Record<CompareIconType, { background: string; border: string }> = {
  apple: { background: "#FF8A80", border: "#D9483A" },
  ball: { background: "#5CACFF", border: "#2E7BD1" },
  fish: { background: "#5CD6C0", border: "#2E9C8A" },
  flower: { background: "#D19CF5", border: "#9750D6" },
  star: { background: "#FFD166", border: "#E0A62B" },
};

function CompareIcon({ size, type }: { size: number; type: CompareIconType }) {
  const { background, border } = ICON_STYLES[type];
  return <View style={{ backgroundColor: background, borderColor: border, borderRadius: size * 0.32, borderWidth: size * 0.09, height: size, width: size }} />;
}

function IconGroup({ count, icon, width }: { count: number; icon: CompareIconType; width: number }) {
  const iconSize = width * 0.072;
  return (
    <View style={{ alignItems: "center", backgroundColor: "#FAF9FF", borderColor: "#E4DEFB", borderRadius: width * 0.025, borderWidth: 1.5, flex: 1, justifyContent: "center", minHeight: width * 0.32, padding: width * 0.02 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: width * 0.013, justifyContent: "center" }}>
        {Array.from({ length: count }, (_, index) => <CompareIcon key={index} size={iconSize} type={icon} />)}
      </View>
    </View>
  );
}

export function CompareIconGroups({ icon, leftCount, rightCount, width }: { icon: CompareIconType; leftCount: number; rightCount: number; width: number }) {
  return (
    <View accessibilityLabel={`Kiri ${leftCount}, Kanan ${rightCount}`} style={{ flexDirection: "row", gap: width * 0.025, width: "100%" }}>
      <IconGroup count={leftCount} icon={icon} width={width} />
      <IconGroup count={rightCount} icon={icon} width={width} />
    </View>
  );
}
