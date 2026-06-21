import { createClient } from '@supabase/supabase-js';

// Ensure Vite env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  throw new Error('Missing Supabase environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(String(SUPABASE_URL), String(SUPABASE_ANON), {
  auth: { persistSession: true, detectSessionInUrl: true }
});

export default supabase;
