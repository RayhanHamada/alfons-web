import { definitions } from '@/types/supabase';
import type { SupabaseClient } from '@bnjmnt4n/supabase-client';
import { createClient } from '@supabase/supabase-js';

type Defs = {
  [K in keyof definitions]: definitions[K];
};

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) as unknown as SupabaseClient<Defs>;
