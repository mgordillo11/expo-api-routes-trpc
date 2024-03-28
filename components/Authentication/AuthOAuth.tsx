import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import type { OAuthStrategy } from '@clerk/types';

import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { router } from 'expo-router';

interface AuthOAuthProps {
  strategy: OAuthStrategy;
  icon: ImageSourcePropType;
}

maybeCompleteAuthSession();

export default function AuthOAuth({ strategy, icon }: AuthOAuthProps) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy });

  const handleOAuthSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        console.log('User signed in');

        // Access the signed-in user's information
        const { user } = useUser();
        console.log(user);

        router.push('/(tabs)/');
      } else {
        console.log('No OAuth session created');
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (error) {
      console.error('OAuth error', error);
    }
  };

  return (
    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={handleOAuthSignIn}>
      <Image source={icon} className="w-10 h-10" />
    </TouchableOpacity>
  );
}
