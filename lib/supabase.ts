
import { createClient } from '@supabase/supabase-js';

/**
 * Safely attempts to retrieve environment variables from common locations.
 */
const getEnv = (name: string): string => {
  try {
    // Check process.env (Node/Standard)
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
      return process.env[name] as string;
    }
    // Check import.meta.env (Vite/Modern ESM)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[name]) {
      // @ts-ignore
      return import.meta.env[name] as string;
    }
  } catch (e) {
    // Environment access restricted
  }
  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('SUPABASE_ANON_KEY');

const isConfigured = !!(supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey);

if (!isConfigured) {
  console.info(
    "%c NoorNest Setup %c Supabase keys not detected. To enable the cloud sanctuary, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.",
    "background: #D4AF37; color: #050a14; font-weight: bold; padding: 2px 4px; border-radius: 4px;",
    "color: #D4AF37; font-style: italic;"
  );
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
