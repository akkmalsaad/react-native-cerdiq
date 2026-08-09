import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { CerdiqButton } from "@/components/ui/cerdiq-button";
import { DesignSystemSection } from "@/components/ui/design-system-section";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { colors } from "@/theme/tokens";

const palette = [
  ["Primary 500", colors.primary[500]],
  ["Primary 600", colors.primary[600]],
  ["Primary 400", colors.primary[400]],
  ["Primary 100", colors.primary[100]],
  ["Primary 50", colors.primary[50]],
  ["Navy 900", colors.navy[900]],
  ["Navy 700", colors.navy[700]],
  ["Gray 500", colors.gray[500]],
  ["Gray 200", colors.gray[200]],
  ["White", colors.white],
] as const;

const accents = [
  ["Success", colors.success],
  ["Blue", colors.info],
  ["Yellow", colors.warning],
  ["Orange", colors.orange],
  ["Pink", colors.pink],
  ["Red", colors.danger],
] as const;

const subjects = [
  ["Math", "🔍", colors.subjects.math],
  ["Sains", "🌱", colors.subjects.science],
  ["BM", "⚖️", colors.subjects.bahasaMelayu],
  ["English", "📖", colors.subjects.english],
] as const;

const features = [
  ["1", "🔍", "Kenal & Susun", "bg-blue-50", "text-info"],
  ["2", "⚖️", "Banding Nombor", "bg-amber-50", "text-orange"],
  ["3", "📋", "Latihan Interaktif", "bg-green-50", "text-success"],
] as const;

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <View className="w-[29%] min-w-24 items-center gap-2">
      <View className="h-16 w-full rounded-control border border-gray-200" style={{ backgroundColor: color }} />
      <View className="items-center">
        <Text className="font-bold text-caption text-navy-900">{name}</Text>
        <Text selectable className="font-semibold text-caption text-navy-700">{color}</Text>
      </View>
    </View>
  );
}

