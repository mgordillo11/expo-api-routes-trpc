import { View, Text, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AuthOAuth from '@/components/Authentication/AuthOAuth';
import { useRouter } from 'expo-router';

import { useSignUp } from '@clerk/clerk-expo';

import googleIcon from '@/assets/icons/google.png';
import appleIcon from '@/assets/icons/apple.png';
import facebookIcon from '@/assets/icons/facebook.png';

const OAUTH_STRATEGIES = {
  Google: 'oauth_google',
  Apple: 'oauth_apple',
  Facebook: 'oauth_facebook',
} as const;

export default function SignUpScreen() {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Start the sign-up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
        username: userName,
      });

      // Send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using the email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log(completeSignUp);

      await setActive({ session: completeSignUp.createdSessionId });

      router.push('/(tabs)/');

      setPendingVerification(false);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 bg-lavender-blue">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('@/assets/images/signup.png')}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        {!pendingVerification ? (
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">First Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              autoCapitalize="none"
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              placeholder="First Name..."
            />
            <Text className="text-gray-700 ml-4">Last Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              autoCapitalize="none"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              placeholder="Last Name..."
            />

            <Text className="text-gray-700 ml-4">User Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              autoCapitalize="none"
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              placeholder="User Name..."
            />

            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              placeholder="Email..."
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password..."
              placeholderTextColor="#000"
            />
            <TouchableOpacity
              className={`py-3 bg-yellow-400 rounded-xl ${isLoaded ? '' : 'opacity-50'}`}
              disabled={!isLoaded}
              onPress={onSignUpPress}>
              <Text className="font-xl font-bold text-center text-gray-700">Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="space-y-2">
            <Text className="text-gray-700 ml-4">Verification Code</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={code}
              onChangeText={(code) => setCode(code)}
              placeholder="Enter verification code..."
            />
            <TouchableOpacity
              className={`py-3 bg-yellow-400 rounded-xl ${isLoaded ? '' : 'opacity-50'}`}
              disabled={!isLoaded}
              onPress={onPressVerify}>
              <Text className="font-xl font-bold text-center text-gray-700">Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

        <View className="flex-row justify-center space-x-14">
          <AuthOAuth strategy={OAUTH_STRATEGIES.Google} icon={googleIcon} />

          {Platform.OS === 'ios' && (
            <AuthOAuth strategy={OAUTH_STRATEGIES.Apple} icon={appleIcon} />
          )}

          <AuthOAuth strategy={OAUTH_STRATEGIES.Facebook} icon={facebookIcon} />
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
