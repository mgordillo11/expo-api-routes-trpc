import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "clerk_token"; // Key for storing Clerk token

const tokenCache =
  Platform.OS !== "web"
    ? {
        // Methods required by Clerk
        getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
        saveToken: (token: string) =>
          SecureStore.setItemAsync(TOKEN_KEY, token),
        removeToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),

        // Methods for Supabase
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) =>
          SecureStore.setItemAsync(key, value),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
      }
    : undefined;

export default tokenCache;
