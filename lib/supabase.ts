
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Support both VITE_ and standard env naming conventions
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey;

if (!isConfigured) {
  console.warn("Supabase environment variables are missing. NoorNest will run in local-only mode.");
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
