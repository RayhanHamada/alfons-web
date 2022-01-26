import type { definitions } from '@/types/supabase';
import type { SupabaseClient } from '@bnjmnt4n/supabase-client';
import { createClient } from '@supabase/supabase-js';

type Defs = {
  [K in keyof definitions]: definitions[K];
};

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
) as unknown as SupabaseClient<Defs>;

export default supabaseServer;
