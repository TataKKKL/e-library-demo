import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!process.env.SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_KEY environment variable');
}

if (!process.env.SERVICE_KEY) {
  throw new Error('Missing SERVICE_KEY environment variable');
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL, 
  process.env.SERVICE_KEY
);