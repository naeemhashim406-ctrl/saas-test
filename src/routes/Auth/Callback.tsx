import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';

export default function Callback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle magic-link / OAuth redirect and establish session
    async function handle() {
      try {
        // supabase.getSessionFromUrl reads the URL and completes the flow
        // new API: getSessionFromUrl
        // Fallbacks exist across supabase versions; adjust if needed
        const { data, error } = await supabase.auth.getSessionFromUrl();
        if (error) {
          console.error('Auth callback error', error);
          setError(error.message);
          return;
        }

        // Optionally: upsert profile to users table via Edge Function for security
        // Redirect to application home
        window.location.replace('/app');
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Unknown error');
      }
    }

    handle();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm rounded-xl bg-white/6 backdrop-blur p-6 text-center"
      >
        <h3 className="text-white font-medium mb-2">Finalizing sign in…</h3>
        <p className="text-slate-300 text-sm">Please wait while we sign you in and redirect to VisaFlow.</p>
        {error && <p className="text-rose-400 mt-4 text-sm">{error}</p>}
      </motion.div>
    </div>
  );
}
