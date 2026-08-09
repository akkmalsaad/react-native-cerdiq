import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type DesignSystemSectionProps = PropsWithChildren<{ number: number; title: string }>;

export function DesignSystemSection({
  children,
  number,
  title,
}: DesignSystemSectionProps) {
  return (
    <View className="gap-5">
      <View className="self-start rounded-full bg-primary-600 px-4 py-2">
        <Text className="font-extrabold text-label text-white">
          {number}. {title.toUpperCase()}
        </Text>
      </View>
      {children}
    </View>
  );
}
