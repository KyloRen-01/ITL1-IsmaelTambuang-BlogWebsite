import { createClient } from "@supabase/supabase-js";

// Initialize database client from environment variables (Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
