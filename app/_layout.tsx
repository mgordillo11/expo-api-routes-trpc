import { Stack } from "expo-router";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/Providers/Providers";

import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
