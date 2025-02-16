// db/profiles.ts
import { supabaseAdmin } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  user_role: string;
}

export const getAllProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*');

  console.log(data);
  if (error) throw new Error(error.message);
  return data as Profile[];
};