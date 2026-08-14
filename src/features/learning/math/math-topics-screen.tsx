import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

import type { MathTopic, MathTopicIcon } from "@/data/math/types";
import { images } from "@/lib/images";

const DESIGN_WIDTH = 853;
const HEADER_BOTTOM = 638;
const TOPIC_ICON_SHEET_WIDTH = 1619;
const TOPIC_ICON_SHEET_HEIGHT = 972;

const yearRoutes: Record<number, Href> = {
  1: "/learning" as Href,
  2: "/math-year-2" as Href,
  3: "/math-year-3" as Href,
  4: "/math-year-4" as Href,
  5: "/math-year-5" as Href,
  6: "/math-year-6" as Href,
};

type MathTopicsScreenProps = {
  topics: readonly MathTopic[];
  year: number;
};

function TopicIconArtwork({ icon, scale }: { icon: MathTopicIcon; scale: number }) {
  const containerWidth = 132 * scale;
  const containerHeight = 118 * scale;
  const artworkSize = 114 * scale;
  const imageScaleX = artworkSize / icon.crop.width;
  const imageScaleY = artworkSize / icon.crop.height;

  return (
    <View style={{ alignItems: "center", height: containerHeight, justifyContent: "center", width: containerWidth }}>
      <View style={{ height: artworkSize, overflow: "hidden", width: artworkSize }}>
        <Image
          contentFit="fill"
          source={icon.source}
          style={{
            height: TOPIC_ICON_SHEET_HEIGHT * imageScaleY,
            left: -icon.crop.x * imageScaleX,
            position: "absolute",
            top: -icon.crop.y * imageScaleY,
            width: TOPIC_ICON_SHEET_WIDTH * imageScaleX,
          }}
        />
      </View>
    </View>
  );
}

