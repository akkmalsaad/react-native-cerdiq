import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;
  return <View style={{ alignItems: "center", backgroundColor: "#FAF8FF", flex: 1, justifyContent: "center", padding: 28 }}>
    <Text style={{ fontSize: 64 }}>☺</Text><Text style={{ color: "#22175D", fontFamily: "Nunito_800ExtraBold", fontSize: 30, paddingTop: 14 }}>Profil</Text>
    <Pressable accessibilityLabel="Log keluar" onPress={() => void signOut({ redirectUrl: "/" })} style={({ pressed }) => ({ backgroundColor: "#672BD1", borderRadius: 999, marginTop: 24, opacity: pressed ? 0.75 : 1, paddingHorizontal: 28, paddingVertical: 13 })}><Text style={{ color: "#FFFFFF", fontFamily: "Nunito_800ExtraBold", fontSize: 16 }}>Log Keluar</Text></Pressable>
  </View>;
}
