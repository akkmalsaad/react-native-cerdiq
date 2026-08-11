import { useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

import { currentLesson, popularTopics, subjects, todayPlan } from "@/data/home";
import { images } from "@/lib/images";

const DESIGN_WIDTH = 853;
const DESIGN_HEIGHT = 1844;
const DESIGN_ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;
const HOME_CONTENT_SHIFT = 20;

type ChildProfile = {
  avatar?: string;
  id?: string;
  name?: string;
  standard?: number;
};

type DesignBox = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type HomeAction = {
  accessibilityLabel: string;
  box: DesignBox;
  href: Href;
};

export function HomeScreen() {
  const { user } = useUser();
  const { height, width } = useWindowDimensions();
  const metadata = user?.unsafeMetadata ?? {};
  const profiles = Array.isArray(metadata.childProfiles)
    ? metadata.childProfiles as ChildProfile[]
    : [];
  const savedProfile = metadata.childProfile as ChildProfile | undefined;
  const activeProfileId = metadata.activeChildProfileId;
  const childProfile = profiles.find((profile) => profile.id === activeProfileId)
    ?? savedProfile
    ?? profiles[0];
  const childName = childProfile?.name?.trim() || user?.firstName || "Pelajar";

  const screenAspectRatio = width / height;
  const renderedWidth = screenAspectRatio > DESIGN_ASPECT_RATIO
    ? width
    : height * DESIGN_ASPECT_RATIO;
  const renderedHeight = screenAspectRatio > DESIGN_ASPECT_RATIO
    ? width / DESIGN_ASPECT_RATIO
    : height;
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

  const actions: HomeAction[] = [
    { accessibilityLabel: "Buka profil", box: { left: 741, right: 829, top: 132, bottom: 222 }, href: "/profile" as Href },
    ...subjects.map((subject, index) => ({
      accessibilityLabel: `Buka ${subject.name.replace("\n", " ")}`,
      box: { left: 42 + index * 196, right: 226 + index * 196, top: 558, bottom: 803 },
      href: `/learning?subject=${subject.id}` as Href,
    })),
    { accessibilityLabel: `Teruskan ${currentLesson.title}, ${currentLesson.progress}% selesai`, box: { left: 568, right: 790, top: 930, bottom: 1013 }, href: `/learning?lesson=${currentLesson.id}` as Href },
    { accessibilityLabel: "Lihat semua topik popular", box: { left: 650, right: 824, top: 1065, bottom: 1123 }, href: "/learning" as Href },
    ...popularTopics.map((topic, index) => ({
      accessibilityLabel: `Buka ${topic.title}, ${topic.exerciseCount} latihan, ${topic.progress}% selesai`,
      box: { left: 42 + index * 260, right: 291 + index * 260, top: 1128, bottom: 1387 },
      href: `/learning?topic=${topic.id}` as Href,
    })),
    { accessibilityLabel: `Mula pelan hari ini. ${todayPlan.description}`, box: { left: 72, right: 279, top: 1584, bottom: 1652 }, href: "/learning" as Href },
  ];

  return (
    <ScrollView
      bounces={false}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{ height, width }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FCFBFF" }}
    >
      <StatusBar backgroundColor="transparent" style="dark" translucent />
      <View style={{ flex: 1, transform: [{ translateY: -HOME_CONTENT_SHIFT }] }}>
        <Image
          accessibilityLabel="Halaman utama Cerdiq bersama Awi"
          contentFit="cover"
          source={images.homeScreen}
          style={{ height: "100%", width: "100%" }}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 0, right: DESIGN_WIDTH, top: 0, bottom: 58 }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 28, right: 335, top: 58, bottom: 246 }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 38, right: 322, top: 84, bottom: 241 }),
            { overflow: "hidden" },
          ]}
        >
          <Image
            contentFit="cover"
            source={images.homeScreen}
            style={{
              height,
              left: -designX(38),
              position: "absolute",
              top: -designY(63),
              width,
            }}
          />
        </View>

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 38, right: 451, top: 242, bottom: 321 }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        <View
          style={[
            boxStyle({ left: 43, right: 451, top: 270, bottom: 325 }),
            { justifyContent: "center" },
          ]}
        >
          <Text
            numberOfLines={1}
            selectable
            style={{
              color: "#21165B",
              fontFamily: "Nunito_800ExtraBold",
              fontSize: Math.max(18, designY(43) - designY(0)),
              includeFontPadding: false,
            }}
          >
            Hai, {childName}! 👋
          </Text>
        </View>

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 570, right: 840, top: 72, bottom: 195 }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 570, right: 840, top: 106, bottom: 229 }),
            { overflow: "hidden" },
          ]}
        >
          <Image
            contentFit="fill"
            source={images.homeScreen}
            style={{
              height: renderedHeight,
              left: -(570 / DESIGN_WIDTH) * renderedWidth,
              position: "absolute",
              top: -(72 / DESIGN_HEIGHT) * renderedHeight,
              width: renderedWidth,
            }}
          />
        </View>

        {childProfile?.avatar ? (
          <Image
            accessibilityLabel={`Avatar ${childName}`}
            contentFit="cover"
            source={{ uri: childProfile.avatar }}
            style={[boxStyle({ left: 748, right: 823, top: 138, bottom: 214 }), { borderRadius: designX(22) - designX(0) }]}
          />
        ) : null}

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 642, right: 831, top: 500, bottom: 552 }),
            { backgroundColor: "#FFFFFF" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 770, right: 809, top: 1205, bottom: 1293 }),
            { backgroundColor: "#FFF9FC" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 809, right: DESIGN_WIDTH, top: 1205, bottom: 1293 }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        <View
          pointerEvents="none"
          style={[
            boxStyle({ left: 0, right: DESIGN_WIDTH, top: 1680, bottom: DESIGN_HEIGHT }),
            { backgroundColor: "#FCFBFF" },
          ]}
        />

        {actions.map((action) => (
          <Pressable
            accessibilityLabel={action.accessibilityLabel}
            accessibilityRole="button"
            key={`${action.accessibilityLabel}-${String(action.href)}`}
            onPress={() => router.push(action.href)}
            style={({ pressed }) => [
              boxStyle(action.box),
              { backgroundColor: pressed ? "rgba(108, 50, 217, 0.08)" : "transparent" },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
}
