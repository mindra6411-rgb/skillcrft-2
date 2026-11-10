"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "./config";

let client: ReturnType<typeof createBrowserClient> | null = null;

/** Retorna o cliente do navegador ou null quando o Supabase não está configurado. */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null;
  if (!client) client = createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
