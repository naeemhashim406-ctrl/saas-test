import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session ?? null);
      setUser((session as any)?.user ?? null);
      setLoading(false);
    }

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, payload) => {
      setSession((payload as any)?.session ?? null);
      setUser(((payload as any)?.session as any)?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      // cleanup subscription
      // supabase returns a Subscription object in newer versions
      if (subscription && typeof (subscription as any)?.unsubscribe === 'function') (subscription as any).unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signOut };
}
