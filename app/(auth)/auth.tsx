import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AuthGoogle from '@/components/Authentication/AuthGoogle';
import AuthFacebook from '@/components/Authentication/AuthFacebook';
import { supabase } from '@/utils/supabase';
import AuthApple from '@/components/Authentication/AuthApple';

type AuthScreenProps = {
  mode: 'login' | 'signup';
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const performLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }

    if (data.session) {
      router.push('/(tabs)/');
    }
  };

  const performSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }

    if (data.session) {
      router.push('/(tabs)/');
    }
  };

  return (
    <View className="flex-1 bg-lavender-blue">
      <SafeAreaView className="flex mt-8">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('@/assets/images/login.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          {mode === 'signup' && (
            <>
              <Text className="text-gray-700 ml-4">Full Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter Name"
              />
            </>
          )}
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
          />
          <TouchableOpacity
            className={`py-3 bg-yellow-400 rounded-xl ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            onPress={mode === 'login' ? performLogin : performSignUp}>
            <Text className="font-xl font-bold text-center text-gray-700">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

        <View className="flex-row justify-center space-x-14">
          <AuthGoogle />

          {Platform.OS === 'ios' && <AuthApple />}

          <AuthFacebook />
        </View>

        {mode === 'login' ? (
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
