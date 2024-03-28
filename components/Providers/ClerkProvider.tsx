import Constants from "expo-constants";
import { ClerkProvider as Clerk } from "@clerk/clerk-expo";
// import tokenCache from '@/utils/tokenCache';

import { ReactNode } from "react";

const clerkPublishableKey =
  Constants.expoConfig?.extra?.clerkPublishableKey || "";

import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key); 
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const ClerkProvider = (props: { children: ReactNode }) => {
  return (
    <Clerk publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      {props.children}
    </Clerk>
  );
};
