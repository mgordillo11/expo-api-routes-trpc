import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "./ClerkProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ReactNode } from "react";

export const Providers = (props: { children: ReactNode }) => {
  return (
    <SafeAreaProvider>
      <ClerkProvider>
        <TRPCReactProvider>{props.children}</TRPCReactProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
};
