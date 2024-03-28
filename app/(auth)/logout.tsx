import React from 'react';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

const Logout = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('Logged out');

      // Redirect to the login page
      router.push('/(auth)/');
    } catch (err: any) {
      console.error(err);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <AntDesign name="logout" size={24} color="black" className="mr-4" />
    </Pressable>
  );
};

export default Logout;
