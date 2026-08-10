import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Pressable, ScrollView, useWindowDimensions, View } from "react-native";

import { images } from "@/lib/images";

const DESIGN_WIDTH = 853;
const DESIGN_HEIGHT = 1844;
const DESIGN_ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

type DesignBox = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type ScreenAction = {
  accessibilityLabel: string;
  box: DesignBox;
  onPress: () => void;
};

const topics = [
  { box: { left: 76, right: 775, top: 713, bottom: 842 }, locked: false, title: "Nombor Hingga 100" },
  { box: { left: 76, right: 775, top: 857, bottom: 988 }, locked: false, title: "Tambah dan Tolak" },
  { box: { left: 76, right: 775, top: 1001, bottom: 1112 }, locked: true, title: "Bentuk dan Ruang" },
  { box: { left: 76, right: 775, top: 1125, bottom: 1241 }, locked: true, title: "Panjang, Jisim dan Isipadu" },
  { box: { left: 76, right: 775, top: 1253, bottom: 1369 }, locked: true, title: "Masa dan Waktu" },
  { box: { left: 76, right: 775, top: 1381, bottom: 1498 }, locked: true, title: "Data" },
] as const;

export function MathSubjectScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { height, width } = useWindowDimensions();
  const [selectedYear, setSelectedYear] = useState(1);

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  const screenAspectRatio = width / height;
  const renderedWidth = screenAspectRatio > DESIGN_ASPECT_RATIO ? width : height * DESIGN_ASPECT_RATIO;
  const renderedHeight = screenAspectRatio > DESIGN_ASPECT_RATIO ? width / DESIGN_ASPECT_RATIO : height;
  const horizontalCrop = (renderedWidth - width) / 2;
  const verticalCrop = (renderedHeight - height) / 2;
  const designX = (value: number) => (value / DESIGN_WIDTH) * renderedWidth - horizontalCrop;
  const designY = (value: number) => (value / DESIGN_HEIGHT) * renderedHeight - verticalCrop;
  const boxStyle = ({ bottom, left, right, top }: DesignBox) => ({
    height: designY(bottom) - designY(top),
    left: designX(left),
    position: "absolute" as const,
    top: designY(top),
    width: designX(right) - designX(left),
  });

  const openTopic = (title: string, locked: boolean) => {
    if (locked) {
      Alert.alert("Topik dikunci", "Selesaikan topik sebelumnya untuk membuka topik ini.");
      return;
    }
    Alert.alert(title, "Topik ini sedia untuk dimulakan.");
  };

  const actions: ScreenAction[] = [
    { accessibilityLabel: "Kembali", box: { left: 31, right: 111, top: 34, bottom: 109 }, onPress: () => router.back() },
    ...Array.from({ length: 6 }, (_, index) => ({
      accessibilityLabel: `Pilih Tahun ${index + 1}`,
      box: { left: 55 + index * 120, right: 192 + index * 120, top: 531, bottom: 608 },
      onPress: () => {
        if (index === 1) {
          router.push("/math-year-2" as Href);
          return;
        }
        setSelectedYear(index + 1);
        if (index > 0) Alert.alert(`Tahun ${index + 1}`, "Kandungan tahun ini akan tersedia tidak lama lagi.");
      },
    })),
    ...topics.map((topic) => ({
      accessibilityLabel: `${topic.locked ? "Topik dikunci: " : "Buka topik "}${topic.title}`,
      box: topic.box,
      onPress: () => openTopic(topic.title, topic.locked),
    })),
    { accessibilityLabel: "Utama", box: { left: 42, right: 179, top: 1692, bottom: 1835 }, onPress: () => router.replace("/" as Href) },
    { accessibilityLabel: "Pelajaran", box: { left: 183, right: 331, top: 1692, bottom: 1835 }, onPress: () => router.replace("/learning" as Href) },
    { accessibilityLabel: "Ganjaran", box: { left: 337, right: 510, top: 1679, bottom: 1835 }, onPress: () => router.replace("/rewards" as Href) },
    { accessibilityLabel: "Kemajuan", box: { left: 519, right: 674, top: 1692, bottom: 1835 }, onPress: () => router.replace("/progress" as Href) },
    { accessibilityLabel: "Profil", box: { left: 680, right: 823, top: 1692, bottom: 1835 }, onPress: () => router.replace("/profile" as Href) },
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
          accessibilityLabel={`Skrin subjek Matematik, Tahun ${selectedYear}`}
          contentFit="cover"
          source={images.mathSubjectScreen}
          style={{ height: "100%", width: "100%" }}
        />

        {actions.map((action) => (
          <Pressable
            accessibilityLabel={action.accessibilityLabel}
            accessibilityRole="button"
            key={action.accessibilityLabel}
            onPress={action.onPress}
            style={({ pressed }) => [
              boxStyle(action.box),
              { backgroundColor: pressed ? "rgba(108, 50, 217, 0.10)" : "transparent" },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
}
