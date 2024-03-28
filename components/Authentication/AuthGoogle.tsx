import React, { useEffect } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';

export default function AuthGoogle() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
    } catch (error: any) {}
  };

  return (
    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={handleGoogleSignIn}>
      <Image source={require('@/assets/icons/google.png')} className="w-10 h-10" />
    </TouchableOpacity>
  );
}
