import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AuthOAuth from "@/components/Authentication/AuthOAuth";

import { useSignIn } from "@clerk/clerk-expo";

import googleIcon from "@/assets/icons/google.png";
import appleIcon from "@/assets/icons/apple.png";
import facebookIcon from "@/assets/icons/facebook.png";

const OAUTH_STRATEGIES = {
  Google: "oauth_google",
  Apple: "oauth_apple",
  Facebook: "oauth_facebook",
} as const;

export default function LoginScreen() {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });

      router.push("/(tabs)/");
    } catch (err: any) {
      console.error(err);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 bg-lavender-blue">
      <SafeAreaView className="flex mt-8">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("@/assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email Address..."
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={() => onSignInPress()}
            disabled={!isLoaded}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-4">
          <AuthOAuth strategy={OAUTH_STRATEGIES.Google} icon={googleIcon} />

          {Platform.OS === "ios" && (
            <AuthOAuth strategy={OAUTH_STRATEGIES.Apple} icon={appleIcon} />
          )}

          <AuthOAuth strategy={OAUTH_STRATEGIES.Facebook} icon={facebookIcon} />
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
