import { createClient } from '@supabase/supabase-js';

import 'react-native-url-polyfill/auto';
import tokenCache from './tokenCache';

export const supabase = createClient(
  // App Throws if these are not defined, so we can safely cast
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: tokenCache,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
);
