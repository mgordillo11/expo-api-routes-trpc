import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EmailOTP() {
  return (
    <View className="flex-1 justify-center bg-gray-50">
      <View className="bg-white mx-4 p-6 rounded-2xl shadow-xl">
        <View className="items-center text-center space-y-4">
          <Text className="text-3xl font-semibold">Email Verification</Text>
          <Text className="text-sm font-medium text-gray-400">
            We have sent a code to your email ba**@dipainhouse.com
          </Text>
        </View>

        <View className="mt-8">
          <View className="flex-row justify-between mx-auto w-full max-w-xs">
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
            <TextInput
              className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              keyboardType="numeric"
              maxLength={1}
            />
          </View>

          <View className="mt-8 space-y-5">
            <TouchableOpacity className="flex-row items-center justify-center bg-blue-700 rounded-xl py-5 shadow-sm">
              <Text className="text-white text-sm">Verify Account</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center text-sm font-medium text-gray-500">
              <Text>Didn't receive code?</Text>
              <TouchableOpacity>
                <Text className="text-blue-600"> Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