export default function DesignSystemScreen() {
  const [message, setMessage] = useState("Pilih tindakan untuk menguji komponen.");

  return (
    <ScrollView
      className="flex-1 bg-primary-50"
      contentContainerClassName="gap-10 px-5 pb-16 pt-6"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="items-center gap-3 rounded-card bg-white p-6 shadow-card">
        <Image
          accessibilityLabel="Awi, maskot Cerdiq"
          contentFit="contain"
          source={require("../../assets/images/awi welcome.png")}
          style={{ width: 132, height: 118 }}
        />
        <Text className="font-extrabold text-display tracking-tight text-primary-600">cerdiq</Text>
        <Text className="font-bold text-label text-navy-900">Belajar · Seronok · Berjaya</Text>
      </View>

      <DesignSystemSection number={1} title="Logo">
        <View className="flex-row gap-3">
          <View className="flex-1 items-center rounded-card bg-primary-600 p-5 shadow-card">
            <Text className="font-extrabold text-h2 text-white">cerdiq★</Text>
            <Text className="pt-2 font-semibold text-caption text-primary-100">Wordmark</Text>
          </View>
          <View className="flex-1 items-center rounded-card bg-white p-5 shadow-card">
            <Image source={require("../../assets/images/icon.png")} style={{ width: 60, height: 60 }} />
            <Text className="pt-2 font-semibold text-caption text-navy-700">App icon</Text>
          </View>
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={2} title="Colors">
        <View className="flex-row flex-wrap justify-between gap-y-5">
          {palette.map(([name, color]) => <ColorSwatch color={color} key={name} name={name} />)}
        </View>
        <View className="flex-row flex-wrap justify-between gap-y-5">
          {accents.map(([name, color]) => <ColorSwatch color={color} key={name} name={name} />)}
        </View>
        <View className="rounded-card border border-dashed border-primary-400 bg-white p-5">
          <Text className="pb-4 text-center font-extrabold text-label text-primary-600">SUBJECT COLORS</Text>
          <View className="flex-row justify-between">
            {subjects.map(([name, icon, color]) => (
              <View className="items-center gap-2" key={name}>
                <View className="size-12 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
                  <Text className="text-xl">{icon}</Text>
                </View>
                <Text className="font-bold text-caption text-navy-900">{name}</Text>
              </View>
            ))}
          </View>
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={3} title="Typography · Nunito">
        <View className="gap-5 rounded-card bg-white p-5 shadow-card">
          <View><Text className="font-bold text-caption text-navy-700">Display / 36 / ExtraBold</Text><Text className="font-extrabold text-display text-navy-900">Nombor Hingga 100</Text></View>
          <View><Text className="font-bold text-caption text-navy-700">H1 / 30 / ExtraBold</Text><Text className="font-extrabold text-h1 text-navy-900">Jom Belajar Bersama Awi!</Text></View>
          <View><Text className="font-bold text-caption text-navy-700">H2 / 26 / ExtraBold</Text><Text className="font-extrabold text-h2 text-navy-900">Susun & Banding Nombor</Text></View>
          <View><Text className="font-bold text-caption text-navy-700">H3 / 22 / Bold</Text><Text className="font-bold text-h3 text-navy-900">Kemajuan Pelajaran</Text></View>
          <Text className="font-semibold text-body-lg text-navy-900">Susun nombor daripada kecil ke besar.</Text>
          <Text className="font-medium text-body text-navy-700">Belajar cara menyusun nombor mengikut tertib dan membandingkan nombor dengan betul.</Text>
          <View className="self-start rounded-full bg-primary-100 px-4 py-2"><Text className="font-bold text-label text-primary-600">60% Selesai</Text></View>
          <View className="self-start rounded-full bg-blue-50 px-4 py-2"><Text className="font-semibold text-caption text-info">⏱ 5 minit</Text></View>
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={4} title="Buttons">
        <View className="gap-3">
          <CerdiqButton label="MULA BELAJAR  ›" onPress={() => setMessage("Jom mula belajar!")} />
          <CerdiqButton label="TERUSKAN" variant="secondary" onPress={() => setMessage("Teruskan ke aktiviti seterusnya.")} />
          <CerdiqButton label="HEBAT!" variant="success" onPress={() => setMessage("Hebat! Jawapan anda betul.")} />
          <CerdiqButton label="TIDAK AKTIF" variant="disabled" />
          <Text accessibilityLiveRegion="polite" className="text-center font-semibold text-caption text-navy-700">{message}</Text>
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={5} title="Icons · Soft 3D Style">
        <View className="flex-row flex-wrap justify-between gap-y-4 rounded-card bg-white p-5 shadow-card">
          {["⭐", "💡", "📖", "🏆", "🔍", "⚖️", "📋", "🕐"].map((icon) => (
            <View className="size-16 items-center justify-center rounded-control bg-primary-50" key={icon}>
              <Text className="text-4xl">{icon}</Text>
            </View>
          ))}
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={6} title="Awi Mascot">
        <View className="flex-row justify-between gap-3">
          {[
            ["Welcome", require("../../assets/images/awi welcome.png")],
            ["Correct", require("../../assets/images/awi correct.png")],
            ["Discover", require("../../assets/images/awi magnifiying glass.png")],
          ].map(([label, source]) => (
            <View className="flex-1 items-center rounded-card bg-white p-3 shadow-card" key={label as string}>
              <Image contentFit="contain" source={source} style={{ width: 88, height: 82 }} />
              <Text className="font-bold text-caption text-navy-900">{label as string}</Text>
            </View>
          ))}
        </View>
      </DesignSystemSection>

      <DesignSystemSection number={7} title="UI Components">
        <View className="rounded-card bg-white p-5 shadow-card">
          <Text className="font-extrabold text-label text-primary-600">Tahukah Kamu?</Text>
          <Text className="pt-2 font-medium text-caption text-navy-700">Nombor digunakan dalam kehidupan seharian kita seperti mengira barang, umur, masa dan banyak lagi!</Text>
        </View>
        <View className="flex-row gap-3">
          {features.map(([number, icon, title, background, accent]) => (
            <View className={`flex-1 items-center gap-2 rounded-card p-3 shadow-card ${background}`} key={title}>
              <View className="self-start rounded-full bg-white px-2 py-1"><Text className={`font-extrabold text-caption ${accent}`}>{number}</Text></View>
              <Text className="text-3xl">{icon}</Text>
              <Text className="text-center font-bold text-caption text-navy-900">{title}</Text>
              <Text className="font-bold text-caption text-primary-600">5 minit</Text>
            </View>
          ))}
        </View>
        <View className="rounded-card bg-white p-4 shadow-card">
          <Text className="pb-5 font-extrabold text-label text-primary-600">Progress Steps</Text>
          <ProgressSteps />
        </View>
      </DesignSystemSection>
    </ScrollView>
  );
}
