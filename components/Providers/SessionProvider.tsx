import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabase';

export const SessionProvider = (props: { children: React.ReactNode }) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>{props.children}</SessionContextProvider>
  );
};
