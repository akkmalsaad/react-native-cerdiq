import { useAuth, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

type TabId = "learning" | "rewards" | "progress" | "profile";

export function TabPlaceholderScreen({ description, icon, title }: { activeTab: TabId; description: string; icon: string; title: string }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const child = user?.unsafeMetadata.childProfile as { name?: string } | undefined;
  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;
  return (
    <View style={{ alignItems: "center", backgroundColor: "#FAF8FF", flex: 1, justifyContent: "center", padding: 28 }}>
      <Text style={{ fontSize: 64 }}>{icon}</Text>
      <Text selectable style={{ color: "#22175D", fontFamily: "Nunito_800ExtraBold", fontSize: 30, paddingTop: 14 }}>{title}</Text>
      <Text selectable style={{ color: "#6B6782", fontFamily: "Nunito_600SemiBold", fontSize: 16, lineHeight: 24, paddingTop: 8, textAlign: "center" }}>{description.replace("{name}", child?.name ?? "Pelajar")}</Text>
    </View>
  );
}
