import { Image } from "expo-image";
import { Href, router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const NAV_ICON_CONTAINER = 32;
const NAV_ICON_SIZE = 25;

const SPRITE_WIDTH = 1536;
const SPRITE_HEIGHT = 1024;
const SPRITE_CROP_SIZE = 230;
const SPRITE_SCALE = NAV_ICON_SIZE / SPRITE_CROP_SIZE;

type TabId = "home" | "learning" | "rewards" | "progress" | "profile";

type Tab = {
  href: Href;
  id: TabId;
  label: string;
  spriteX: number;
};

const navigationIcons = require("../../../assets/images/navigation bar icon.png");

const tabs: Tab[] = [
  { id: "home", label: "Utama", href: "/", spriteX: 165 },
  { id: "learning", label: "Pelajaran", href: "/learning", spriteX: 470 },
  { id: "rewards", label: "Ganjaran", href: "/rewards", spriteX: 772 },
  { id: "progress", label: "Kemajuan", href: "/progress", spriteX: 1075 },
  { id: "profile", label: "Profil", href: "/profile", spriteX: 1380 },
];

const getActiveTab = (pathname: string): TabId => {
  if (pathname === "/" || pathname === "/next-screen") return "home";
  if (pathname === "/learning" || pathname === "/number-year-1" || pathname.startsWith("/math-year-")) return "learning";
  if (pathname === "/rewards") return "rewards";
  if (pathname === "/progress") return "progress";
  return "profile";
};

function NavigationIcon({ active, spriteX }: { active: boolean; spriteX: number }) {
  const spriteY = active ? 650 : 285;

  return (
    <View
      style={{
        alignItems: "center",
        height: NAV_ICON_CONTAINER,
        justifyContent: "center",
        overflow: "hidden",
        width: NAV_ICON_CONTAINER,
      }}
    >
      <View style={{ height: NAV_ICON_SIZE, overflow: "hidden", width: NAV_ICON_SIZE }}>
        <Image
          contentFit="fill"
          source={navigationIcons}
          style={{
            height: SPRITE_HEIGHT * SPRITE_SCALE,
            left: -(spriteX - SPRITE_CROP_SIZE / 2) * SPRITE_SCALE,
            position: "absolute",
            top: -(spriteY - SPRITE_CROP_SIZE / 2) * SPRITE_SCALE,
            width: SPRITE_WIDTH * SPRITE_SCALE,
          }}
        />
      </View>
    </View>
  );
}

export function CerdiqTabBar() {
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <View
      accessibilityRole="tablist"
      style={{
        backgroundColor: "#FFFFFF",
        borderCurve: "continuous",
        borderRadius: 30,
        boxShadow: "0 8px 24px rgba(70, 39, 145, 0.14)",
        flexDirection: "row",
        minHeight: 72,
        paddingHorizontal: 5,
        paddingVertical: 7,
      }}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <Pressable
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={tab.id}
            onPress={() => {
              if (!active) router.replace(tab.href);
            }}
            style={({ pressed }) => ({
              alignItems: "center",
              flex: 1,
              gap: 1,
              justifyContent: "center",
              opacity: pressed ? 0.65 : 1,
            })}
          >
            <NavigationIcon active={active} spriteX={tab.spriteX} />
            <Text
              numberOfLines={1}
              style={{
                color: active ? "#6528D9" : "#626277",
                fontFamily: active ? "Nunito_800ExtraBold" : "Nunito_700Bold",
                fontSize: 11,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
