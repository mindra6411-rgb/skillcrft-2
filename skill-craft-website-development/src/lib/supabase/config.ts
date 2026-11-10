/**
 * Variáveis públicas do Supabase. Nunca use a service_role key no front-end.
 * Aceita tanto a chave "anon" quanto a nova "publishable key".
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