export function MathTopicsScreen({ topics, year }: MathTopicsScreenProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { width } = useWindowDimensions();
  const scale = width / DESIGN_WIDTH;

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  const openTopic = (topic: MathTopic) => {
    if (topic.locked) {
      Alert.alert("Topik dikunci", "Selesaikan topik sebelumnya untuk membuka topik ini.");
      return;
    }
    router.push("/number-year-1" as Href);
  };

  return (
    <View style={{ backgroundColor: "#F9F7FF", flex: 1 }}>
      <StatusBar backgroundColor="transparent" style="dark" translucent />
      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingBottom: 118 * scale }}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: HEADER_BOTTOM * scale, overflow: "hidden", width }}>
          <Image
            accessibilityLabel={`Skrin subjek Matematik, Tahun ${year}`}
            contentFit="fill"
            source={images.mathSubjectScreen}
            style={{ height: 1844 * scale, width }}
          />

          <View
            pointerEvents="none"
            style={{
              backgroundColor: "#F9F7FF",
              height: 112 * scale,
              left: 0,
              position: "absolute",
              top: 0,
              width: 125 * scale,
            }}
          />

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderCurve: "continuous",
              borderRadius: 31 * scale,
              bottom: 28 * scale,
              flexDirection: "row",
              height: 78 * scale,
              left: 50 * scale,
              padding: 8 * scale,
              position: "absolute",
              width: 753 * scale,
              boxShadow: "0 8px 18px rgba(70, 39, 145, 0.10)",
            }}
          >
            {Array.from({ length: 6 }, (_, index) => {
              const itemYear = index + 1;
              const selected = itemYear === year;
              return (
                <Pressable
                  accessibilityLabel={`Pilih Tahun ${itemYear}`}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  key={itemYear}
                  onPress={() => router.replace(yearRoutes[itemYear])}
                  style={({ pressed }) => ({
                    alignItems: "center",
                    backgroundColor: selected ? "#6528D9" : "transparent",
                    borderRadius: 24 * scale,
                    flex: 1,
                    justifyContent: "center",
                    opacity: pressed ? 0.72 : 1,
                  })}
                >
                  <Text style={{ color: selected ? "#FFFFFF" : "#17174A", fontFamily: "Nunito_700Bold", fontSize: 17 * scale }}>
                    Tahun {itemYear}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 13 * scale, paddingHorizontal: 78 * scale, paddingTop: 2 * scale }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 14 * scale, height: 62 * scale }}>
            <Text style={{ color: "#672BD1", fontSize: 34 * scale }}>▣</Text>
            <Text selectable style={{ color: "#6528D9", fontFamily: "Nunito_800ExtraBold", fontSize: 24 * scale }}>
              Topik Tahun {year}
            </Text>
          </View>

          {topics.map((topic) => {
            const progress = topic.totalLessons > 0 ? topic.completedLessons / topic.totalLessons : 0;
            return (
              <Pressable
                accessibilityLabel={`${topic.locked ? "Topik dikunci: " : "Buka topik "}${topic.title}`}
                accessibilityRole="button"
                key={topic.id}
                onPress={() => openTopic(topic)}
                style={({ pressed }) => ({
                  backgroundColor: "#FFFFFF",
                  borderCurve: "continuous",
                  borderRadius: 22 * scale,
                  flexDirection: "row",
                  height: 129 * scale,
                  opacity: pressed ? 0.78 : 1,
                  overflow: "hidden",
                  boxShadow: "0 7px 20px rgba(70, 39, 145, 0.08)",
                })}
              >
                <View style={{ alignItems: "center", borderRightColor: "#F2EEFA", borderRightWidth: 1, justifyContent: "center", width: 155 * scale }}>
                  <TopicIconArtwork icon={topic.icon} scale={scale} />
                </View>

                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 22 * scale }}>
                  <Text numberOfLines={1} selectable style={{ color: "#27208D", fontFamily: "Nunito_500Medium", fontSize: 16 * scale, marginTop: 5 * scale }}>
                    {topic.description}
                  </Text>

                  {!topic.locked ? (
                    <View style={{ alignItems: "center", flexDirection: "row", gap: 18 * scale, marginTop: 13 * scale }}>
                      <View style={{ backgroundColor: "#F0ECFA", borderRadius: 999, height: 12 * scale, overflow: "hidden", width: 295 * scale }}>
                        <View style={{ backgroundColor: "#6C32D9", borderRadius: 999, height: "100%", width: `${Math.min(100, progress * 100)}%` }} />
                      </View>
                      <Text selectable style={{ color: "#171A83", fontFamily: "Nunito_700Bold", fontSize: 15 * scale, fontVariant: ["tabular-nums"] }}>
                        {topic.completedLessons} / {topic.totalLessons}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={{ alignItems: "center", justifyContent: "center", width: 75 * scale }}>
                  {topic.locked ? (
                    <View style={{ alignItems: "center", backgroundColor: "#F4EFFF", borderRadius: 999, height: 58 * scale, justifyContent: "center", width: 58 * scale }}>
                      <Text style={{ color: "#6C32D9", fontSize: 25 * scale }}>▣</Text>
                    </View>
                  ) : (
                    <Text style={{ color: "#6528D9", fontFamily: "Nunito_800ExtraBold", fontSize: 39 * scale }}>›</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ backgroundColor: "#F1EAFF", borderCurve: "continuous", borderRadius: 25 * scale, gap: 8 * scale, marginHorizontal: 47 * scale, marginTop: 26 * scale, paddingHorizontal: 28 * scale, paddingVertical: 22 * scale }}>
          <Text selectable style={{ color: "#6528D9", fontFamily: "Nunito_800ExtraBold", fontSize: 20 * scale }}>⭐  Tahukah Kamu?</Text>
          <Text selectable style={{ color: "#27208D", fontFamily: "Nunito_500Medium", fontSize: 16 * scale }}>Belajar sedikit setiap hari akan buat kamu lebih hebat! 💪</Text>
        </View>
      </ScrollView>

    </View>
  );
}
