import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type TabId = "home" | "learning" | "rewards" | "progress" | "profile";

const tabs: Array<{ id: TabId; label: string; icon: string; href: string }> = [
  { id: "home", label: "Utama", icon: "⌂", href: "/" },
  { id: "learning", label: "Pelajaran", icon: "▣", href: "/learning" },
  { id: "rewards", label: "Ganjaran", icon: "♛", href: "/rewards" },
  { id: "progress", label: "Kemajuan", icon: "▥", href: "/progress" },
  { id: "profile", label: "Profil", icon: "☺", href: "/profile" },
];

export function CerdiqTabBar({ activeTab }: { activeTab: TabId }) {
  return (
    <View style={{ backgroundColor: "#FFFFFF", borderRadius: 30, flexDirection: "row", paddingHorizontal: 5, paddingVertical: 7, boxShadow: "0 8px 24px rgba(70, 39, 145, 0.14)" }}>
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        const isReward = tab.id === "rewards";
        return (
          <Pressable
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={tab.id}
            onPress={() => router.replace(tab.href as Href)}
            style={({ pressed }) => ({ alignItems: "center", flex: 1, gap: 2, opacity: pressed ? 0.65 : 1, transform: isReward ? [{ translateY: -13 }] : undefined })}
          >
            <View style={{ alignItems: "center", backgroundColor: isReward ? "#672BD1" : "transparent", borderRadius: 999, height: 38, justifyContent: "center", width: 46, boxShadow: isReward ? "0 5px 12px rgba(89, 32, 195, 0.28)" : undefined }}>
              <Text style={{ color: isReward ? "#FFFFFF" : active ? "#6528C9" : "#737387", fontFamily: "Nunito_800ExtraBold", fontSize: isReward ? 23 : 25, lineHeight: 28 }}>{tab.icon}</Text>
            </View>
            <Text style={{ color: active || isReward ? "#6528C9" : "#626277", fontFamily: "Nunito_700Bold", fontSize: 11 }}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
