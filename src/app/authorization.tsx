import { Redirect } from "expo-router";

// Verification now happens through Clerk in the sign-up screen modal. Keep this
// legacy route as a safe redirect for old links instead of exposing mock UI.
export default function AuthorizationScreen() {
  return <Redirect href="/sign-up" />;
}
