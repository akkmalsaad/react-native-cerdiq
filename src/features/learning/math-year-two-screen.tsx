import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, useWindowDimensions, View } from "react-native";

import { images } from "@/lib/images";

const DESIGN_WIDTH = 852;
const DESIGN_HEIGHT = 1846;

type DesignBox = { bottom: number; left: number; right: number; top: number };
type ScreenAction = { accessibilityLabel: string; box: DesignBox; onPress: () => void };

const topics = [
  { box: { left: 83, right: 769, top: 699, bottom: 828 }, locked: false, title: "Nombor Hingga 1,000" },
  { box: { left: 83, right: 769, top: 838, bottom: 963 }, locked: false, title: "Tambah dan Tolak" },
  { box: { left: 83, right: 769, top: 974, bottom: 1086 }, locked: false, title: "Darab" },
  { box: { left: 83, right: 769, top: 1097, bottom: 1205 }, locked: false, title: "Bahagi" },
  { box: { left: 83, right: 769, top: 1214, bottom: 1299 }, locked: true, title: "Pecahan" },
  { box: { left: 83, right: 769, top: 1307, bottom: 1393 }, locked: true, title: "Wang" },
  { box: { left: 83, right: 769, top: 1401, bottom: 1485 }, locked: true, title: "Masa dan Waktu" },
  { box: { left: 83, right: 769, top: 1494, bottom: 1582 }, locked: true, title: "Bentuk dan Ruang" },
] as const;

export function MathYearTwoScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { height, width } = useWindowDimensions();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  const horizontalScale = width / DESIGN_WIDTH;
  const verticalScale = height / DESIGN_HEIGHT;
  const boxStyle = ({ bottom, left, right, top }: DesignBox) => ({
    height: (bottom - top) * verticalScale,
    left: left * horizontalScale,
    position: "absolute" as const,
    top: top * verticalScale,
    width: (right - left) * horizontalScale,
  });

  const openTopic = (title: string, locked: boolean) => {
    Alert.alert(
      locked ? "Topik dikunci" : title,
      locked ? "Selesaikan topik sebelumnya untuk membuka topik ini." : "Topik ini sedia untuk dimulakan.",
    );
  };

  const actions: ScreenAction[] = [
    { accessibilityLabel: "Kembali", box: { left: 31, right: 111, top: 34, bottom: 109 }, onPress: () => router.back() },
    ...Array.from({ length: 6 }, (_, index) => ({
      accessibilityLabel: `Pilih Tahun ${index + 1}`,
      box: { left: 55 + index * 120, right: 192 + index * 120, top: 531, bottom: 608 },
      onPress: () => {
        if (index === 0) {
          router.back();
          return;
        }
        if (index !== 1) Alert.alert(`Tahun ${index + 1}`, "Kandungan tahun ini akan tersedia tidak lama lagi.");
      },
    })),
    ...topics.map((topic) => ({
      accessibilityLabel: `${topic.locked ? "Topik dikunci: " : "Buka topik "}${topic.title}`,
      box: topic.box,
      onPress: () => openTopic(topic.title, topic.locked),
    })),
    { accessibilityLabel: "Utama", box: { left: 43, right: 183, top: 1730, bottom: 1844 }, onPress: () => router.replace("/" as Href) },
    { accessibilityLabel: "Pelajaran", box: { left: 184, right: 337, top: 1730, bottom: 1844 }, onPress: () => router.replace("/learning" as Href) },
    { accessibilityLabel: "Ganjaran", box: { left: 338, right: 511, top: 1718, bottom: 1844 }, onPress: () => router.replace("/rewards" as Href) },
    { accessibilityLabel: "Kemajuan", box: { left: 513, right: 678, top: 1730, bottom: 1844 }, onPress: () => router.replace("/progress" as Href) },
    { accessibilityLabel: "Profil", box: { left: 679, right: 824, top: 1730, bottom: 1844 }, onPress: () => router.replace("/profile" as Href) },
  ];

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ height, width }}
      contentInsetAdjustmentBehavior="never"
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor="transparent" style="dark" translucent />
      <View style={{ flex: 1 }}>
        <Image
          accessibilityLabel="Skrin subjek Matematik, Tahun 2"
          contentFit="fill"
          source={images.mathYearTwoScreen}
          style={{ height: "100%", width: "100%" }}
        />

        {actions.map((action) => (
          <Pressable
            accessibilityLabel={action.accessibilityLabel}
            accessibilityRole="button"
            key={action.accessibilityLabel}
            onPress={action.onPress}
            style={boxStyle(action.box)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
