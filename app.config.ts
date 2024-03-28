import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("CLERK_PUBLISHABLE_KEY is not defined");
}

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "expo-api-routes-trpc",
  slug: "expo-api-routes-trpc",
  version: "1.0.0",

  extra: {
    clerkPublishableKey: CLERK_PUBLISHABLE_KEY,
  },

  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "server",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://n",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

export default defineConfig;
