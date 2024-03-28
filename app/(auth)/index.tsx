import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-lavender-blue">
        <View className="flex-1 flex justify-around my-4">
          <Text className="text-white font-bold text-4xl text-center">Let's Get Started!</Text>
          <View className="flex-row justify-center">
            <Image
              source={require('@/assets/images/welcome.png')}
              style={{ width: 350, height: 350 }}
            />
          </View>
          <View className="space-y-4">
            <TouchableOpacity
              onPress={() => router.push('/signup')}
              className="py-3 bg-yellow-400 mx-7 rounded-xl">
              <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-white font-semibold">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="font-semibold text-yellow-400"> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
