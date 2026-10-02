import { createClient } from '@supabase/supabase-js';

// Lovable Cloud Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://c--c3c17d7d-c658-4a6f-beaf-bc059fb3d812-prod.lovable.cloud';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OTxHpvIng-Vj0aMjqgbZtA_S5vK6xWE';

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
